import type { RequestHandler } from "express";

import boatRepository from "./boatRepository";

const browse: RequestHandler = async (req, res, next) => {
  try {
    const nameBoat = req.query.name;
    // Fetch all boats from the database
    const boats = await boatRepository.readAll({
      name: nameBoat as string,
    });

    // Respond with the boats in JSON format
    res.json(boats);
  } catch (err) {
    // Pass any errors to the error-handling middleware
    next(err);
  }
};

const edit: RequestHandler = async (req, res, next) => {
  // your code here
  try {
    // Extract the ID from the request parameters
    const id = Number.parseInt(req.params.id, 10);

    // Extract the boat data from the request body
    const boat = {
      id,
      coord_x: req.body.coord_x,
      coord_y: req.body.coord_y,
    };

    // Update the boat in the database
    const result = await boatRepository.update(boat);

    if (result === 0) {
      // Respond with a 204 status code
      res.sendStatus(404);
    } else {
      res.sendStatus(204);
    }
  } catch (err) {
    // Pass any errors to the error-handling middleware
    next(err);
  }
};

export default {
  browse,
  edit,
};
