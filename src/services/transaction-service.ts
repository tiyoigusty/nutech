import { PrismaClient } from "@prisma/client";
import { PaymentDTO, TopUpDTO } from "../dtos/transaction-dto";
import { generateInvoiceNumber } from "./generate-invoice-number";
import { ServiceEntity, UserEntity } from "../entities/user-entity";

const prisma = new PrismaClient();

async function getBalance(email: string) {
  try {
    const query = `
      SELECT balance FROM users WHERE email = $1;
    `;
    const balance = await prisma.$queryRawUnsafe(query, email);

    return balance;
  } catch (error) {
    if (error instanceof Error) {
      throw new Error(error.message);
    } else {
      throw new Error("An unknown error occurred");
    }
  }
}

async function topUp(email: string, data: TopUpDTO) {
  try {
    const invoiceNumber = await generateInvoiceNumber();

    const topUpQuery = `
      UPDATE users 
      SET balance = balance + $1 
      WHERE email = $2 
      RETURNING balance;
    `;

    const topUp = await prisma.$queryRawUnsafe(
      topUpQuery,
      data.top_up_amount,
      email
    );

    const userIdQuery = `SELECT id FROM users WHERE email = $1`;
    const user: UserEntity[] = await prisma.$queryRawUnsafe(userIdQuery, email);

    const transactionQuery = `
      INSERT INTO transactions (id, invoice_number, transaction_type, created_at, user_id, amount, description)
      VALUES (gen_random_uuid(), $1, $2, now(), $3, $4, $5);
    `;
    await prisma.$executeRawUnsafe(
      transactionQuery,
      invoiceNumber,
      "TOP UP",
      user[0].id,
      data.top_up_amount,
      "Top Up Balance"
    );

    return topUp;
  } catch (error) {
    if (error instanceof Error) {
      throw new Error(error.message);
    } else {
      throw new Error("An unknown error occurred");
    }
  }
}

async function payment(email: string, data: PaymentDTO) {
  try {
    const userQuery = `
      SELECT id, balance FROM users WHERE email = $1;
    `;
    const user: UserEntity[] = await prisma.$queryRawUnsafe(userQuery, email);

    const serviceQuery = `
    SELECT * FROM services WHERE service_code = $1 LIMIT 1;
  `;
    const service: ServiceEntity[] = await prisma.$queryRawUnsafe(
      serviceQuery,
      data.service_code
    );

    if (!service || service.length === 0) {
      throw new Error("Service atau Layanan tidak ditemukan");
    }

    if (!user || user[0]?.balance < service[0].service_tarif) {
      throw new Error("Saldo tidak mencukupi");
    }

    const invoiceNumber = await generateInvoiceNumber();

    const updateBalanceQuery = `
    UPDATE users 
    SET balance = balance - $1 
    WHERE email = $2;
  `;
    await prisma.$executeRawUnsafe(
      updateBalanceQuery,
      service[0].service_tarif,
      email
    );

    const transactionQuery = `
      INSERT INTO transactions (id, transaction_type, amount, invoice_number, description, user_id, service_id)
      VALUES (gen_random_uuid(), $1, $2, $3, $4, $5, $6);
    `;
    await prisma.$executeRawUnsafe(
      transactionQuery,
      "PAYMENT",
      service[0].service_tarif,
      invoiceNumber,
      service[0].service_name,
      user[0].id,
      service[0].id
    );

    return {
      invoice_number: invoiceNumber,
      service_code: service[0].service_code,
      service_name: service[0].service_name,
      transaction_type: "PAYMENT",
      total_amount: service[0].service_tarif,
      created_on: new Date(),
    };
  } catch (error) {
    if (error instanceof Error) {
      throw new Error(error.message);
    } else {
      throw new Error("An unknown error occurred");
    }
  }
}

async function history(email: string, limit?: number) {
  try {
    const userIdQuery = `SELECT id FROM users WHERE email = $1`;
    const user: UserEntity[] = await prisma.$queryRawUnsafe(userIdQuery, email);

    let query = `
      SELECT invoice_number, transaction_type, description, amount, created_at 
      FROM transactions 
      WHERE user_id = $1 
      ORDER BY created_at DESC
    `;

    if (limit) {
      query += ` LIMIT $2`;
      return await prisma.$queryRawUnsafe(query, user[0].id, limit);
    } else {
      return await prisma.$queryRawUnsafe(query, user[0].id);
    }
  } catch (error) {
    if (error instanceof Error) {
      throw new Error(error.message);
    } else {
      throw new Error("An unknown error occurred");
    }
  }
}

export default { getBalance, topUp, payment, history };
