const express = require("express");
const mongo = require("mongoose");
const cors = require("cors");
const routes = require("./routes/routes");
const languageMiddleware = require("./middlewares/lang");

const app = express();

var server = require("http").createServer(app);

//LOAD ENV
require("dotenv").config();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({
    extended: true
}));

//Language
app.use(languageMiddleware);

//Routes
app.use("/", routes);

//404
app.use(function (req, res, next) {
    return res.status(404).send("Sorry can't find that!")
})

//500
app.use(function (err, req, res, next) {
    console.error(err.stack)
    return res.status(500).send('An error has been acquired.');
})

const PORT = process.env.APP_PORT

//Connect to mongo before, Init Server
mongo.connect(process.env.DB, {
    useUnifiedTopology: true,
    useNewUrlParser: true,
    useCreateIndex: true
}).then(() => {
    server.listen(PORT, () => {
        console.log("Listening server on port : " + PORT);
    })
}).catch(() => {
    console.log("Can not connect to database.");
})