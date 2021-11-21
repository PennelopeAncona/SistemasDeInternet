

import { Request, Response } from "express";

const status = async (req: Request, res: Response) => {
    const date = new Date();
    const day = date.getDate();
    const month = date.getMonth() + 1;
    const year = date.getFullYear();
  
    res.status(200).send(`${day}-${month}-${year}`);
};

module.exports= status;