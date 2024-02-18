package api

import (
	"encoding/json"

	"github.com/gin-gonic/gin"
	"github.com/nodejayes/fitlog_lit/state"
	di "github.com/nodejayes/generic-di"
	"github.com/nodejayes/go-pegasus-server"
)

type (
	CounterHandler struct{}
	CounterPayload struct {
		Operation string `json:"operation"`
		Value     int    `json:"value"`
	}
)

func (ctx CounterHandler) GetActionType() string {
	return "counter"
}

func parse[T any](value any) (T, error) {
	var target T
	buffer, err := json.Marshal(value)
	if err != nil {
		return target, err
	}
	err = json.Unmarshal(buffer, &target)
	return target, err
}

func (ctx CounterHandler) Handler(msg pegasus.Message, c *gin.Context) {
	payload, err := parse[CounterPayload](msg.Payload)
	if err != nil {
		return
	}
	clientId := c.GetHeader("clientId")
	counterStore := di.Inject[state.CounterStore]("clientId")
	sender := di.Inject[pegasus.EventHander]()

	switch payload.Operation {
	case "add":
		counterStore.Add(payload.Value)
		ctx.sendCurrentValue(sender, clientId, counterStore)
	case "sub":
		counterStore.Sub(payload.Value)
		ctx.sendCurrentValue(sender, clientId, counterStore)
	case "get":
		ctx.sendCurrentValue(sender, clientId, counterStore)
	}
}

func (ctx CounterHandler) sendCurrentValue(sender *pegasus.EventHander, clientId string, counterStore *state.CounterStore) {
	sender.SendMessage(func(client pegasus.Client) bool {
		return client.ID == clientId
	}, pegasus.Message{
		Type:    "[counterStore] new",
		Payload: counterStore.Value,
	})
}
