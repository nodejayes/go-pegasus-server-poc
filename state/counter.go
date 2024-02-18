package state

import di "github.com/nodejayes/generic-di"

func init() {
	di.Injectable(NewCounterStore)
}

type (
	CounterStore struct {
		Value int
	}
)

func NewCounterStore() *CounterStore {
	return &CounterStore{
		Value: 0,
	}
}

func (ctx *CounterStore) Add(value int) {
	ctx.Value += value
}

func (ctx *CounterStore) Sub(value int) {
	ctx.Value -= value
}
