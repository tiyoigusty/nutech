import { z } from "zod";

export const userSchema = z.object({
  firstname: z.string(),
  lastname: z.string(),
});
