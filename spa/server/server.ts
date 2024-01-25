import express from 'express';
import {Application} from "express";
import {getAllAbos, getAboById, saveAbo} from "./abos.route";

const bodyParser = require('body-parser');

const app: Application = express();

app.use(bodyParser.json());

const cors = require('cors');

app.use(cors({origin: true}));

app.route('/api/abos').get(getAllAbos);
app.route('/api/abos/:id').get(getAboById);
app.route('/api/abos/:id').put(saveAbo);

const httpServer = app.listen(9000, () => {
    console.log("HTTP REST API Server running at http://localhost:" + httpServer.address()["port"]);
});



