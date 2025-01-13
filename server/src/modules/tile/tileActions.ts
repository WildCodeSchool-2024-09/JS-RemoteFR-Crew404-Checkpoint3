// import type { RequestHandler } from "express";
// import tileRepository from "./tileRepository";

// const browse: RequestHandler = async (req, res, next) => {
//   try {
//     const tiles = await tileRepository.readAll();
//     res.json(tiles);
//   } catch (err) {
//     next(err);
//   }
// };

// const validate: RequestHandler = async (req, res, next) => {
//   const { coord_x, coord_y } = req.body;
//   //   // your code here
//   //   res.status(501).json({ message: "Validation nope.avi" });
//   // };

//   if (coord_x < 0 || coord_x > 11 || coord_y < 0 || coord_y > 5) {
//     res.status(422).json({ message: "Invalid coordinates" });
//     return;
//   }
//   try {
//     const tile = await tileRepository.readByCoordinates(coord_x, coord_y);

//     if (!tile) {
//       res.status(422).json({ message: "Tile not found" });
//       return;
//     }

//     next();
//   } catch (err) {
//     next(err);
//   }
// };

// export default {
//   browse,
//   validate,
// };

import type { RequestHandler } from "express";
import tileRepository from "./tileRepository";

const browse: RequestHandler = async (req, res, next) => {
  try {
    const tiles = await tileRepository.readAll();
    res.json(tiles);
  } catch (err) {
    next(err);
  }
};

const validate: RequestHandler = async (req, res, next): Promise<void> => {
  const { coord_x, coord_y } = req.body;

  if (coord_x < 0 || coord_x > 11 || coord_y < 0 || coord_y > 5) {
    res.sendStatus(422);
    return;
  }

  try {
    const tile = await tileRepository.readByCoordinates(coord_x, coord_y);

    if (!tile) {
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
