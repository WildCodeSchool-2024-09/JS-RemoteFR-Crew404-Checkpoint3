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
    // Extract the ID from the request parameters
    const id = req.params.id;

    // Extract the boat data from the request body
    const boat = req.body;

    // Update the boat in the database
    await boatRepository.update(boat);

    // Respond with a 204 status code
    res.sendStatus(204);
  } catch (err) {
    // Pass any errors to the error-handling middleware
    next(err);
  }
};

export default {
  browse,
  edit,
};
