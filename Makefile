build_client:
	cd ./cl && npm run build

build_backend:
	go build -o ./tmp/main.exe ./cmd/main.go

build:
	make build_client
	make build_backend

run_build:
	make build
	./tmp/main.exe

run:
	make build_client && go run ./cmd/main.go