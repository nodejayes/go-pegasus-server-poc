build_client:
	cd ./cl && npm run build

build_backend:
	go build -o ./tmp/main.exe ./cmd/main.go

build_backend_release:
	go build -o ./bin/PegasusPOC.exe ./cmd/main.go

build:
	make build_client
	make build_backend

mon_build:
	make build_client
	make build_backend
	./tmp/main.exe

run:
	make build_client && go run ./cmd/main.go

release:
	make build_client
	make build_backend_release