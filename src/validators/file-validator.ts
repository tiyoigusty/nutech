import { z } from "zod";

const fileSchema = z.object({
  mimetype: z.enum(["image/jpeg", "image/png"], {
    errorMap: () => ({ message: "Format Image tidak sesuai" }),
  }),
  size: z.number().max(1024 * 1024 * 5, "Ukuran gambar maksimal 5MB"),
});

export const validateFileWithZod = (file: Express.Multer.File | undefined) => {
  if (!file) {
    return {
      success: false,
      error: "File tidak ditemukan",
    };
  }

  const result = fileSchema.safeParse(file);

  if (!result.success) {
    return {
      success: false,
      error: result.error.errors[0].message,
    };
  }

  return {
    success: true,
  };
};
