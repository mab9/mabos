

import {Request, Response} from 'express';
import {ABOS} from "./db-data";
import {setTimeout} from "timers";



export function getAllAbos(req: Request, res: Response) {

/*
    console.log("ERROR loading courses!");
    res.status(500).json({message: 'random error occurred.'});
    return;
  */
        setTimeout(() => {

             res.status(200).json({payload:Object.values(ABOS)});

        }, 1200);
}


export function getAboById(req: Request, res: Response) {
    const aboId = req.params["id"];
    const abos:any = Object.values(ABOS);

    const abo = abos.find(abo => abo.id == aboId);
    res.status(200).json(abo);
}

export function saveAbo(req: Request, res: Response) {

  /*
  console.log("ERROR saving course!");
  res.sendStatus(500);
  return;
  */

  const id = req.params["id"];
  const changes = req.body;

  console.log("Saving abo changes", id, JSON.stringify(changes));

  const newAbo = {
    ...ABOS[id],
    ...changes
  };

  ABOS[id] = newAbo;

  console.log("new abo version", newAbo);
  setTimeout(() => {
    res.status(200).json(ABOS[id]);
  }, 2000);

}
