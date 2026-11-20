---
description: Đặt tên file TypeScript/JavaScript/React (kebab-case; dot-notation cho file có hậu tố kiến trúc như .service.ts, .dto.ts). Nạp khi sửa file ts/tsx/js/jsx.
paths:
  - "**/*.ts"
  - "**/*.tsx"
  - "**/*.js"
  - "**/*.jsx"
  - "**/*.mjs"
---

# NAMING RULES: TYPESCRIPT / JAVASCRIPT / REACT FILES

Bổ sung cho `naming.md` (đọc mục **Precedence** ở đó: quy ước sẵn có của dự án thắng khi sửa code cũ).

### TypeScript / JavaScript / React

There are **two file naming patterns**, depending on whether the file carries an architectural-layer suffix (see `File Suffixes` section):

1. **Plain files (no architectural suffix)** — components, hooks, utils, generic modules → **kebab-case**.
   Examples:
   ```
   user-profile.tsx
   login-form.tsx
   date-utils.ts
   app-router.ts
   ```

2. **Files with an architectural suffix (NestJS ecosystem convention)** — service, controller, module, dto, guard, etc. → **dot-notation**, matching the NestJS CLI / Angular-style convention. This takes precedence over the plain kebab-case rule whenever a suffix from the `File Suffixes` list is used.
   Examples:
   ```
   user.service.ts
   auth.controller.ts
   tenant.dto.ts
   jwt.guard.ts
   user.repository.ts
   ```

    ❌ Do NOT use `user-service.ts`, `auth-controller.ts` — dash-separated suffixes are prohibited once a recognized architectural suffix is used. The base entity name before the suffix should still be kebab-case if multi-word: `tenant-permission.dto.ts`, `refresh-token.guard.ts`.

# React / Next.js Naming

## Components

Use **PascalCase** for the component name inside the file. File name follows the plain-file rule (**kebab-case**, no architectural suffix applies to components).

- File: `user-profile.tsx`, `login-form.tsx`
- Component definition: `const UserProfile = () => {}`

## Hooks

Must start with `use` using **kebab-case** for file names and **camelCase** for the function.

- File: `use-auth.ts`, `use-tenant-permission.ts`
- Function: `const useAuth = () => {}`

## Context & Providers

- File: `auth.context.tsx` -> Component: `AuthContext`
- File: `auth.provider.tsx` -> Component: `AuthProvider`

# File Suffixes

Use suffixes only when they provide critical architectural meaning for navigation and layering. **When any of these suffixes is used, the file MUST use dot-notation as defined in `File & Folder Layer > TypeScript/JavaScript/React` above — never dash-notation.**

```

# Logic & Architecture

*.service.ts
*.repository.ts
*.controller.ts
*.middleware.ts
*.guard.ts
*.validator.ts
*.mapper.ts
*.module.ts

# Data & Config

*.dto.ts
*.types.ts
*.constants.ts
*.schema.ts
*.config.ts
*.utils.ts

# React Specific

*.hook.ts
*.context.tsx
*.provider.tsx
```

Examples:

```
user.service.ts
auth.repository.ts
tenant.dto.ts
user.types.ts
api.constants.ts
```

# Prohibited (TS/JS files)

- _Do not name a TS file in PascalCase:_ `UserService.ts` — use `user.service.ts`.
- _Do not dash-separate an architectural suffix:_ `user-service.ts`, `auth-controller.ts` — use `user.service.ts`, `auth.controller.ts` instead.
