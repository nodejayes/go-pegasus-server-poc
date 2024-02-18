package main

import (
	"github.com/gin-gonic/gin"
	"github.com/nodejayes/fitlog_lit/cl"
	"github.com/nodejayes/fitlog_lit/pkg/api"
	ginembeddfsmiddleware "github.com/nodejayes/gin-embedd-fs-middleware"
	"github.com/nodejayes/go-pegasus-server"
)

var AllClients = func(client pegasus.Client) bool {
	return true
}

func main() {
	router := gin.Default()

	router.Use(ginembeddfsmiddleware.ConnectFS(cl.Files))
	pegasus.Register(router, &pegasus.Config{
		ActionUrl:            "/action",
		EventUrl:             "/events",
		ClientIDHeaderKey:    "clientId",
		SendConnectedAfterMs: 100,
		Handlers: []pegasus.ActionHandler{
			api.CounterHandler{},
		},
	})

	router.Run(":40000")
}
