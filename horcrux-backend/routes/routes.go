package routes

import (
	"horcrux-backend/controllers"

	"github.com/gofiber/fiber/v2"
)

// func SetupRoutes(app *fiber.App) {
// 	api := app.Group("/api")
// 	links := api.Group("/links")

// 	links.Post("/", controllers.CreateLink)
// 	links.Get("/archived", controllers.GetLinks)
// 	links.Put("/:id", controllers.UpdateLink)
// 	links.Delete("/:id", controllers.DeleteLink)
// }

func SetupRoutes(app *fiber.App) {
	api := app.Group("/api")
	links := api.Group("/links")

	// Routes for links management
	links.Post("/", controllers.CreateLink)              // Create a new link
	links.Get("/", controllers.GetLinks)                 // Get all links
	links.Get("/:id", controllers.GetLink)               // Get a link by ID
	links.Get("/tags/unique", controllers.GetUniqueTags) // Get unique tags
	links.Put("/:id", controllers.UpdateLink)            // Update a link by ID
	links.Delete("/:id", controllers.DeleteLink)         // Delete a link by ID
}
