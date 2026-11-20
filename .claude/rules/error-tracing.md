---
description: Ghi trace khi bắt hoặc xử lý lỗi, dùng đúng logger và cơ chế mặc định của stack đang có; không nuốt lỗi, không lộ stack hay dữ liệu nhạy cảm.
paths:
  - "**/*.{ts,tsx,js,jsx,mjs,cjs,py,go,java,kt,cs,php,rb,rs,swift}"
---

# Trace lỗi (đa stack)

Mục tiêu: mỗi lỗi bất ngờ để lại **một** dấu vết đủ để điều tra (xảy ra ở đâu, đang làm gì, stack, mã tương quan), không lộ ra client, không lộ dữ liệu nhạy cảm. Rule này nói về cách làm, không áp đặt thư viện.

## 1. Dùng cái đã có, không định nghĩa mới

1. Tìm cách ghi log/trace dự án đang dùng: logger trong module lân cận, filter/handler toàn cục, middleware, thư viện có trong manifest. Dùng lại đúng cái đó.
2. Chưa có gì: dùng cơ chế mặc định của framework hoặc ngôn ngữ (mục 8).
3. Không thêm thư viện log/trace, không tự viết wrapper kiểu `logError()` khi chưa được yêu cầu (xem phần dependency ở `global.md`). Thấy cần thì đề xuất.
4. Cú pháp theo đúng phiên bản trong manifest (`package.json`, `pyproject.toml`, `go.mod`, `pom.xml`...). Không đoán chữ ký hàm.

## 2. Bắt ở một chỗ, log một lần, kèm stack

- Đưa **đối tượng lỗi** (hoặc stack) cho logger. Không chỉ ghi `err.message`, `String(err)` hay f-string vì mất stack.
- Thêm ngữ cảnh ngắn: đang làm thao tác gì, định danh không nhạy cảm (id bản ghi, tên job). Không log nguyên request body.
- Log tại nơi lỗi được xử lý xong (biên của request, worker, job). Nếu chỉ chuyển tiếp thì **không log ở đây** mà ném lại, vì log ở mỗi tầng sẽ ra nhiều dòng cho cùng một lỗi.
- Cần thêm ngữ cảnh khi ném lại thì bọc lỗi và giữ nguyên nhân gốc (`cause`, `raise ... from`, `%w`, tham số `Throwable` của constructor).
- Bắt rồi chạy tiếp (catch-and-continue) với lỗi bất ngờ: log kèm stack ngay tại chỗ, trước mọi lệnh có thể lỗi tiếp.

## 3. Phân loại lỗi

| Loại | Ví dụ | Mức log | Stack |
|---|---|---|---|
| Lỗi dự kiến (nghiệp vụ, đầu vào) | validation, không tìm thấy, 401/403 | warn hoặc info | không |
| Lỗi bất ngờ | DB, mạng, bug, null | error | có |
| Bỏ qua có chủ đích | xem mục 4 | debug hoặc không | không |

Lỗi dự kiến dùng kiểu lỗi có sẵn của framework (ví dụ `HttpException`, `ResponseStatusException`, `abort()`), không tự tạo hệ thống mã lỗi mới.

## 4. Không nuốt lỗi

- Cấm khối bắt rỗng: `catch {}`, `.catch(() => {})`, `except: pass`, `except Exception: pass`, `_ = err`, `catch (Exception) {}`.
- Chỉ được im lặng khi có comment một dòng nêu lý do, và chỉ trong các trường hợp:
  - Hủy chủ đích (`AbortError`, cancel, unmount).
  - Frame hoặc payload hỏng được bỏ qua có chủ đích (parse JSON một khung SSE).
  - Dọn dẹp khi đóng (`close`, `unsubscribe`, teardown pool).
  - Thăm dò hoặc fallback tùy chọn (selector không có, parse URL rồi dùng giá trị mặc định); log mức debug nếu hữu ích.
  - Ném lại lỗi dự kiến lên tầng trên.

## 5. Biên hệ thống và client

- Mỗi tiến trình có **một nơi chặn cuối** ghi log lỗi bất ngờ và đổi thành phản hồi an toàn: exception filter, error middleware, global handler, error boundary.
- Lỗi không ai bắt cũng cần nơi ghi: handler mức tiến trình (`unhandledRejection`, `uncaughtException`, `sys.excepthook`, panic recovery), hook lỗi của hàng đợi và worker.
- Client chỉ nhận thông báo chung và mã tương quan (bắt buộc ở mọi dự án theo `security.md`; tên trường mặc định `trackId`, hoặc tên sẵn có của dự án như `traceId`). Không trả stack, thông báo của DB, đường dẫn file.
- Frontend: ghi log cho developer (`console.error` kèm ngữ cảnh) và thông báo thân thiện cho người dùng. Không hiện stack trên giao diện.

