const express = require("express");
const app = express();
const PORT = process.env.PORT || 3000;

const cors = require("cors");
const apicache = require("apicache");
const cache = apicache.middleware;

const v1moviesrouter = require("./v1/routes/moviesRoutes.js");
const { swaggerDocs: V1swaggerDocs } = require("./v1/swagger.js");

app.use(cors());


app.use(express.json({ limit: '10mb' })); 
app.use(express.urlencoded({ limit: '10mb', extended: true }));
 
app.get('/', (req, res) => {
    res.send("<h1>Hello world</h1>");
})



app.use(express.json());
app.use("/api/v1/movies", v1moviesrouter);



app.listen(PORT, () => {

    console.log(`⚡ Server listening on port ${PORT}`);
    V1swaggerDocs(app, PORT);
});