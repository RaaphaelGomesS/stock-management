import { z } from "zod";

export const createStock = z.object({
  body: z.object({
    name: z.string({ required_error: "O nome é obrigatório.", invalid_type_error: "O nome deve ser uma string." }),
    description: z.string({ invalid_type_error: "A descrição deve ser uma string." }).optional(),
  }),
});

export const updateStock = z.object({
  body: z.object({
    name: z.string({ invalid_type_error: "O nome deve ser uma string." }).optional(),
    description: z.string({ invalid_type_error: "A descrição deve ser uma string." }).optional(),
  }),
});
