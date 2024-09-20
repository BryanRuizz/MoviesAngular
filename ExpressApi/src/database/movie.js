const { getCollection, ObjectId } = require('./db');






/**
 * @openapi
 * components:
 *   schemas:
 *     Movie:
 *       type: object
 *       properties:
 *         id:
 *           type: string
 *           example: 66eb89ade2e93874991aaefe
 *         title:
 *           type: string
 *           example: Inception
 *         synopsis:
 *           type: string
 *           example: A skilled thief is given a chance at redemption if he can successfully perform inception.
 *         actors:
 *           type: array
 *           items:
 *             type: string
 *           example: ["Leonardo DiCaprio", "Joseph Gordon-Levitt"]
 *         categories:
 *           type: array
 *           items:
 *             type: string
 *           example: ["Sci-Fi", "Action"]
 *         image:
 *           type: string
 *           format: uri
 *           example: data:image/png;base64,<base64-data>
 *         createdAt:
 *           type: string
 *           format: date-time
 *           example: 2024-09-18T12:00:00Z
 *         updatedAt:
 *           type: string
 *           format: date-time
 *           example: 2024-09-18T12:00:00Z
 */


const getAllMovies = async () => {
    try {
        const collection = await getCollection('movies');
        // console.log("Collection obtained:", collection);


        const workouts = await collection.find({}).toArray();
        // console.log("Workouts fetched:", workouts);

        return workouts;
    } catch (error) {
        console.error("Error fetching workouts:", error.message);
        throw { status: 500, message: error.message };
    }
};

const createNewMovie = async (newMovie) => {
    const collection = await getCollection('movies');

    const movieToInsert = {
        ...newMovie,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString()
    };

    try {

        const result = await collection.insertOne(movieToInsert);


        return { success: true, data: { _id: result.insertedId, ...movieToInsert } };
    } catch (error) {
        console.error("Error creating movie:", error.message);
        return { success: false, message: error.message };
    }
};


const updateAMovie = async (movieid, updateData) => {
    // console.log("last part of update", movieid, updateData);
    try {
        const collection = await getCollection('movies');

        if (!ObjectId.isValid(movieid)) {
            throw new Error("Invalid movie ID");
        }

        const id = new ObjectId(movieid);


        const beforeUpdate = await collection.findOne({ _id: id });
        console.log("Document before update:", beforeUpdate);


        const { _id, ...dataToUpdate } = updateData;


        const result = await collection.updateOne(
            { _id: id },
            { $set: { ...dataToUpdate, updatedAt: new Date() } }
        );

        console.log("Result from updateOne:", result);

        if (result.matchedCount === 0) {
            throw new Error("Movie not found");
        }

        if (result.modifiedCount === 0) {
            console.log("No changes were made to the movie");
        } else {

            const updatedMovie = await collection.findOne({ _id: id });
            console.log("Movie updated successfully:", updatedMovie);
            return updatedMovie;
        }

    } catch (error) {
        console.error("Error updating movie:", error.message);
        throw error;
    }
};


const deleteOnemovie = async (movieid) => {
    // console.log("last step",movieid);
    const collection = await getCollection('movies');


    const id = new ObjectId(movieid);

    // Eliminar de la collecion
    const result = await collection.deleteOne({ _id: id });


    if (result.deletedCount === 0) {
        return { success: false, message: 'No document found with that ID' };
    }

    return { success: true, message: 'Document deleted successfully' };
};
// users

const existuser = async (credentials) => {
    const { username, password } = credentials;
    console.log("comparacion", username, password);
    try {
        const collection = await getCollection('users');
        console.log("col", collection);
      
        const user = await collection.findOne({ username: username, password: password });

        if (user) {
       
            return { success: true, message: "Login successful", data: user };
        } else {
          
            return { success: false, message: "User not found or incorrect password" };
        }
    } catch (error) {
        console.error("Error verifying user:", error.message);
        return { success: false, message: error.message };
    }
};


module.exports = { getAllMovies, createNewMovie, updateAMovie, deleteOnemovie, existuser };