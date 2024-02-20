package main

import (
	"net/http"

	"github.com/nodejayes/fitlog_lit/cl"
	"github.com/nodejayes/fitlog_lit/pkg/api"
	"github.com/nodejayes/go-pegasus-server"
	goservefs "github.com/nodejayes/go-serve-fs"
)

var AllClients = func(client pegasus.Client) bool {
	return true
}

func main() {
	router := http.NewServeMux()

	pegasus.Register(router, &pegasus.Config{
		ActionUrl:            "/action",
		EventUrl:             "/events",
		ClientIDHeaderKey:    "clientId",
		SendConnectedAfterMs: 100,
		Handlers: []pegasus.ActionHandler{
			api.CounterHandler{},
		},
	})
	router.HandleFunc("/", goservefs.ConnectFS(cl.Files))

	http.ListenAndServe(":40000", router)
}
