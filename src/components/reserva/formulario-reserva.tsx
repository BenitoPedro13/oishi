"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import {
  esquemaFormularioReserva,
  type FormularioReserva,
} from "@/lib/conteudo/esquemas";
import { construirLinkWhatsapp, mensagemReserva } from "@/lib/contato/whatsapp";

// spec-design.md §11.6 — the reservation-form-reference.html field set,
// rebuilt on Oishi's own tokens. Submits to WhatsApp, never a database
// (spec-architecture.md §6.3): reservations already live there, and no PII
// sits at rest. Hand-rolled inputs for this pass rather than the vendored
// shadcn primitives spec-design.md §8 calls for — same field set and
// behaviour, the vendoring-with-SOURCES.md step is deferred (see
// docs/tasks/TASK-scaffold-e-fase-0.md).
const campoBase =
  "w-full rounded-none border border-sumi-linha bg-sumi-alto px-3 py-2.5 text-washi placeholder:text-cinza focus-visible:border-foco outline-none transition-colors";

export function FormularioReserva() {
  const [enviado, setEnviado] = useState(false);
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<FormularioReserva>({
    resolver: zodResolver(esquemaFormularioReserva),
    defaultValues: { pessoas: 2 },
  });

  function aoEnviar(dados: FormularioReserva) {
    const link = construirLinkWhatsapp(mensagemReserva(dados));
    setEnviado(true);
    window.open(link, "_blank", "noopener,noreferrer");
  }

  return (
    <form onSubmit={handleSubmit(aoEnviar)} className="grid gap-4" noValidate>
      <div className="grid gap-1.5">
        <label htmlFor="nome" className="text-cinza-claro" style={{ fontSize: "var(--t-rotulo)", letterSpacing: "0.08em", textTransform: "uppercase" }}>
          Nome
        </label>
        <input id="nome" className={campoBase} autoComplete="name" {...register("nome")} />
        {errors.nome && <p className="text-hinomaru-claro text-sm">{errors.nome.message}</p>}
      </div>

      <div className="grid gap-1.5">
        <label htmlFor="telefone" className="text-cinza-claro" style={{ fontSize: "var(--t-rotulo)", letterSpacing: "0.08em", textTransform: "uppercase" }}>
          Telefone com DDD
        </label>
        <input id="telefone" className={campoBase} autoComplete="tel" inputMode="tel" placeholder="(XX) 9XXXX-XXXX" {...register("telefone")} />
        {errors.telefone && <p className="text-hinomaru-claro text-sm">{errors.telefone.message}</p>}
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div className="grid gap-1.5">
          <label htmlFor="data" className="text-cinza-claro" style={{ fontSize: "var(--t-rotulo)", letterSpacing: "0.08em", textTransform: "uppercase" }}>
            Data
          </label>
          <input id="data" type="date" className={campoBase} {...register("data")} />
          {errors.data && <p className="text-hinomaru-claro text-sm">{errors.data.message}</p>}
        </div>
        <div className="grid gap-1.5">
          <label htmlFor="horario" className="text-cinza-claro" style={{ fontSize: "var(--t-rotulo)", letterSpacing: "0.08em", textTransform: "uppercase" }}>
            Horário
          </label>
          <input id="horario" type="time" className={campoBase} {...register("horario")} />
          {errors.horario && <p className="text-hinomaru-claro text-sm">{errors.horario.message}</p>}
        </div>
      </div>

      <div className="grid gap-1.5">
        <label htmlFor="pessoas" className="text-cinza-claro" style={{ fontSize: "var(--t-rotulo)", letterSpacing: "0.08em", textTransform: "uppercase" }}>
          Número de pessoas
        </label>
        <input
          id="pessoas"
          type="number"
          min={1}
          max={60}
          className={campoBase}
          {...register("pessoas", { valueAsNumber: true })}
        />
        {errors.pessoas && <p className="text-hinomaru-claro text-sm">{errors.pessoas.message}</p>}
      </div>

      <div className="grid gap-1.5">
        <label htmlFor="observacoes" className="text-cinza-claro" style={{ fontSize: "var(--t-rotulo)", letterSpacing: "0.08em", textTransform: "uppercase" }}>
          Observações (opcional)
        </label>
        <textarea id="observacoes" rows={3} className={campoBase} {...register("observacoes")} />
      </div>

      <button
        type="submit"
        disabled={isSubmitting}
        className="mt-2 bg-hinomaru px-6 py-3.5 text-washi uppercase disabled:opacity-60"
        style={{ fontWeight: 800, letterSpacing: "0.08em", fontSize: "0.9rem" }}
      >
        {enviado ? "Reserva enviada — abrindo o WhatsApp" : "Reservar pelo WhatsApp"}
      </button>

      <p className="text-cinza" style={{ fontSize: "0.75rem" }}>
        Você será direcionado ao WhatsApp do Oishi com sua reserva pré-preenchida — a
        confirmação é feita por lá.
      </p>
    </form>
  );
}
