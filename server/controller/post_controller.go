package controller

import (
	"context"
	"io"
	"log"
	"net/http"
	"os"
	"path/filepath"
	"server/config"
	"server/model"
	"time"

	"github.com/labstack/echo/v4"
	"go.mongodb.org/mongo-driver/mongo"
)

// PostController는 게시글 관련 요청을 처리하는 컨트롤러이다.
type PostController struct {
	DB *mongo.Client
}

// NewPostController는 새로운 PostController 인스턴스를 생성한다.
func NewPostController(db *mongo.Client) *PostController {
	return &PostController{DB: db}
}

// PostsCreate
func (c *PostController) PostsCreate(ctx echo.Context) error {
	// 폼 필드에서 필드를 추출
	title := ctx.FormValue("title")
	content := ctx.FormValue("content")

	// 제목과 내용이 없는 경우 Bad Request 로그와 응답
	if title == "" || content == "" {
		log.Println("Error: 제목 또는 내용이 비어 있습니다.")
		return ctx.JSON(http.StatusBadRequest, map[string]string{"error": "제목과 내용은 필수입니다."})
	}

	// 수신할 파일들을 저장할 경로 설정
	savePath := "./uploads"
	if _, err := os.Stat(savePath); os.IsNotExist(err) {
		os.Mkdir(savePath, os.ModePerm)
	}

	var imagePaths []string

	// 여러 이미지 파일을 처리한다.
	form, err := ctx.MultipartForm()
	if err != nil {
		return ctx.JSON(http.StatusBadRequest, map[string]string{"error": "잘못된 요청입니다."})
	}

	files := form.File["images"]
	for _, file := range files {
		// 각 파일을 /uploads폴더에 저장
		filePath := filepath.Join(savePath, file.Filename)
		src, err := file.Open()
		if err != nil {
			return ctx.JSON(http.StatusInternalServerError, map[string]string{"error": "파일 열기 실패"})
		}
		defer src.Close()

		dst, err := os.Create(filePath)
		if err != nil {
			return ctx.JSON(http.StatusInternalServerError, map[string]string{"error": "파일 저장 실패"})
		}
		defer dst.Close()

		//파일을 저장한다.
		if _, err := io.Copy(dst, src); err != nil {
			return ctx.JSON(http.StatusInternalServerError, map[string]string{"error": "파일 복사 실패"})
		}

		imagePaths = append(imagePaths, filePath) // 저장된 파일 경로를 기록합니다.
	}

	// 데이터 확인
	post := model.Post{
		Title:   title,
		Content: content,
		Images:  imagePaths,
	}

	// MongoDB에 데이터 저장
	collection := c.DB.Database(config.DB_NAME()).Collection("posts")
	ctxMongo, cancel := context.WithTimeout(context.Background(), 5*time.Second)
	defer cancel()

	result, err := collection.InsertOne(ctxMongo, post)
	if err != nil {
		log.Fatal("MongoDB 데이터 저장 실패:", err)
		return ctx.JSON(http.StatusInternalServerError, map[string]string{"error": "데이터 저장 실패"})
	}
	log.Printf("MongoDB에 데이터 삽입 완료: ID=%v", result.InsertedID)

	return ctx.JSON(http.StatusOK, map[string]interface{}{
		"message": "데이터를 받았습니다.",
		"post":    post,
	})

}
