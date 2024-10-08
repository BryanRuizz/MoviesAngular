const swaggerJSDoc = require("swagger-jsdoc");
const swaggerUI = require("swagger-ui-express");
const { version } = require("uuid");

// metadata info about our api
const options = {
    definition: {
        openapi: "3.0.0",
        info: {
            title: "Movie API",
            version: "1.0.0"
        },
    },
    apis: ["src/v1/routes/moviesRoutes.js", "./src/database/movie.js"],
}

// Docs en json format
const swaggerSpec = swaggerJSDoc(options);

// function to setup our docs
const swaggerDocs = (app, port) => {
    app.use('/api/v1/docs', swaggerUI.serve, swaggerUI.setup(swaggerSpec));
    app.get('/api/v1/docs.json', (req, res) => {
        res.setHeader('Content-Type', 'application/json');
        res.send(swaggerSpec)
    });
    // console.log(`📓 Version 1 Docs are avaliable at http://localhost:${port}/api/v1/docs/`);
    console.log(`📓 Version 1 Docs are available at http://localhost:${port}/api/v1/docs/`);
};


module.exports = { swaggerDocs }