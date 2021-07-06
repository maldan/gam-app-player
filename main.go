package main

import (
	"embed"

	helloworld "github.com/maldan/gam-app-player/internal/app/player"
)

//go:embed frontend/build/*
var frontFs embed.FS

func main() {
	helloworld.Start(frontFs) //
}
