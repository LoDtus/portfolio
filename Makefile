.PHONY: local dev check prod down clean clean-docker

# Chạy dự án trực tiếp trên máy cục bộ
local:
	npm run dev

# Khởi động môi trường phát triển bằng Docker
dev:
	docker compose --profile dev up -d --build

# Kiểm tra lint, TypeScript và khả năng build
check:
	npm run lint
	npm run type-check
	npm run build

# Build và khởi động môi trường production
prod:
	docker compose --profile prod up -d --build

# Dừng và xóa các container của dự án
down:
	docker compose --profile dev --profile prod down

# Xóa các file sinh ra trong quá trình build
clean:
	npm run clean

# Xóa toàn bộ môi trường Docker
clean-docker:
	docker compose --profile dev --profile prod down -v --remove-orphans