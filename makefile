.PHONY: up down build

build:
	cp ./package.json ./docker/
	docker-compose build
	rm ./docker/package.json

up:
	docker-compose up -d

down:
	docker-compose down --volumes --remove-orphans

bash:
	docker-compose exec yourlife_web bash -l -c "export TERM=xterm; export COLUMNS=`tput cols`; export LINES=`tput lines`; exec bash -l"
