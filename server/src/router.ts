import express from "express";

const router = express.Router();

/* ************************************************************************* */
// Define Your API Routes Here
/* ************************************************************************* */

import boatActions from "./modules/boat/boatActions";

import tileActions from "./modules/tile/tileActions"; // Import tileActions

// Ensure tileActions.validate is used before boatActions.edit
router.put("/api/boats/:id", tileActions.validate, boatActions.edit); // Use the validate middleware before the edit handler

router.get("/api/boats", boatActions.browse);

import gameActions from "./modules/game/gameActions";

router.post("/api/games", gameActions.add);

router.get("/api/tiles", tileActions.browse);

/* ************************************************************************* */

export default router;
