import { Request, Response } from "express";
import { Db } from "mongodb";
const express = require("express");

export const free = async (req: Request, res: Response) => {
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
  
    const token = req.headers.token;
  
    if (!day || !month || !year || !token) {
      return res
        .status(500)
        .send("Missing day, month or year or seat number or token");
    }
  
    if (!checkDateValidity(day, month, year)) {
      return res.status(500).send("Invalid day, month or year");
    }
  
    const booked = await collection.findOne({ day, month, year, token });
    if (booked) {
      await collection.deleteOne({ day, month, year, token });
      return res.status(200).send("Seat is now free");
    }
  
    return res.status(500).send("Seat is not booked");
};

const checkDateValidity = (
    day: string,
    month: string,
    year: string
  ): boolean => {
    const date = new Date(`${month} ${day}, ${year}`);
    return date.toString() !== "Invalid Date";
};

module.exports = free;
