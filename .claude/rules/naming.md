---
description: >-
  Quy ước đặt tên xuyên stack: code, file (theo ngôn ngữ), API, hạ tầng, git, test (luôn áp dụng). Có
  rule riêng: naming-typescript (file TS/JS/React) và naming-data (PostgreSQL, Redis, Elasticsearch).
---

# SYSTEM INSTRUCTIONS FOR AI AGENTS (Claude)

- You MUST strictly enforce the NAMING RULES defined below for all file creations, code generations, architectural designs, and refactoring tasks.
- Act as a strict gatekeeper: validate the target layer's casing before generating code or creating new files.
- If existing code violates these rules, do not propagate the bad pattern—flag it or fix it based on context.

---

# NAMING RULES (CROSS-STACK)

## Core Principle

- Naming depends on context, responsibility, and language convention.
- Prefer ecosystem conventions over personal preference.
- Never mix naming conventions within the same layer.
- **Precedence:** when editing existing code, the convention already used in that project or module wins over this rule (do not mass-rename). This rule governs new files, new projects, and anything the project has no convention for.

---

# Code Layer

## Classes

Use **PascalCase**.
Examples:

```ts
UserService;
AuthController;
```

## Interfaces

Use **PascalCase**. Do not use Hungarian prefixes (e.g., `I`).
Examples:

```TypeScript
UserProfile
AuthContext
```

_Prohibited:_ `IUserProfile`, `IAuthContext` (unless explicitly required by an inherited legacy codebase).

## Types

Use **PascalCase**.
Examples:

```TypeScript
UserRole
ApiResponse
```

## Enums

Use **PascalCase** for the Enum name, and **UPPER_SNAKE_CASE** for its members.
Examples:

```TypeScript
enum UserStatus {
ACTIVE,
INACTIVE,
PENDING
}
```

## Functions

Use **camelCase**.
Examples:

```TypeScript
getUser()
createOrder()
validateToken()
```

## Variables

Use **camelCase**.
Examples:

```TypeScript
userProfile
orderCount
tenantId
```

## Booleans

Use **camelCase** with strict semantic prefixes.
Allowed prefixes: `is`, `has`, `can`, `should`.
Examples:

```TypeScript
isActive
hasPermission
canEdit
shouldRefresh
```

## Constants

Use **UPPER_SNAKE_CASE**.
Examples:

```TypeScript
MAX_RETRY_COUNT
API_TIMEOUT
DEFAULT_PAGE_SIZE
```

## Acronyms

Treat acronyms as normal words to ensure readability and automated parsing.

- **Good:** `userId`, `apiClient`, `jwtToken`, `htmlParser`
- **Bad:** `userID`, `APIClient`, `JWTToken`, `HTMLParser`

# File & Folder Layer

## General Rule

Follow language ecosystem conventions strictly. **Within TS/JS there are two distinct sub-rules, see `naming-typescript.md`. This is intentional, not inconsistency.**

### TypeScript / JavaScript / React

See `naming-typescript.md` (loaded automatically when you edit `.ts/.tsx/.js/.jsx` files): plain files use kebab-case; files with an architectural suffix use dot-notation (`user.service.ts`).

### Python

Use **snake_case**.
Examples:

```
user_service.py
auth_controller.py
```

### Java / C#

Match the Class name exactly (**PascalCase**).
Examples:

```
UserService.java
AuthController.cs
```

### Go

Use short, concise **lowercase** names (single word preferred).
Examples:

```
user.go
service.go
repo.go
```

# API Layer

## REST Endpoints

Use **kebab-case** and plural nouns for resources.
Examples:

```HTTP
GET /user-profiles
POST /auth/login
GET /tenants/123/permissions
```

## Query Parameters

Use **camelCase**.
Examples:

```HTTP
?pageSize=20
?tenantId=123
```

## JSON Fields (Request/Response)

Use **camelCase**.
Examples:

```JSON
{
"userId": "123",
"fullName": "John Doe",
"isActive": true
}
```

# Infrastructure & DevOps Layer

## Environment Variables

Use **UPPER_SNAKE_CASE**.
Examples:

```
APP_PORT
APP_ENV
DB_HOST
JWT_SECRET
REDIS_URL
ELASTICSEARCH_URL
```

## Docker & Containers

Use **kebab-case**.
Examples:

```YAML
user-service
auth-service
backend
```

## CI/CD (Pipelines & Workflow Files)

Use **kebab-case** for both workflow step names and YAML file names.

- File: `.github/workflows/ci-cd-pipeline.yml`
- Step/Job Name: `build-api`, `run-tests`, `deploy-staging`

# Git Layer

## Branches

Format: `<type>/<ticket-id>-<short-description>` (or `<type>/<short-description>` if no ticket exists). Use **kebab-case** for the description.
Types: `feat`, `fix`, `refactor`, `docs`, `chore`, `test`.
Examples:

```
feat/ENG-101-user-management
fix/ENG-204-login-api
refactor/auth-service
```

# Test Layer

## TypeScript / JavaScript

Match the target file name (including its dot/dash convention) with `.test.ts` or `.spec.ts`.
Examples:

```
user.service.spec.ts
auth.controller.spec.ts
user-profile.test.tsx
```

## Python

Prefix with `test_`.
Examples:

```
test_user_service.py
test_auth_controller.py
```

# Documentation & Configuration Layer

Use **kebab-case** for all documentation and configuration files.
Examples:

```
api-guide.md
deployment-guide.md
architecture-overview.md
eslint.config.js
vite.config.ts
docker-compose.yml
```

# Database, cache and search naming

Rules for PostgreSQL tables/columns/constraints, Redis keys and Elasticsearch indices live in `naming-data.md`; Claude Code loads it automatically when you edit entity, migration, schema, repository, cache or search files. Read it explicitly before naming anything in those layers from another file.

# Prohibited (Strictly Forbidden)

Do not generate or accept code violating ecosystem boundaries:

- _Do not mix casings:_ `Auth_Service` (Mixed), `user-service.py` (Kebab in Python file).
- _Do not use improper Acronyms:_ `userID`, `APIClient`.
