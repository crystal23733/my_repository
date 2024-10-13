package model

import "go.mongodb.org/mongo-driver/bson/primitive"

// 게시글의 제목과 ID를 정의하는 구조체
type Gets struct {
	ID primitive.ObjectID `json:"id" bson:"_id"`
	Titie string `json:"title" bson:"title"`
}
