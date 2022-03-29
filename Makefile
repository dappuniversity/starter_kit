# Global vars
USER = junqueror
APP = breadcrumbs
DIRECTORY = ${APP}
GCLOUD_USER = pmjunquera
GCLOUD_PROJECT = breadcrumbs-345213
GCLOUD_REPOSITORY = breadcrumbs
GCLOUD_HOST = 34.78.61.132
GCLOUD_VM = production

# Arument vars
ENV = local

# Environment vars
include ./.env.${ENV}
export

# Deploy on Docker

docker-build:
	docker-compose -f ./deploy/docker/${ENV}/docker-compose.yml build

docker-up-dev:
	docker-compose -f ./deploy/docker/${ENV}/docker-compose.yml rm -s -v -f frontend
	docker-compose -f ./deploy/docker/${ENV}/docker-compose.yml up frontend

docker-up:
	docker-compose -f ./deploy/docker/${ENV}/docker-compose.yml up -d

docker-test:
	docker-compose -f ./deploy/docker/${ENV}/docker-compose.yml up truffle-test

docker-down:
	docker-compose -f ./deploy/docker/${ENV}/docker-compose.yml down

docker-push:
	docker-compose -f ./deploy/docker/${ENV}/docker-compose.yml push

docker-pull:
	docker-compose -f ./deploy/docker/${ENV}/docker-compose.yml pull


gcloud-set-config:
	gcloud config set project ${GCLOUD_PROJECT}
	gcloud config set artifacts/repository ${GCLOUD_REPOSITORY}
	gcloud config set artifacts/location europe-west1
	$(MAKE) gcloud-set-auth-docker

gcloud-set-auth-docker:
	gcloud auth configure-docker europe-west1-docker.pkg.dev

gcloud-list-artifacts:
	gcloud artifacts packages list

gcloud-ssh:
	gcloud compute ssh $(GCLOUD_USER)@$(GCLOUD_VM)

gcloud-scp-push:
	@echo
	@echo Copying file to 'production' instance in Google Cloud:
	@echo
	gcloud compute scp --recurse $(PWD)/$(FILE) $(GCLOUD_USER)@$(GCLOUD_VM):/home/$(GCLOUD_USER)/$(APP)/$(FILE)
	@echo

gcloud-scp-pull:
	@echo
	@echo Copying file from 'production' instance in Google Cloud:
	@echo
	gcloud compute  scp --recurse $(GCLOUD_USER)@$(GCLOUD_VM):/home/$(GCLOUD_USER)/$(APP)/$(FILE) $(PWD)/$(FILE)
	@echo