import type { RequestHandler } from "express";

import tileRepository from "./tileRepository";

const browse: RequestHandler = async (req, res, next) => {
  // your code here
  try {
    const tiles = await tileRepository.readAll();
    res.json(tiles);
  } catch (err) {
    next(err);
  }
};

const validate: RequestHandler = async (req, res, next) => {
  const { coord_x, coord_y } = req.body;

  if (typeof coord_x !== 'number' || typeof coord_y !== 'number') {
    res.sendStatus(422);
    return;
  }

  try {
    const tile = await tileRepository.readByCoordinates(coord_x, coord_y);

    if (tile && tile.length > 0) {
      next();
    } else {
      res.sendStatus(422);
    }
  } catch (err) {
    res.sendStatus(422);
  }
};


export default {
  browse,
  validate,
};
