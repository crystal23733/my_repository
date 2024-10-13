package db

import (
	"context"
	"fmt"
	"log"
	"server/config"
	"time"

	"go.mongodb.org/mongo-driver/mongo"
	"go.mongodb.org/mongo-driver/mongo/options"
)

// MongoClient는 애플리케이션 전체에서 사용할 MongoDB클라이언트이다.
var MongoClient *mongo.Client

// ConnectMongoDB는 MongoDB 클라이언트를 초기화하고 연결을 반환한다.
func ConnectMongo() *mongo.Client{
	DB_URL := config.DB_URL()
	clientOptions := options.Client().ApplyURI(DB_URL)
	
	// 클라이언트 연결 시도
	client, err := mongo.Connect(context.TODO(), clientOptions)
	if err != nil {
		log.Fatal("MongoDB 연결 실패", err)
	}

	// MongoDB연결 확인
	ctx, cancel := context.WithTimeout(context.Background(), 5 * time.Second)
	defer cancel()

	err = client.Ping(ctx, nil)
	if err != nil {
		log.Fatal("MongoDB 연결 핑 실패: ", err)
	}
	fmt.Println("성공적으로 DB를 연결하였습니다.")
	return client
}
