import express from "express";
import bodyParser from "body-parser";
import cors from "cors";
import dotenv from "dotenv";
import connet from "./config/connetDB.js";
import initWebRoutes from "./routes/index.js";
import upload from "express-fileupload";
dotenv.config();

let use = "a";
let app = express();

app.use(upload());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(cors());

initWebRoutes(app);
connet();

let port = 9000;
app.listen(port, () => {
    console.log("running" + port);
});
