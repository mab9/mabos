import express from 'express';
import {Application} from "express";
import {getAllAbos, getAboById, saveAbo, createAbo, deleteItem} from "./abos.route";
import {getSettingsByEmail, saveSettingByEmail} from "./settings.route";

const bodyParser = require('body-parser');

const app: Application = express();

app.use(bodyParser.json());

const cors = require('cors');

app.use(cors({origin: true}));

app.route('/api/settings/:email')
  .get(getSettingsByEmail)
  .put(saveSettingByEmail)

app.route('/api/abos')
  .get(getAllAbos)
  .post(createAbo);
app.route('/api/abos/:id')
  .get(getAboById)
  .put(saveAbo)
  .delete(deleteItem);

const httpServer = app.listen(9000, () => {
    console.log("HTTP REST API Server running at http://localhost:" + httpServer.address()["port"]);
});



