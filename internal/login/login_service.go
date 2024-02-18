package login

import di "github.com/nodejayes/generic-di"

func init() {
	di.Injectable(NewLoginService)
}

type LoginService struct {

}

func NewLoginService() *LoginService {
	return &LoginService{}
}