package controllers

import (
	"context"
	"log"
	"net/http"
	"os"
	"time"

	"horcrux-backend/config"
	"horcrux-backend/models"

	"github.com/gofiber/fiber/v2"
	"github.com/joho/godotenv"
	"go.mongodb.org/mongo-driver/bson"
	"go.mongodb.org/mongo-driver/bson/primitive"
	"go.mongodb.org/mongo-driver/mongo"
)

// Globals that remain unchanged after initialization
var (
	dbName         string
	dataBase       *mongo.Database
	linkCollection *mongo.Collection
)

// init function for controller package
func init() {
	err := godotenv.Load()
	if err != nil {
		log.Fatalf("Error loading .env file")
	} else {
		log.Println("Successful loading .env file")
	}

	// Set globals once
	dbName = os.Getenv("DB_NAME")
	dataBase = config.ConnectDB().Database(dbName)
	linkCollection = dataBase.Collection("links")
}

// Get All Links
func GetLinks(c *fiber.Ctx) error {

	var links []models.Link

	cursor, err := linkCollection.Find(context.Background(), bson.M{})
	if err != nil {
		return c.Status(http.StatusInternalServerError).JSON(fiber.Map{"error": err.Error()})
	}
	defer cursor.Close(context.Background())

	for cursor.Next(context.Background()) {
		var link models.Link
		cursor.Decode(&link)
		links = append(links, link)
	}

	return c.JSON(links)
}

// Get Link by Id
func GetLink(c *fiber.Ctx) error {
	idParam := c.Params("id")
	id, err := primitive.ObjectIDFromHex(idParam)
	if err != nil {
		return c.Status(http.StatusBadRequest).JSON(fiber.Map{"error": "Invalid ID"})
	}

	var link models.Link
	err = linkCollection.FindOne(context.Background(), bson.M{"_id": id}).Decode(&link)
	if err != nil {
		if err == mongo.ErrNoDocuments {
			return c.Status(http.StatusNotFound).JSON(fiber.Map{"error": "Link not found"})
		}
		return c.Status(http.StatusInternalServerError).JSON(fiber.Map{"error": err.Error()})
	}

	return c.JSON(link)
}

// Get List of Unique Tags
func GetUniqueTags(c *fiber.Ctx) error {
	pipeline := mongo.Pipeline{
		{{"$unwind", bson.M{"path": "$tags"}}},
		{{"$group", bson.M{"_id": "$tags"}}},
	}

	cursor, err := linkCollection.Aggregate(context.Background(), pipeline)
	if err != nil {
		return c.Status(http.StatusInternalServerError).JSON(fiber.Map{"error": err.Error()})
	}
	defer cursor.Close(context.Background())

	var tags []string
	for cursor.Next(context.Background()) {
		var tag bson.M
		if err := cursor.Decode(&tag); err != nil {
			return c.Status(http.StatusInternalServerError).JSON(fiber.Map{"error": err.Error()})
		}
		tags = append(tags, tag["_id"].(string))
	}

	return c.JSON(tags)
}

// Create a Link
func CreateLink(c *fiber.Ctx) error {
	var link models.Link

	if err := c.BodyParser(&link); err != nil {
		return c.Status(http.StatusBadRequest).JSON(fiber.Map{"error": "Cannot parse JSON"})
	}

	link.ID = primitive.NewObjectID()
	link.CreatedAt = time.Now()
	link.UpdatedAt = time.Now()

	_, err := linkCollection.InsertOne(context.Background(), link)
	if err != nil {
		return c.Status(http.StatusInternalServerError).JSON(fiber.Map{"error": err.Error()})
	}

	return c.Status(http.StatusCreated).JSON(link)
}

// Update a Link by Id
func UpdateLink(c *fiber.Ctx) error {

	idParam := c.Params("id")
	id, err := primitive.ObjectIDFromHex(idParam)
	if err != nil {
		return c.Status(http.StatusBadRequest).JSON(fiber.Map{"error": "Invalid ID"})
	}

	var link models.Link
	if err := c.BodyParser(&link); err != nil {
		return c.Status(http.StatusBadRequest).JSON(fiber.Map{"error": "Cannot parse JSON"})
	}

	link.UpdatedAt = time.Now()

	update := bson.M{
		"$set": link,
	}

	_, err = linkCollection.UpdateOne(context.Background(), bson.M{"_id": id}, update)
	if err != nil {
		return c.Status(http.StatusInternalServerError).JSON(fiber.Map{"error": err.Error()})
	}

	return c.JSON(link)
}

// Delete a Link by Id
func DeleteLink(c *fiber.Ctx) error {

	idParam := c.Params("id")
	id, err := primitive.ObjectIDFromHex(idParam)
	if err != nil {
		return c.Status(http.StatusBadRequest).JSON(fiber.Map{"error": "Invalid ID"})
	}

	_, err = linkCollection.DeleteOne(context.Background(), bson.M{"_id": id})
	if err != nil {
		return c.Status(http.StatusInternalServerError).JSON(fiber.Map{"error": err.Error()})
	}

	return c.SendStatus(http.StatusNoContent)
}
