"use server";

import { db } from "../connect";
import { ShowOrden } from "@/lib/types"

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

export async function createOrden(orden: ShowOrden) {
    return new Promise<void>((resolve, reject) => {
        db.run(
            `INSERT INTO cliente (nombre, correo, tel) VALUES (?, ?, ?)`,
            [orden.nombre, orden.correo, orden.tel],
            function (err) {
                if (err) {
                    reject(err);
                } else {
                    db.run(
                        `INSERT INTO carro (propietario, kilometraje) VALUES (?, ?)`,
                        [this.lastID, orden.kilometraje],
                        function (err) {
                            if (err) {
                                reject(err);
                            } else {
                                db.run(
                                    `INSERT INTO orden_carro (carro, asegurado) VALUES (?, ?)`,
                                    [this.lastID, orden.asegurado ? 1 : 0],
                                    function (err) {
                                        if (err) {
                                            reject(err);
                                        } else {
                                            resolve();
                                        }
                                    }
                                );
                            }
                        }
                    );
                }
            }
        );
    });
}

