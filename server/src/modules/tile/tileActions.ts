import type { RequestHandler } from "express";
import TileRepository from "./tileRepository";

const browse: RequestHandler = async (req, res, next) => {
  // your code here
  try {
    // Fetch all tiles from the database
    const tiles = await TileRepository.readAll();

    // Respond with the tiles in JSON format
    res.json(tiles);
  } catch (err) {
    // Pass any errors to the error-handling middleware
    next(err);
  }
};

const edit: RequestHandler = async (req, res, next) => {
  // your code here
  try {
    // Extract the ID from the request parameters
    const id = req.params.id;

    // Extract the tile data from the request body
    const tile = req.body;

    // Update the tile in the database
    await TileRepository.update(tile);

    // Respond with a 204 status code
    res.sendStatus(204);
  } catch (err) {
    // Pass any errors to the error-handling middleware
    next(err);
  }
};

const validate: RequestHandler = async (req, res, next): Promise<void> => {
  try {
    const { coord_x, coord_y } = req.body;
    if (!(await TileRepository.areCoordinatesValid(coord_x, coord_y))) {
      // Utilisez la méthode de validation des coordonnées de TileRepository
      res.sendStatus(422);
      return;
    }

    // Si les coordonnées sont valides, passez au middleware suivant
    next();
  } catch (err) {
    next(err);
  }
};

export default {
  browse,
  edit,
  validate,
};
