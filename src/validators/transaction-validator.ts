import { z } from "zod";

export const topUpSchema = z.object({
  top_up_amount: z.number().min(1, {
    message:
      "Paramter amount hanya boleh angka dan tidak boleh lebih kecil dari 0",
  }),
});

export const paymentSchema = z.object({
  service_code: z.string(),
});
