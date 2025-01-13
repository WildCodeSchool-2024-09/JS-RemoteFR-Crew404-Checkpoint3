import type { Request, Response, NextFunction } from "express";
import boatRepository from "./boatRepository";

const browse = async (req: Request, res: Response, next: NextFunction) => {
  try {
   
    const boats = await boatRepository.readAll();
    res.json(boats);
  } catch (err) {
    next(err);
  }
};

const edit = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const boatId = parseInt(req.params.id, 10);
    const coord_x = Number(req.body.coord_x);
    const coord_y = Number(req.body.coord_y);

    if (isNaN(coord_x) || isNaN(coord_y)) {
      return res.status(400).send("Invalid coordinates");
    }

    const affectedRows = await boatRepository.update({ id: boatId, coord_x, coord_y });

    if (affectedRows === 0) {
      return res.status(404).send("Boat not found");
    }

    res.status(204).send();
  } catch (err) {
    next(err);
  }
};

export default {
  browse,
  edit,
};
