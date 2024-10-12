/*
config 패키지는 애플리케이션의 설정 및 환경 변수를 로드하고 관리하는 기능을 제공한다.
*/

package config

import (
	"log"
	"os"

	"github.com/joho/godotenv"
)

// LoadEnv는 .env파일을 로드한다.
func LoadEnv() error {
	err := godotenv.Load()
	if err != nil {
		log.Printf("환경변수 파일을 찾을 수 없습니다.")
		return err
	}
	return nil
}

// Port는 환경변수에서 Port를 반환하거나 기본값을 반환한다.
func Port() string {
	port := os.Getenv("PORT")
	if port == "" {
		port = "5000"
	}
	return port
}

func ClientURL() string {
	clientURL := os.Getenv("CLIENT_URL")
	return clientURL
}

func DB_URL() string {
	dbUrl := os.Getenv("DB_URL")
	return dbUrl
}

func DB_NAME() string {
	dbName := os.Getenv("DB_NAME")
	return dbName
}
