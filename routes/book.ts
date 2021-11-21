import { Db } from "mongodb";
import { Request, Response } from "express";
const app = require('express');
import { v4 as uuid } from "uuid";
const bodyParser = require('body-parser');


export const book = async (req: Request, res: Response) => {
    const db: Db = req.app.get("db");
    const collection = db.collection("seats");
    if (!req.query) {
      return res.status(500).send("No params");
    }
  
    const { day, month, year, number } = req.body as {
      day: string;
      month: string;
      year: string;
      number: string;
    };
  
    if (!day || !month || !year || !number) {
      return res.status(500).send("Missing day, month or year or seat number");
    }
  
    if (!checkDateValidity(day, month, year)) {
      return res.status(500).send("Invalid day, month or year");
    }
  
    const notFree = await collection.findOne({ day, month, year, number });
    if (notFree) {
      return res.status(500).send("Seat is not free");
    }
  
    const token = uuid();
    await collection.insertOne({ day, month, year, number, token });
  
    return res.status(200).json({ token });
  };
  const checkDateValidity = (
    day: string,
    month: string,
    year: string
  ): boolean => {
    const date = new Date(`${month} ${day}, ${year}`);
    return date.toString() !== "Invalid Date";
  };

module.exports =book ;