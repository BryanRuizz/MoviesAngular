const movie = require("../database/movie");

const getAllmovies = () => {

    try {
        const getAllWorkouts = movie.getAllMovies();
        return getAllWorkouts;

    } catch (error) {
        throw error;
    }

}

const createNewMovies = async (newWorkout) => {
  
    const workoutToInsert = {
        ...newWorkout,
        createdAt: new Date().toISOString(), // Usa formato ISO para la fecha
        updatedAt: new Date().toISOString()
    };

    try {
     
        const result = await movie.createNewMovie(workoutToInsert);

       
        return { success: true, data: { _id: result.insertedId, ...workoutToInsert } };
    } catch (error) {
        console.error("Error creating workout:", error.message);
        return { success: false, message: error.message };
    }
};


const updateMovie = async (movieid, updateWorkout) => {
    // console.log(movieid,updateWorkout,"ola");
   
    const workoutToUpdate = {
        ...updateWorkout,
        updatedAt: new Date().toISOString()
    };

    try {
       
        const result = await movie.updateAMovie(movieid, workoutToUpdate);

       
        if (result.matchedCount === 0) {
            return { success: false, message: "No workout found with the given id" };
        }

       
        return { success: true, data: result };
    } catch (error) {
        console.error("Error updating workout:", error.message);
        return { success: false, message: error.message };
    }
};

const deleteOneMovie = (info) => {

    const deleteworkout = movie.deleteOnemovie(info);
    return deleteworkout;
}

module.exports = { getAllmovies, createNewMovies, updateMovie, deleteOneMovie };