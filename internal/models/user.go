package models

import "time"

type User struct {
	ID           string
	Name         string
	Email        string
	Forename     string
	Lastname     string
	Birthday     time.Time
	PasswordHash string
}
