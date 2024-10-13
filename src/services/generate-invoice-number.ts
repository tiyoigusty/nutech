import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function generateInvoiceNumber(): Promise<string> {
  // Langkah 1: Ambil transaksi terakhir yang ada
  const lastTransaction = await prisma.transaction.findFirst({
    orderBy: {
      created_at: "desc", // Urutkan dari transaksi yang paling baru
    },
    select: {
      invoice_number: true, // Hanya ambil field invoice_number
    },
  });

  // Langkah 2: Tentukan nomor invoice baru berdasarkan transaksi terakhir
  let newInvoiceNumber: string;

  const formattedDate = new Date().toISOString().slice(0, 10).replace(/-/g, ""); // Format tanggal

  if (lastTransaction) {
    // Jika ada transaksi terakhir, ambil nomor urut dan tambah 1
    const lastInvoice = lastTransaction.invoice_number.split("-")[1]; // Ambil bagian nomor urut dari invoice
    const nextNumber = String(parseInt(lastInvoice, 10) + 1).padStart(3, "0"); // Tambah 1 dan pastikan 3 digit

    newInvoiceNumber = `INV${formattedDate}-${nextNumber}`;
  } else {
    // Jika belum ada transaksi, mulai dengan nomor pertama
    newInvoiceNumber = `INV${formattedDate}-001`;
  }

  return newInvoiceNumber;
}