## 6. Mã tương quan (trace id)

- Dùng mã đã có: header `x-request-id` hoặc `traceparent`, span context của OpenTelemetry nếu dự án đã dùng, id mà framework sinh.
- Chỉ tạo mới khi chưa có, tạo một lần ở biên và gắn vào mọi log của request đó.
- Phản hồi lỗi 500 luôn có trường mã tương quan mang đúng mã này (bắt buộc theo `security.md`). Các phản hồi khác không tự thêm trường trace khi hợp đồng chưa có.

## 7. An toàn

- Không log mật khẩu, token, header `Authorization`, dữ liệu cá nhân, khóa API (theo `security.md` mục Secure Logging). Loại `\r` và `\n` khỏi chuỗi do người dùng nhập trước khi log.
- Không log nguyên đối tượng request, response hay config. Chọn đúng trường cần.
- Không để log gỡ lỗi (`console.log`, `print`) lọt vào code đưa lên production.

## 8. Cơ chế mặc định theo stack

Chỉ dùng khi dự án **chưa có** cách khác. Nếu dự án đã dùng thư viện khác thì thư viện đó thắng. Đối chiếu chữ ký với phiên bản đang cài.

| Stack | Ghi log kèm stack | Chặn cuối / lỗi dự kiến |
|---|---|---|
| NestJS | `Logger` của `@nestjs/common`: `private readonly logger = new Logger(X.name)`, rồi `this.logger.error(msg, err instanceof Error ? err.stack : String(err))` | `HttpException` và lớp con; `@Catch()` + `ExceptionFilter` (hoặc `APP_FILTER`) |
| Node / Express | Logger đang dùng; nếu chưa có thì `console.error("ngữ cảnh", err)` giữ nguyên đối tượng `err` | middleware lỗi 4 tham số `(err, req, res, next)`; `process.on("unhandledRejection")` |
| Next.js | `console.error("ngữ cảnh", err)` trong route handler, server action | `error.tsx`, `global-error.tsx`; hook `onRequestError` trong `instrumentation.ts` nếu phiên bản có |
| React (client) | `catch (err) { console.error("ngữ cảnh", err) }` kèm toast/thông báo thân thiện | Error Boundary |
| Python | module `logging`: `logger = logging.getLogger(__name__)`, trong `except` dùng `logger.exception("ngữ cảnh")` (tự kèm traceback). Dự án dùng loguru hoặc structlog thì dùng `logger.exception` của nó | `@app.exception_handler` (FastAPI), `errorhandler` (Flask), `handler500` (Django); Celery: signal `task_failure` hoặc `on_failure` |
| Go | `log/slog`: `slog.Error("ngữ cảnh", "err", err)`; bọc lỗi bằng `fmt.Errorf("ngữ cảnh: %w", err)`, so sánh bằng `errors.Is` / `errors.As` | middleware recover; không vừa log vừa trả lỗi ở cùng tầng |
| Java / Kotlin (Spring) | SLF4J: `log.error("ngữ cảnh", ex)` (ngoại lệ là tham số cuối) | `@RestControllerAdvice` + `@ExceptionHandler` |
| C# / .NET | `ILogger<T>`: `_logger.LogError(ex, "ngữ cảnh {Id}", id)` | `UseExceptionHandler` hoặc `IExceptionHandler` |
| PHP (Laravel) | `Log::error("ngữ cảnh", ["exception" => $e])` hoặc `report($e)` | cấu hình `withExceptions` / `Handler` |
| Ruby (Rails) | `Rails.logger.error`, hoặc `Rails.error.report(e)` nếu phiên bản có | `rescue_from` |
| Rust | `tracing::error!(error = ?err, "ngữ cảnh")` hoặc crate `log` tùy dự án; thêm ngữ cảnh bằng `anyhow::Context` hoặc `thiserror` | xử lý ở tầng `main` / middleware |

Stack khác không có trong bảng: dùng logger chuẩn của ngôn ngữ hoặc framework đó, nguyên tắc ở mục 2–7 vẫn áp dụng.

## 9. Kiểm tra nhanh trước khi commit

Tìm khối bắt lỗi có khả năng nuốt lỗi, rồi xem từng kết quả có thuộc danh sách được miễn ở mục 4 không:

```bash
# TypeScript / JavaScript
rg -n --pcre2 'catch\s*(\([^)]*\))?\s*\{\s*\}|\.catch\(\s*\(\s*\w*\s*\)\s*=>\s*(undefined|\{\s*\})?\s*\)' -g '*.{ts,tsx,js,jsx}'

# Python
rg -n -U 'except[^\n:]*:\s*\n\s*pass\b|except[^\n:]*:\s*pass\b' -g '*.py'
```

Với stack khác, tìm tương đương: khối `catch`/`rescue`/`recover` không có log, không ném lại, không trả lỗi.
