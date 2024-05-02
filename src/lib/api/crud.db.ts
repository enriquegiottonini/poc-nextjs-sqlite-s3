import { db } from "../connect";

// DROP TABLE IF EXISTS cliente;
// CREATE TABLE cliente 
// (
//         clienteid       INTEGER PRIMARY KEY,
//         nombre          TEXT NOT NULL CHECK( nombre != '' ), -- empty string
//         correo          TEXT,
//         tel             TEXT
// );

// DROP TABLE IF EXISTS carro;
// CREATE TABLE carro 
// (
//         carroid         INTEGER PRIMARY KEY,
//         propietario     INTEGER,
//         kilometraje     INTEGER,
//         FOREIGN KEY(propietario) REFERENCES cliente(clienteid)
// );

// DROP TABLE IF EXISTS orden_carro;
// CREATE TABLE orden_carro
// (
//         no_orden        INTEGER PRIMARY KEY,
//         carro           INTEGER,
//         asegurado       INTEGER NOT NULL CHECK(asegurado==0 OR asegurado==1),
//         fecha_orden     TEXT DEFAULT CURRENT_TIMESTAMP,
//         FOREIGN KEY(carro) REFERENCES carro(carroid)
// );

export async function getOrdenes() {
    return new Promise((resolve, reject) => {
        db.all(
            `SELECT no_orden, nombre, correo, tel, kilometraje, asegurado, fecha_orden
            FROM orden_carro
            JOIN carro ON orden_carro.carro = carro.carroid
            JOIN cliente ON carro.propietario = cliente.clienteid`,
            (err, rows) => {
                if (err) {
                    reject(err);
                } else {
                    resolve(rows);
                }
            }
        );
    });
}