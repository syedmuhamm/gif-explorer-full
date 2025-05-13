# Makefile

build:
	docker-compose build --no-cache

up:
	docker-compose up -d

down:
	docker-compose down

logs:
	docker-compose logs -f

frontend:
	docker-compose exec frontend sh

backend:
	docker-compose exec backend sh

rebuild:
	docker-compose down && docker-compose build --no-cache && docker-compose up -d
