
db:
	docker compose up -d mongo

pre-prod:
	docker-compose up --build

prod:
	docker-compose up -d