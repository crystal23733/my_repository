package controller

import (
	"context"
	"fmt"
	"io"
	"log"
	"net/http"
	"os"
	"path/filepath"
	"server/config"
	"server/model"
	"time"

	"github.com/labstack/echo/v4"
	"go.mongodb.org/mongo-driver/bson"
	"go.mongodb.org/mongo-driver/bson/primitive"
	"go.mongodb.org/mongo-driver/mongo"
	"go.mongodb.org/mongo-driver/mongo/options"
)

// PostController는 게시글 관련 요청을 처리하는 컨트롤러이다.
type PostController struct {
	DB      *mongo.Client
	DBName  string
	BaseURL string
}

// NewPostController는 새로운 PostController 인스턴스를 생성한다.
func NewPostController(db *mongo.Client) *PostController {
	return &PostController{
		DB:      db,
		DBName:  config.DB_NAME(),
		BaseURL: config.SERVER_URL(),
	}
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
		// 파일 이름에 타임스탬프 추가하여 유니크하게 만듦
		filename := fmt.Sprintf("%d_%s", time.Now().UnixNano(), file.Filename)
		filePath := filepath.Join(savePath, filename)

		// 각 파일을 /uploads폴더에 저장
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

		// 상대 경로로 저장
		relativeImagePath := filepath.Join("uploads", filename)
		imagePaths = append(imagePaths, relativeImagePath)
	}

	// 데이터 확인
	post := model.Post{
		Title:   title,
		Content: content,
		Images:  imagePaths,
	}

	// MongoDB에 데이터 저장
	collection := c.DB.Database(c.DBName).Collection("posts")
	ctxMongo, cancel := context.WithTimeout(context.Background(), 5*time.Second)
	defer cancel()

	result, err := collection.InsertOne(ctxMongo, post)
	if err != nil {
		log.Printf("MongoDB 데이터 저장 실패:%v", err)
		return ctx.JSON(http.StatusInternalServerError, map[string]string{"error": "데이터 저장 실패"})
	}
	log.Printf("MongoDB에 데이터 삽입 완료: ID=%v", result.InsertedID)

	return ctx.JSON(http.StatusOK, map[string]interface{}{
		"message": "데이터를 받았습니다.",
		"post":    post,
	})

}

// 게시글 제목과 ID를 반환하는 함수
func (c *PostController) GetPostsTitles(ctx echo.Context) error {
	collection := c.DB.Database(c.DBName).Collection("posts")
	ctxMongo, cancel := context.WithTimeout(context.Background(), 5*time.Second)
	defer cancel()

	// MongoDB에서 게시글의 ID와 제목만 가져옴
	cursor, err := collection.Find(ctxMongo, bson.M{}, options.Find().SetProjection(bson.M{
		"title": 1,
		"_id":   1,
	}))
	if err != nil {
		log.Println("MongoDB 쿼리 실패:", err)
		return ctx.JSON(http.StatusInternalServerError, map[string]string{"error": "데이터를 가져오는 중 문제가 발생하였습니다."})
	}
	defer cursor.Close(ctxMongo)

	var posts []model.Gets
	if err := cursor.All(ctxMongo, &posts); err != nil {
		log.Printf("데이터 디코딩 실패: %v", err)
		return ctx.JSON(http.StatusInternalServerError, map[string]string{"error": "데이터를 가져오는 중 문제가 발생했습니다."})
	}

	return ctx.JSON(http.StatusOK, posts)
}

// GetPostDetail함수는 특정 게시글의 상세 정보를 반환
func (c *PostController) GetPostsDetails(ctx echo.Context) error {
	postID := ctx.Param("id")

	objID, err := primitive.ObjectIDFromHex(postID)
	if err != nil {
		return ctx.JSON(http.StatusBadRequest, map[string]string{"error": "잘못된 게시글 ID형식"})
	}

	collection := c.DB.Database(c.DBName).Collection("posts")
	ctxMongo, cancel := context.WithTimeout(context.Background(), 5*time.Second)
	defer cancel()

	var post model.Reads
	err = collection.FindOne(ctxMongo, bson.M{"_id": objID}).Decode(&post)
	if err != nil {
		if err == mongo.ErrNoDocuments {
			return ctx.JSON(http.StatusNotFound, map[string]string{"error": "게시글을 찾을 수 없습니다"})
		}
		return ctx.JSON(http.StatusInternalServerError, map[string]string{"error": "데이터를 가져오는 중 문제가 발생했습니다"})
	}

	// 이미지 URL 생성
	for i, imagePath := range post.Images {
		post.Images[i] = c.BaseURL + "/" + imagePath
	}

	return ctx.JSON(http.StatusOK, post)
}
