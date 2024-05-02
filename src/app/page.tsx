import FormOrdenCarro from "@/components/ui/home/forms-orden-carro";
import TableOrdenCarro from "@/components/ui/home/table-orden-carro";
import { getOrdenes } from "@/lib/api/crud.db";
import { ShowOrden } from "@/lib/types";

export default async function Home() {
  const ordenes: ShowOrden[] = await getOrdenes();
  return (
    <main className="flex flex-col justify-center items-center my-5 py-5">
      <h1 className="text-xl font-bold p-4">Tabla de Datos</h1>
      <TableOrdenCarro data={ordenes}/>
      <h1 className="text-xl font-bold p-4">Registro de Orden de Carros</h1>
      <FormOrdenCarro />
    </main>
  );
}
