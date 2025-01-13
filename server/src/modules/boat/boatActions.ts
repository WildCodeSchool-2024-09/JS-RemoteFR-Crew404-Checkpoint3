import type { RequestHandler } from "express";

import boatRepository from "./boatRepository";

const browse: RequestHandler = async (req, res, next) => {
  try {
    // Fetch all boats from the database
    const boats = await boatRepository.readAll();

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
    const id = Number.parseInt(req.params.id, 10);
    const { coord_x, coord_y } = req.body;

    const updatedRows = await boatRepository.update({
      id,
      coord_x,
      coord_y,
    });

    if (updatedRows === 0) {
      res.status(404).json({ message: "Bateau non trouvé" });
    } else {
      res.status(204).end();
    }
  } catch (err) {
    next(err);
  }
};

export default {
  browse,
  edit,
};
