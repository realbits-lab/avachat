LOCAL_REPO = avtchat/frontend
REMOTE_REPO = registry.dev.dxr.kr/$(LOCAL_REPO)

VERSION = $(shell cat ./VERSION 2> /dev/null)

TS_FILENAME = ts-$(VERSION).marker
TS_EPOCH = $(shell cat $(TS_FILENAME) 2> /dev/null)
ifeq ($(TS_EPOCH),)
	TS_EPOCH := $(shell date +%s)
endif

TAG_VERSION = $(VERSION).$(TS_EPOCH)

.PHONY: build

all:
	@echo "make docker --> build docker image for $(TAG_VERSION)"
	@echo "make clean --> delete generated files and docker images"
	@echo "make clean_etc --> delete dangled docker images"

build:
	npm run build

docker: $(TS_FILENAME)
	docker build \
		--build-arg VER_TS=$(TS_EPOCH) \
		--build-arg VER_NAME=$(TAG_VERSION) \
		--tag $(LOCAL_REPO):$(TAG_VERSION) .

$(TS_FILENAME):
	@echo $(TS_EPOCH) > $@

run_docker:
	docker run -it --rm --name run_avtchat -p 4380:8000 $(LOCAL_REPO):$(TAG_VERSION)

run_docker_sh:
	docker run -it --rm --name run_avtchat -p 4380:8000 --entrypoint /bin/sh $(LOCAL_REPO):$(TAG_VERSION)

push_docker:
	docker tag $(LOCAL_REPO):$(TAG_VERSION) $(REMOTE_REPO):$(TAG_VERSION)
	docker push $(REMOTE_REPO):$(TAG_VERSION)
	docker rmi $(REMOTE_REPO):$(TAG_VERSION)

deploy_dev:
	kubectl -n demo set image deployment/avtchat-frontend avtchat-frontend=$(REMOTE_REPO):$(TAG_VERSION) --dry-run=client

clean_etc:
	docker rmi -f $(shell docker images -f "dangling=true" -q)
	docker rmi -f $(shell docker images $(LOCAL_REPO) -q)
	rm -f ts-*.marker

clean:
	rm -f $(TS_FILENAME)
	rm -rf ./public/build
	rm -rf ./build
	docker rmi -f $(LOCAL_REPO):$(TAG_VERSION)

chkimg:
	@echo `docker images | grep $(LOCAL_REPO) | grep $(TAG_VERSION)`

tagver:
	@echo $(TAG_VERSION)
