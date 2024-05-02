import FormOrdenCarro from "@/components/ui/home/forms-orden-carro";

export default function Home() {
  return (
    <main className="flex flex-col border justify-center h-screen items-center">
      <h1 className="text-xl font-bold p-4">Registro de Orden de Carros</h1>
      <FormOrdenCarro />
    </main>
  );
}
