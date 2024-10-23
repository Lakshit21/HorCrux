package tests

import (
	"fmt"
	"horcrux-backend/config"
	"log"
	"os"

	"github.com/gofiber/fiber/v2"
	"go.mongodb.org/mongo-driver/mongo"
)

// This Function is been used to check the connection between Backend and DataBase

func dbtest() {
	var dbName string = os.Getenv("DB_NAME")
	var dataBase *mongo.Database = config.ConnectDB().Database(dbName)

	app := fiber.New()

	app.Get("/check-db", func(c *fiber.Ctx) error {
		var testCollection *mongo.Collection = dataBase.Collection("tests")
		// Insert a sample document
		fmt.Println("[GET METHOD] dbName", dbName)
		fmt.Println("[GET METHOD] dataBase", dataBase)
		fmt.Println("[GET METHOD] testCollection", testCollection)

		_, err := testCollection.InsertOne(c.Context(), map[string]string{"status": "connected"})
		if err != nil {
			return c.Status(500).SendString("Failed to connect to DB")
		}

		return c.SendString("Successfully connected to MongoDB!")
	})

	port := os.Getenv("PORT")
	if port == "" {
		port = "3001"
	}
	log.Fatal(app.Listen(":" + port))
}

// var dbName string = os.Getenv("DB_NAME")
// var dataBase *mongo.Database = config.ConnectDB().Database(dbName)
// var linkCollection *mongo.Collection = dataBase.Collection("links")
