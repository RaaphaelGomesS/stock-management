import { z } from "zod";
import { lote_type as ProductLoteType, type as ProductType } from "@prisma/client";

export const createProduct = z.object({
  body: z.object({
    ean: z.coerce
      .number({
        required_error: "O ean é obrigatório.",
        invalid_type_error: "O ean deve ser um número.",
      })
      .int("O ean deve ser um inteiro."),
    name: z.string({
      required_error: "O nome do produto é obrigatório.",
      invalid_type_error: "O nome do produto deve ser um texto.",
    }),
    description: z
      .string({
        invalid_type_error: "A descrição deve ser um texto.",
      })
      .optional()
      .nullable(),
    type: z.enum(Object.keys(ProductType), {
      errorMap: () => ({ message: "O tipo selecionado não é válido." }),
    }),

    loteType: z.enum(Object.keys(ProductLoteType), {
      errorMap: () => ({ message: "O tipo de lote selecionado não é válido." }),
    }),
    shelfId: z.coerce.number({
      required_error: "O id da prateleira é obrigatório.",
      invalid_type_error: "O id da prateleira deve ser um número.",
    }),
    weight: z.coerce
      .number({
        invalid_type_error: "O peso deve ser um número.",
      })
      .positive("O peso deve ser um positivo.")
      .optional()
      .nullable(),
    loteAmount: z.coerce
      .number({
        required_error: "A quantidade do lote é obrigatória.",
        invalid_type_error: "A quantidade do lote deve ser um número.",
      })
      .int("A quantidade do lote deve ser um inteiro.")
      .nonnegative("A quantidade do lote não pode ser negativa."),
    quantity: z.coerce
      .number({
        required_error: "A quantidade é obrigatória.",
        invalid_type_error: "A quantidade deve ser um número.",
      })
      .int("A quantidade deve ser um inteiro.")
      .nonnegative("A quantidade não pode ser negativa."),
    validity: z.coerce
      .string({
        invalid_type_error: "A validade deve ser uma string.",
      })
      .optional(),
    column: z.coerce
      .number({
        required_error: "A coluna é obrigatória.",
        invalid_type_error: "A coluna deve ser um número.",
      })
      .int("A coluna deve ser um inteiro.")
      .nonnegative("A coluna não pode ser negativa."),
    row: z.coerce
      .number({
        required_error: "A linha é obrigatória.",
        invalid_type_error: "A linha deve ser um número.",
      })
      .int("A linha deve ser um inteiro.")
      .nonnegative("A linha não pode ser negativa."),
  }),

  file: z
    .object({
      filename: z.string(),
      path: z.string(),
      mimetype: z.string(),
      size: z.number(),
    })
    .optional(),
});

export const updateProduct = z.object({
  body: z.object({
    name: z.string({
      invalid_type_error: "O nome do produto deve ser um texto.",
    }).optional(),
    description: z
      .string({
        invalid_type_error: "A descrição deve ser um texto.",
      })
      .optional(),
    type: z
      .enum(Object.keys(ProductType), {
        errorMap: () => ({ message: "O tipo selecionado não é válido." }),
      })
      .optional(),

    loteType: z
      .enum(Object.keys(ProductLoteType), {
        errorMap: () => ({ message: "O tipo de lote selecionado não é válido." }),
      })
      .optional(),
    shelfId: z.coerce
      .number({
        required_error: "O id da prateleira é obrigatório.",
        invalid_type_error: "O id da prateleira deve ser um número.",
      })
      .optional(),
    weight: z.coerce
      .number({
        invalid_type_error: "O peso deve ser um número.",
      })
      .positive("O peso deve ser um positivo.")
      .optional()
      .nullable(),
    loteAmount: z.coerce
      .number({
        required_error: "A quantidade do lote é obrigatória.",
        invalid_type_error: "A quantidade do lote deve ser um número.",
      })
      .int("A quantidade do lote deve ser um inteiro.")
      .nonnegative("A quantidade do lote não pode ser negativa.")
      .optional(),
    quantity: z.coerce
      .number({
        required_error: "A quantidade é obrigatória.",
        invalid_type_error: "A quantidade deve ser um número.",
      })
      .int("A quantidade deve ser um inteiro.")
      .nonnegative("A quantidade não pode ser negativa.")
      .optional(),
    validity:z.coerce
      .string({
        invalid_type_error: "A validade deve ser uma string.",
      })
      .optional(),
    column: z.coerce
      .number({
        required_error: "A coluna é obrigatória.",
        invalid_type_error: "A coluna deve ser um número.",
      })
      .int("A coluna deve ser um inteiro.")
      .nonnegative("A coluna não pode ser negativa.")
      .optional(),
    row: z.coerce
      .number({
        required_error: "A linha é obrigatória.",
        invalid_type_error: "A linha deve ser um número.",
      })
      .int("A linha deve ser um inteiro.")
      .nonnegative("A linha não pode ser negativa.")
      .optional(),
  }),

  file: z
    .object({
      filename: z.string(),
      path: z.string(),
      mimetype: z.string(),
      size: z.number(),
    })
    .optional(),
});

export const adjustment = z.object({
  body: z.object({
    reason: z
      .string({
        invalid_type_error: "O motivo deve ser um texto.",
      })
      .optional()
      .nullable(),
    adjustment: z.coerce
      .number({
        required_error: "O valor de ajuste é obrigatório.",
        invalid_type_error: "O valor de ajuste deve ser um número.",
      })
      .int("O valor de ajuste deve ser um inteiro."),
  }),
});
