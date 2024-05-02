"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";

// const formSchema = z.object({
//     nombre_cliente: z.string().min(1),
//     correo_cliente: z.string().email().optional(),
//     telefono_cliente: z.string(),
//     kilometraje: z.string().optional(),
//     asegurado: z.boolean(),
//     fecha_orden: z.string().optional(),
// });

const formSchema = z.object({
    nombre_cliente: z.string().min(2, {
      message: "El nombre debe tener al menos 2 caracteres.",
    }),
    correo_cliente: z.string().email("Ingresa un correo válido.").optional(),
    telefono_cliente: z.string().refine((value) => value.length === 10, {
        message: "El número de teléfono debe tener 10 dígitos.",
    }),
    confirmar_telefono: z.string().refine((value) => value.length === 10, {
        message: "El número de teléfono debe tener 10 dígitos.",
    }),
    kilometraje: z.string().optional(),
    asegurado: z.boolean(),
  }).refine((data) => data.telefono_cliente === data.confirmar_telefono, {
    message: "Los números de teléfono no coinciden.",
    path: ["confirmar_telefono"], 
});

export default function FormOrdenCarro() {
    // 1. Define your form.
    // const form = useForm<z.infer<typeof formSchema>>({
    //     resolver: zodResolver(formSchema),
    //     defaultValues: {
    //         nombre_cliente: "",
    //         correo_cliente: "",
    //         telefono_cliente: "",
    //         kilometraje: "",
    //         asegurado: false,
    //         fecha_orden: "",
    //     },
    // })
    // 1. Define your form.
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      nombre_cliente: "",
      correo_cliente: "",
      telefono_cliente: "",
      confirmar_telefono: "",
      kilometraje: "",
      asegurado: false,
    },
  })
    
    // 2. Define a submit handler.
    function onSubmit(values: z.infer<typeof formSchema>) {
        console.log(values)
    }

    return (
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-2">
            <h2 className="text-lg font-bold">Información del Cliente</h2>
            <div className="flex flex-row justify-between space-x-5">
            <FormField
              control={form.control}
              name="nombre_cliente"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Nombre</FormLabel>
                  <FormControl>
                    <Input placeholder="Juan Pérez" {...field} />
                  </FormControl>
                  <FormDescription className="text-xs">
                    Busca el nombre o agrega al cliente como nuevo
                  </FormDescription>
                  <FormMessage className="text-xs" />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="correo_cliente"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Correo</FormLabel>
                  <FormControl>
                    <Input {...field} />
                  </FormControl>
                  <FormMessage className="text-xs" />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="telefono_cliente"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>No. Celular</FormLabel>
                  <FormControl>
                    <Input placeholder="6621370095"{...field} />
                  </FormControl>
                  <FormMessage className="text-xs" />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="confirmar_telefono"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Confirmar No. Celular</FormLabel>
                  <FormControl>
                    <Input placeholder="" {...field} />
                  </FormControl>
                  <FormMessage className="text-xs" />
                </FormItem>
              )}
            />
            </div>

            <h2 className="text-lg font-bold pt-2">Información del Auto</h2>
            <div className="flex flex-row justify-left space-x-5">
            <FormField
              control={form.control}
              name="kilometraje"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Kilometraje</FormLabel>
                  <FormControl>
                    <Input {...field} />
                  </FormControl>
                  <FormMessage className="text-xs" />
                </FormItem>
              )}
            />
            </div>

            <h2 className="text-lg font-bold pt-2">Información de la Orden</h2>
            <div className="flex flex-row justify-left">
            <FormField
              control={form.control}
              name="asegurado"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Asegurado</FormLabel>
                  <FormControl>
                    <Input type="checkbox" {...field} value={String(field.value)} />
                  </FormControl>
                  <FormMessage className="text-xs" />
                </FormItem>
              )}
            />
            </div>

            <Button type="submit">Registrar</Button>
          </form>
        </Form>
      )
};