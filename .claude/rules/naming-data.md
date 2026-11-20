---
description: Naming for the data layer (PostgreSQL tables, columns and constraints; Redis keys; Elasticsearch indices, aliases and mappings). Loaded when editing data-layer files.
paths:
  - "**/*.entity.ts"
  - "**/*.schema.ts"
  - "**/*.repository.ts"
  - "**/*.dbml"
  - "**/*.sql"
  - "**/migrations/**"
  - "**/seeds/**"
  - "**/*redis*"
  - "**/*cache*"
  - "**/*elastic*"
  - "**/*search*"
---

# NAMING RULES: DATA LAYER (PostgreSQL, Redis, Elasticsearch)

Companion of `naming.md` (general rules). Split out because it is long and only matters in data-layer files.

# Database Layer

Naming differs by database ecosystem. **Do not cross-apply these SQL conventions to other kinds of database (for example a document store); each database follows its own ecosystem.**

## Relational Database (PostgreSQL / SQL — via DBML, TypeORM, Prisma-SQL)

### Tables

Use **snake_case** and **plural (số nhiều)** form.
Examples:

```SQL
user_profiles
tenant_permissions
orders
```

### Columns

Use **snake_case** and **singular (số ít)** form.
Examples:

```SQL
id
created_at
updated_at
tenant_id
```

### Primary Keys

Use `id` or `<entity_singular>_id` consistently across the project.
Examples: `id` or `user_profile_id`.

### Foreign Keys

Use `<entity_singular>_id`.
Examples: `user_id`, `tenant_id`, `role_id`.

### Constraints & Indexes

- **Indexes:** `idx_<table>_<columns>` -> `idx_users_email`
- **Unique Constraints:** `uk_<table>_<columns>` -> `uk_users_email`
- **Foreign Key Constraints:** `fk_<table>_<referenced_table>` -> `fk_orders_users`

# Cache Layer (Redis)

Redis is **key-value**, so naming discipline lives entirely in the key string. Use **colon-separated (`:`)** hierarchy, **lowercase**, no dashes/camelCase inside segments.

## Key Structure

Pattern: `<domain>:<entity>:<identifier>[:<qualifier>]`

```
cache:user:123
cache:user:list
tenant:abc123:user:123
```

## By Purpose (Prefix Convention)

Prefix the first segment with the _purpose_ of the key so TTL policy and eviction strategy are predictable at a glance:

- **Cache (read-through/write-back):** `cache:<entity>:<id>` → `cache:userprofile:123`
- **Session:** `session:<userId>` → `session:u_123`
- **Distributed Lock:** `lock:<resource>:<id>` → `lock:order:456`
- **Rate Limiting:** `ratelimit:<scope>:<identifier>` → `ratelimit:login:ip_1.2.3.4`
- **Pub/Sub Channel:** `events:<entity>:<action>` → `events:order:created`
- **Queue/Job:** `queue:<jobtype>` → `queue:sendemail`
- **Sorted Set / Leaderboard:** `leaderboard:<scope>` → `leaderboard:global`

## TTL Discipline

- Every `cache:*` and `ratelimit:*` key MUST have an explicit TTL set at write time — no permanent cache keys.
- `session:*` TTL must match the token/session policy defined in the security rules (short-lived, refreshable).
- `lock:*` keys must have a short TTL (few seconds) as a safety net against deadlocks from crashed processes.

## Field Names (Hashes)

When using Redis Hash (`HSET`), field names inside the hash follow **camelCase**, matching the app's in-memory object shape:

```
HSET cache:userprofile:123 fullName "John Doe" isActive "true"
```

# Search Layer (Elasticsearch)

## Index Names

Use **kebab-case**, **lowercase**, **plural**, with a version suffix to support zero-downtime reindexing:

```
user-profiles-v1
tenant-permissions-v2
audit-logs-v1
```

## Aliases

The application always reads/writes through an **alias without the version suffix**; the alias is repointed to the new version on reindex:

```
user-profiles -> points to user-profiles-v2
tenant-permissions -> points to tenant-permissions-v1
```

## Field Names (Mappings)

Use **camelCase**, matching the source JSON payload (API layer) that gets indexed — this keeps the ES document shape a direct mirror of the API response, regardless of the source database:

```JSON
{
"userId": "123",
"fullName": "John Doe",
"createdAt": "2026-01-01T00:00:00Z"
}
```

## Analyzers & Tokenizers

Use **snake_case** for custom analyzer/tokenizer/filter names (Elasticsearch's own ecosystem convention):

```
vietnamese_analyzer
edge_ngram_tokenizer
lowercase_ascii_filter
```

## Ingest Pipelines

Use **kebab-case**, verb-first, describing the transformation:

```
enrich-user-profile
normalize-phone-number
```

# Prohibited (data layer)

- _Do not apply JSON-style camelCase to Postgres:_ `fullName` column in a SQL table — use `full_name`.
- _Do not leave a Redis `cache:*` or `ratelimit:*` key without a TTL._
- _Do not create an Elasticsearch index without a version suffix, or point the application directly at a versioned index instead of its alias._
