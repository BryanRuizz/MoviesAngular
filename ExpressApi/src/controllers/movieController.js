const movieService = require("../services/movieService");

// const getAllWorkouts = (req, res) => {
//     const allWorkouts = movieService.getAllWorkouts();
//     // console.log("miraa",movieService.getAllWorkouts);
//     res.send({ status: "OK", data: allWorkouts });
// };

const getAllMovies = async (req, res) => {
    try {
        const allWorkouts = await movieService.getAllmovies(); // Asegúrate de usar await aquí
        res.status(200).send({ status: "OK", data: allWorkouts });
    } catch (error) {
        console.error("Error fetching workouts:", error.message);
        res.status(error?.status || 500).send({ status: "FAILED", data: { error: error.message } });
    }
};


const createNewMovie = async (req, res) => {
    const { body } = req;


    if (!body.title || !body.synopsis || !body.image) {
        return res.status(400).send({
            status: "FAILED",
            data: {
                error: `One of the following keys is missing or is empty in request body: 'title': ${body.title}, 'synopsis': ${body.synopsis}, 'actors': ${body.actors}, 'categories': ${body.categories}, 'image': ${body.image}`
            }
        });
    }


    const newMovie = {
        title: body.title,
        synopsis: body.synopsis,
        actors: body.actors,
        categories: body.categories,
        image: body.image
    };

    try {
        const createdMovie = await movieService.createNewMovies(newMovie);
        res.status(201).send({ status: "OK", data: createdMovie });
    } catch (error) {
        res.status(error?.status || 500).send({ status: "FAILED", data: { error: error?.message || error } });
    }
};

const updateMovie = async (req, res) => {
    const { movieId } = req.params; // Asegúrate de recibir el ID desde los parámetros
    const { body } = req;

    // console.log(body,movieId ); // Para verificar qué datos estás recibiendo

    if (!movieId || Object.keys(body).length === 0) {
        return res.status(400).send('ID or data is missing.');
    }

    try {
        const result = await movieService.updateMovie(movieId, body); // Actualiza según tu lógica
        res.status(200).json({ success: true, data: result });
    } catch (error) {
        console.error("Error updating movie:", error.message);
        res.status(500).json({ success: false, message: error.message });
    }
};



const deleteOneMovie = (req, res) => {

    const id = req.params.movieid;
    // console.log("id tiene ->",id);

    // const info = {id: body.id};
    const delleted = movieService.deleteOneMovie(id);
    res.status(201).send({ status: "OK", data: delleted });
};
// users

const existuser = async (req, res) => {
    const { user, password } = req.body;
    // console.log("controller",user,password);
    if (!user || !password) {
        return res.status(400).send({
            status: "FAILED",
            data: {
                error: `One of the following keys is missing or is empty in request body: 'user': ${user}, 'password': ${password},`
            }
        });
    }

    const credentials = { username: user, password: password };

    try {
        const verifyuser = await movieService.existuser(credentials);
        if (verifyuser.success) {

            if (verifyuser.data.success === true) { 
                res.status(200).send({ status: "OK", data: verifyuser.data });
            } else {
               
                res.status(404).send({ status: "Not found", data: { error: verifyuser.message } });
            }
        } else {
           
            res.status(401).send({ status: "FAILED", data: { error: verifyuser.message } });
        }
    } catch (error) {
        res.status(error?.status || 500).send({ status: "FAILED", data: { error: error?.message || error } });
    }
}

module.exports = { getAllMovies, createNewMovie, updateMovie, deleteOneMovie, existuser };