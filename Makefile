current_dir := $(shell pwd)
.PHONY: build

build:
	sudo docker build -t frontend -f dev.Dockerfile puma/

.PHONY: run

run:
	sudo docker run --rm -p 8080:8080 -it -v $(current_dir):/root/.composer/cache:delegated -v $(current_dir):/app:cached frontend

.PHONY: dev

dev:
	sudo docker build -t frontend -f dev.Dockerfile puma/ && sudo docker run --rm -p 8080:8080 -it -v $(current_dir):/root/.composer/cache:delegated -v $(current_dir):/app:cached frontend
	