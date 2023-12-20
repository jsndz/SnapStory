import express from "express";
import bodyParser from "body-parser";
import cors from "cors"
import { connect } from "./src/config/database.js";
import { PORT } from "./src/config/serverConfig.js";
import apiRoute from './src/routes/index.js';

const app = express();


app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.json());
app.use('/api',apiRoute);


app.listen(PORT,  async ()=>{ 
    console.log(`server started at port ${PORT}`);
    await connect();
    console.log("MongoDB connected");
    console.log("Server started");
});