test: .build-tmp/build-image src/* test/*
	docker run --rm -it --cap-add=SYS_ADMIN -v ${PWD}/src:/app/src:ro -v ${PWD}/test:/app/test:ro rgpm:core-test

build: .build-tmp/build-image src/* test/*

install:
	yarn install --frozen-lockfile

.build-tmp/build-image: Dockerfile package.json yarn.lock webpack.config.js jest-puppeteer.config.js
	docker build -t rgpm -t rgpm:core-test .
	mkdir -p .build-tmp
	@touch $@

clean:
	rm -rf .build-tmp

clean-docker:
	docker rmim rgpm:core-test

clean-all: clean clean-docker

.PHONY: build test install clean

