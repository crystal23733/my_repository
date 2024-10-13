package model

import "go.mongodb.org/mongo-driver/bson/primitive"

// 게시글의 조회할 데이터를 정의하는 구조체
type Reads struct {
	ID      primitive.ObjectID `json:"id" bson:"_id"`
	Title   string             `json:"title" bson:"title"`
	Content string             `json:"content" bson:"content"`
	Images  []string           `json:"images" bson:"images"`
}
