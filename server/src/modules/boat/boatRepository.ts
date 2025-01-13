import type { OkPacket, ResultSetHeader, RowDataPacket } from "mysql2";
import databaseClient from "../../../database/client";

type Boat = {
  id: number;
  name?: string;
  coord_x: number;
  coord_y: number;
};

class BoatRepository {
  async readAll(where = {}) {
    const [rows] = await databaseClient.query<RowDataPacket[]>(
      "SELECT * FROM boat ORDER BY coord_y, coord_x",
    );
    return rows as Boat[];
  }

  async update(boatToUpdate: Partial<Boat>) {
    const { id, coord_x, coord_y } = boatToUpdate;

    // Typage explicite pour le résultat de la requête
    const [result]: [ResultSetHeader, unknown] = await databaseClient.query(
      "UPDATE boat SET coord_x = ?, coord_y = ? WHERE id = ?",
      [coord_x, coord_y, id],
    );

    // Retourner le nombre de lignes affectées
    return result.affectedRows;
  }
}

export default new BoatRepository();
