import type { RequestHandler } from "express";
import tileRepository from "./tileRepository";

const browse: RequestHandler = async (req, res, next) => {
  try {
    // Fetch all tiles
    const tiles = await tileRepository.readAll();

    // Respond with the boats in JSON format
    res.json(tiles);
  } catch (err) {
    // Pass any errors to the error-handling middleware
    next(err);
  }
};

const validate: RequestHandler = async (req, res, next) => {
  try {
    const {coord_x, coord_y} = req.body;



    if (coord_x < 0 || coord_x > 11 || coord_y < 0 || coord_y > 5) {
      res.sendStatus(422);
      return;
    }

    const tile = await tileRepository.readByCoordinates(coord_x, coord_y)
    
    if (tile.length === 0) {
      res.sendStatus(404);
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
