import databaseClient from "../../../database/client";

import type { Result, Rows } from "../../../database/client";

type Boat = {
  id: number;
  name: string;
  coord_x: number;
  coord_y: number;
};

type BoatWithTile = Boat & {
  tile_id: number;
  tile_type: string;
  tile_coord_x: number;
  tile_coord_y: number;
};

class BoatRepository {
  async readAll(where = {}) {
    // Execute the SQL SELECT query to retrieve all boats and their corresponding tiles
    const [rows] = await databaseClient.query<Rows>(
      `SELECT 
      *, tile.type, tile.has_treasure
      FROM boat 
      JOIN tile ON boat.coord_x = tile.coord_x AND boat.coord_y = tile.coord_y 
      ORDER BY boat.coord_y, boat.coord_x`,
    );

    // Return the array of boats with tile information
    return rows as BoatWithTile[];
  }

  async update(boatToUpdate: Partial<Boat>) {
    const { id, coord_x, coord_y } = boatToUpdate;
    const [result] = await databaseClient.query<Result>(
      "update boat set coord_x = ?, coord_y = ? where id = ?",
      [coord_x, coord_y, id],
    );
    return result.affectedRows;
  }
}

export default new BoatRepository();
