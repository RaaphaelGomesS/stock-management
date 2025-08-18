import { z } from "zod";
import { type as ProductType } from "@prisma/client";

export const createShelf = z.object({
  body: z.object({
    stockId: z.coerce
      .number({
        required_error: "O stockId é obrigatório.",
        invalid_type_error: "O stockId deve ser um número.",
      })
      .int("O stockId deve ser um inteiro."),
    columns: z.coerce
      .number({
        required_error: "A coluna é obrigatória.",
        invalid_type_error: "A coluna deve ser um número.",
      })
      .int("A coluna deve ser um inteiro.")
      .nonnegative("A coluna não pode ser negativa."),
    rows: z.coerce
      .number({
        required_error: "A linha é obrigatória.",
        invalid_type_error: "A linha deve ser um número.",
      })
      .int("A linha deve ser um inteiro.")
      .nonnegative("A linha não pode ser negativa."),
    destination: z.enum(Object.keys(ProductType), {
      errorMap: () => ({ message: "O tipo selecionado não é válido." }),
    }),
    restriction: z
      .string({
        invalid_type_error: "A restrição deve ser um texto.",
      })
      .optional().nullable(),
  }),
});

export const updateShelf = z.object({
  body: z.object({
    stockId: z.coerce
      .number({
        invalid_type_error: "O stockId deve ser um número.",
      })
      .int("O stockId deve ser um inteiro.")
      .optional(),
    columns: z.coerce
      .number({
        invalid_type_error: "A coluna deve ser um número.",
      })
      .int("A coluna deve ser um inteiro.")
      .nonnegative("A coluna não pode ser negativa.")
      .optional(),
    rows: z.coerce
      .number({
        invalid_type_error: "A linha deve ser um número.",
      })
      .int("A linha deve ser um inteiro.")
      .nonnegative("A linha não pode ser negativa.")
      .optional(),
    destination: z
      .enum(Object.keys(ProductType), {
        errorMap: () => ({ message: "O tipo selecionado não é válido." }),
      })
      .optional(),
    restriction: z
      .string({
        invalid_type_error: "A restrição deve ser um texto.",
      })
      .optional().nullable(),
  }),
});
