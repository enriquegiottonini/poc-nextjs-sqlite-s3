import sqlite3 from "sqlite3";

export const db = new sqlite3.Database(
    "./src/db/taller.db",
    sqlite3.OPEN_READWRITE | sqlite3.OPEN_CREATE,
    (err: any) => {
        if (err) {
            console.error(err.message);
        } else {
            console.log("Connected to the database.");
        }
    }
);