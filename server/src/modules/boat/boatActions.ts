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
  try {
    const boat = req.body;
    const id = req.params.id;

    await boatRepository.update(boat);

    res.sendStatus(204);
  } catch (err) {
    next(err);
  }
};

export default {
  browse,
  edit,
};
