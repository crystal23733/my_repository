package model

// post구조체는 게시글의 구조를 정의한다.
type Post struct {
	Title string `json:"title" bson:"title"` // 게시글 제목
	Content string `json:"content" bson:"content"` // 게시글 내용
	Images []string `json:"images" bson:"images"` // 이미지 URL 목록
}

