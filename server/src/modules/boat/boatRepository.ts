import databaseClient from "../../../database/client";

import type { Result, Rows } from "../../../database/client";

type Boat = {
  id: number;
  name: string;
  coord_x: number;
  coord_y: number;
};

class BoatRepository {
  async readAll(where = {}) {
    // Execute the SQL SELECT query to retrieve all boats and their associated tile information
    const [rows] = await databaseClient.query<Rows>(
      `SELECT boat.id, boat.name, boat.coord_x, boat.coord_y, 
              tile.id as tile_id, tile.coord_x as tile_coord_x, tile.coord_y as tile_coord_y, 
              tile.type, tile.has_treasure
       FROM boat
       LEFT JOIN tile ON boat.coord_x = tile.coord_x AND boat.coord_y = tile.coord_y
       ORDER BY boat.coord_y, boat.coord_x`,
    );

    return rows as (Boat & {
      tile_id: number;
      tile_coord_x: number;
      tile_coord_y: number;
      type: string;
      has_treasure: boolean;
    })[];
  }

  async update(boatToUpdate: Partial<Boat>) {
    // If the boat has coordinates (coord_x, coord_y), update the coordinates
    if (
      boatToUpdate.coord_x !== undefined &&
      boatToUpdate.coord_y !== undefined &&
      boatToUpdate.id
    ) {
      // Call updateCoordinates to actually perform the update and return the affected rows count
      return this.updateCoordinates(
        boatToUpdate.id,
        boatToUpdate.coord_x,
        boatToUpdate.coord_y,
      );
    }

    // Return 0 if no update was made
    return 0;
  }

  async updateCoordinates(id: number, coordX: number, coordY: number) {
    // Execute the SQL UPDATE query to update the coordinates of a specific boat
    const [result] = await databaseClient.query<Result>(
      "update boat set coord_x = ?, coord_y = ? where id = ?",
      [coordX, coordY, id],
    );

    // Return the number of affected rows
    return result.affectedRows;
  }
}

export default new BoatRepository();
