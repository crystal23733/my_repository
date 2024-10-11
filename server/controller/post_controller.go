package controller

import (
	"net/http"

	"github.com/labstack/echo/v4"
)

// PostController는 게시글 관련 요청을 처리하는 컨트롤러이다.
type PostController struct{}

// NewPostController는 새로운 PostController 인스턴스를 생성한다.
func NewPostController() *PostController {
	return &PostController{}
}

// Hello World를 출력하는 함수
func (c *PostController) HelloWorld(ctx echo.Context) error {
	return ctx.String(http.StatusOK, "Hello World")
}
