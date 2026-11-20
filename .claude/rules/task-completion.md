---
description: >-
  Làm hết phạm vi yêu cầu một lần rồi dừng; chặn thoát sớm và vòng sửa lặp (luôn áp dụng).
---

# Task completion

At the start of a multi-step task, list the deliverables from the user request (about 3–7 items). That list is the scope. Do not ask the user to approve it.

## Keep going

- End the turn only when every item is done or explicitly blocked.
- A block is only a missing secret, a destructive action, or a choice that changes user-visible behavior and has no existing project pattern.
- If a reasonable default exists in the current codebase, use it, note the assumption in one line, and continue.
- Do not stop after a plan, after the first module, or with "next I can…".
- Do not split a clear request into follow-up turns.

## Stop revising

- Implement the full scope first. Fix compile or test failures that block the next item; do not polish between items.
- Verify once, against the deliverable list only.
- One repair pass, only for items that fail that list. Re-check only what that pass changed.
- If it still fails, report the residual risk and stop. Do not start a third redesign.
- Style, naming, refactors, and extra edge cases go in a short residual note. They are not another edit cycle.

Debug sessions follow the debugging skill (`systematic-debugging`; the stricter `/debug-fix-protocol` on request) instead of this rule.
