package data

import "time"

type (
	UserDto struct {
		ID           string
		Name         string
		Email        string
		Forename     string
		Lastname     string
		Birthday     time.Time
		PasswordHash string
	}
)
