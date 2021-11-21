import { Db } from "mongodb";
const { MongoClient } = require('mongodb');
import { Request, Response } from "express";

export const freeSeats = async (req: Request, res: Response) => {
    const db: Db = req.app.get("db");
    const collection = db.collection("seats");
  
    if (!req.query) {
      return res.status(500).send("No params");
    }
  
    const { day, month, year } = req.query as {
      day: string;
      month: string;
      year: string;
    };
  
    if (!day || !month || !year) {
      return res.status(500).send("Missing day, month or year");
    }
  
    if (!checkDateValidity(day, month, year)) {
      return res.status(500).send("Invalid day, month or year");
    }
  
    const seats = await collection.find({ day, month, year }).toArray();
  
    const freeSeats = [];
    for (let i = 1; i <= 20; i++) {
      if (!seats.find((seat) => parseInt(seat.number) === i)) {
        freeSeats.push(i);
      }
    }
    return res.status(200).json({ free: freeSeats });
  };

  const checkDateValidity = (
    day: string,
    month: string,
    year: string
  ): boolean => {
    const date = new Date(`${month} ${day}, ${year}`);
    return date.toString() !== "Invalid Date";
  };

  module.exports = freeSeats;