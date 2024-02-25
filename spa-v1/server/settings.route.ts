

import {Request, Response} from 'express';
import {SETTINGS} from "./db-data";
import {setTimeout} from "timers";
import {Setting} from "../src/app/model/settings.model";

export function getSettingsByEmail(req: Request, res: Response) {
  console.info("save sett", req)
  const { email } = req.params;
  const items : Setting[] = Object.values(SETTINGS);

  const item = items.find(item => item?.email == email);

  setTimeout(() => {
             res.status(200).json(item);
        }, 1200);
}

export function saveSettingByEmail(req: Request, res: Response) {
  console.info("get sett", req)
  const { email } = req.params;
  const changes = req.body;

  console.log("Saving settings changes", email, JSON.stringify(changes));

  const newItem = {
    ...SETTINGS[email],
    ...changes
  };

  SETTINGS[email] = newItem;

  console.log("New settings version", newItem);
  setTimeout(() => {
    res.status(200).json(SETTINGS[email]);
  }, 2000);

}
