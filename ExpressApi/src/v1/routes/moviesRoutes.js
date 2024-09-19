const express = require("express");
// const apicache = require("apicache");

const movieController = require("../../controllers/movieController");



const router = express.Router();
// const cache = apicache.middleware;


/**
 * @openapi
 * components:
 *   schemas:
 *     Movie:
 *       type: object
 *       properties:
 *         id:
 *           type: string
 *         name:
 *           type: string
 *         mode:
 *           type: string
 *         duration:
 *           type: integer
 *         ...
 *     Record:
 *       type: object
 *       properties:
 *         id:
 *           type: string
 *         workoutId:
 *           type: string
 *         recordType:
 *           type: string
 *         ...
 */

/**
 * @openapi
 * /api/v1/movies:
 *   get:
 *     tags:
 *       - movies
 *     summary: Get all movies
 *     responses:
 *       200:
 *         description: OK
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: string
 *                   example: OK
 *                 data:
 *                   type: array
 *                   items:
 *                     $ref: "#/components/schemas/Movie"
 *       5XX:
 *         description: FAILED
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: string
 *                   example: FAILED
 *                 data:
 *                   type: object
 *                   properties:
 *                     error:
 *                       type: string
 *                       example: "Some error message"
 *   post:
 *     tags:
 *       - movies
 *     summary: Create a new movie
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: "#/components/schemas/Movie"
 *     responses:
 *       201:
 *         description: Created
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: string
 *                   example: CREATED
 *                 data:
 *                   $ref: "#/components/schemas/Movie"
 *       5XX:
 *         description: FAILED
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: string
 *                   example: FAILED
 *                 data:
 *                   type: object
 *                   properties:
 *                     error:
 *                       type: string
 *                       example: "Some error message"
 */


/**
 * @openapi
 * /api/v1/movies/{movieid}:
 *   patch:
 *     tags:
 *       - movies
 *     summary: Update a movie by ID
 *     parameters:
 *       - name: movieid
 *         in: path
 *         required: true
 *         description: ID of the movie to update
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: "#/components/schemas/Movie"
 *     responses:
 *       200:
 *         description: OK
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: string
 *                   example: OK
 *                 data:
 *                   $ref: "#/components/schemas/Movie"
 *       404:
 *         description: NOT FOUND
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: string
 *                   example: NOT FOUND
 *                 data:
 *                   type: object
 *                   properties:
 *                     error:
 *                       type: string
 *                       example: "Workout not found"
 *       5XX:
 *         description: FAILED
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: string
 *                   example: FAILED
 *                 data:
 *                   type: object
 *                   properties:
 *                     error:
 *                       type: string
 *                       example: "Some error message"
 */

/**
 * @openapi
 * /api/v1/movies/{movieid}:
 *   delete:
 *     tags:
 *       - movies
 *     summary: Delete a movie by ID
 *     parameters:
 *       - in: path
 *         name: movieid
 *         required: true
 *         schema:
 *           type: string
 *         description: The ID of the movie to delete
 *     responses:
 *       204:
 *         description: No Content
 *       404:
 *         description: NOT FOUND
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: string
 *                   example: NOT FOUND
 *                 data:
 *                   type: object
 *                   properties:
 *                     error:
 *                       type: string
 *                       example: "movie not found"
 *       5XX:
 *         description: FAILED
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: string
 *                   example: FAILED
 *                 data:
 *                   type: object
 *                   properties:
 *                     error:
 *                       type: string
 *                       example: "Some error message"
 */

router
    .get("/", movieController.getAllMovies)
    .post("/", movieController.createNewMovie)
    .patch("/:movieId", movieController.updateMovie)
    .delete("/:movieid", movieController.deleteOneMovie)

module.exports = router;

