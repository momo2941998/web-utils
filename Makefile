dev: dev-env 
	npm run dev 

docker-dev: dev-env clean
	docker-compose up --build

prod: prod-env
	npm run build && docker-compose up -d --build

dev-env:
	yes | cp dev/.env .env && \
	yes | cp dev/package.json package.json && \
	yes | cp dev/Dockerfile Dockerfile && \
	yes | cp dev/docker-compose.yml docker-compose.yml 

prod-env: 
	yes | cp prod/.env .env && \
	yes | cp prod/package.json package.json && \
	yes | cp prod/Dockerfile Dockerfile && \
	yes | cp prod/docker-compose.yml docker-compose.yml 

clean:
	sh clean.sh

