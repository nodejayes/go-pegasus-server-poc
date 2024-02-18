package cl

import "embed"

//go:embed all:dist/*
var Files embed.FS
