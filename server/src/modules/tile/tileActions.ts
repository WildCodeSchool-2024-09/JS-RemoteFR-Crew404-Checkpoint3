import type { Request, Response, NextFunction } from "express";
import tileRepository from "./tileRepository";

const browse = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const tiles = await tileRepository.readAll();
    res.json(tiles);
  } catch (err) {
    next(err);
  }
};

export const validate = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const coord_x = Number(req.body.coord_x);
    const coord_y = Number(req.body.coord_y);

    if (isNaN(coord_x) || isNaN(coord_y) || coord_x < 0 || coord_x > 11 || coord_y < 0 || coord_y > 5) {
      res.sendStatus(422);
      return;
    }

    const tile = await tileRepository.readByCoordinates(coord_x, coord_y);

    if (tile.length === 0) {
      res.sendStatus(422);
      return;
    }

    next();
  } catch (err) {
    next(err);
  }
};

export default {
  browse,
  validate,
};
