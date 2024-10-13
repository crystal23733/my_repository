package main

import (
	"log"
	"net/http"
	"server/config"
	"server/controller"
	"server/db"

	"github.com/labstack/echo/v4"
	"github.com/labstack/echo/v4/middleware"
)

// main함수는 서버를 초기화하고 기본설정을 적용한 뒤 실행한다.
func main() {
	// .env 파일 로드
	err := config.LoadEnv()
	if err != nil {
		log.Fatal("환경 변수를 로드하지 못했습니다:", err)
	}
	
	// MongoDB 연결 초기화
	dbClient := db.ConnectMongo()

	// Echo인스턴스 생성
	e := echo.New()

	// CORS 설정
	e.Use(middleware.CORSWithConfig(middleware.CORSConfig{
		AllowOrigins: []string{config.ClientURL()},
		AllowMethods: []string{http.MethodGet, http.MethodPost, http.MethodPut, http.MethodOptions, http.MethodPatch, http.MethodDelete},
	}))

	// 미들웨어 설정
	e.Use(middleware.Logger())
	e.Use(middleware.Recover())

	// post라우팅
	postController := controller.NewPostController(dbClient)

	// 기본 경로에 대한 핸들러 설정
	e.GET("/", hello)
	e.POST("/posts", postController.PostsCreate)

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
