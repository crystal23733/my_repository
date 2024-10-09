package main

import (
	"net/http"

	"github.com/labstack/echo/v4"
	"github.com/labstack/echo/v4/middleware"
)

// main함수는 서버를 초기화하고 기본설정을 적용한 뒤 실행한다.
func main() {
	// Echo인스턴스 생성
	e := echo.New()

	// 미들웨어 설정
	e.Use(middleware.Logger())
	e.Use(middleware.Recover())

	// 기본 경로에 대한 핸들러 설정
	e.GET("/", hello)

	e.Logger.Fatal(e.Start(":8080"))
}

// hello 함수는 기본 "/" 경로에서 호출되며, 간단한 응답을 반환합니다.
// @Summary 기본 응답
// @Description "/" 경로에서 서버의 기본 상태를 확인합니다.
// @Tags root
// @Produce plain
// @Success 200 {string} string "OK"
// @Router / [get]
func hello(c echo.Context) error {
	return c.String(http.StatusOK, "Hello, Echo Server!")
}
