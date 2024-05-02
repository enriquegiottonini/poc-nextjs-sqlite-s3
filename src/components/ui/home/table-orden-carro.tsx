import {
    Table,
    TableBody,
    TableCaption,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
  } from "@/components/ui/table"

import { ShowOrden } from "@/lib/types";

interface TablaOrdenCarroProps {
    data: ShowOrden[];
}

export default function TableOrdenCarro({ data }: TablaOrdenCarroProps) {
    return (
        <div className="container">
        <Table>
            <TableCaption>Ordenes de Carros</TableCaption>
            <TableHeader>
                <TableRow>
                    <TableHead>Nombre</TableHead>
                    <TableHead>Correo</TableHead>
                    <TableHead>Telefono</TableHead>
                    <TableHead>Kilometraje</TableHead>
                    <TableHead>Asegurado</TableHead>
                    <TableHead>Fecha de Orden</TableHead>
                </TableRow>
            </TableHeader>
            <TableBody>
                {data && data.map((row, index) => (
                    <TableRow key={index}>
                        <TableCell>{row.nombre}</TableCell>
                        <TableCell>{row.correo}</TableCell>
                        <TableCell>{row.tel}</TableCell>
                        <TableCell>{row.kilometraje}</TableCell>
                        <TableCell>{row.asegurado ? "Si" : "No"}</TableCell>
                        <TableCell>{row.fecha_orden}</TableCell>
                    </TableRow>
                ))}
            </TableBody>
        </Table>
        </div>
    );
};
