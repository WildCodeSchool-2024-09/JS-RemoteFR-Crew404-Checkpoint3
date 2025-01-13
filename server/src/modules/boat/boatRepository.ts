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
    // Execute the SQL SELECT query to retrieve all boats from the "boat" table
    const [rows] = await databaseClient.query<Rows>(
      "select * from boat order by coord_y, coord_x",
    );

    // Return the array of tiles
    return rows as Boat[];
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
