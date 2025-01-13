import express from "express";
const router = express.Router();

import tileActions from "./modules/tile/tileActions";
import boatActions from "./modules/boat/boatActions";
import gameActions from "./modules/game/gameActions";

router.get("/api/tiles", tileActions.browse);

router.get("/api/boats", boatActions.browse);
router.put("/api/boats/:id",boatActions.browse);

router.post("/api/games", gameActions.add);

export default router;
