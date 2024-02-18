package data

import di "github.com/nodejayes/generic-di"

func init() {
	di.Injectable(NewUserRepository)
}

type UserRepository struct{}

func NewUserRepository() *UserRepository {
	return &UserRepository{}
}