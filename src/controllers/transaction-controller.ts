import { Request, Response } from "express";
import TransactionService from "../services/transaction-service";
import {
  paymentSchema,
  topUpSchema,
} from "../validators/transaction-validator";
import { PaymentDTO, TopUpDTO } from "../dtos/transaction-dto";
import { ZodError } from "zod";
import { TransactionEntity } from "../entities/user-entity";

async function getBalance(req: Request, res: Response) {
  /*  #swagger.description = `
        Digunakan untuk mendapatkan informasi balance / saldo terakhir dari User.<br>
      
      #swagger.responses[200] = {
        description: "Request Successfully",
        content: {
          "application/json": {
            example: {
              status: 0,
              message: "Get Balance Berhasil",
              data: {
                "balance": 1000000
              }
            }
          }
        }
      }

      #swagger.responses[401] = {
        description: "Unauthorized",
        content: {
          "application/json": {
            example: {
              status: 108,
              message: "Token tidak tidak valid atau kadaluwarsa",
              data: null
            }
          }
        }
      }
    */
  try {
    const email = res.locals.user.email;

    const balance = await TransactionService.getBalance(email);
    res
      .status(201)
      .json({ status: 0, message: "Get Balance Berhasil", data: balance });
  } catch (error) {
    return res
      .status(500)
      .json({ status: 500, message: (error as Error).message });
  }
}

async function topUp(req: Request, res: Response) {
  /*  #swagger.description = `
        Digunakan untuk melakukan top up balance / saldo dari User.<br>

      #swagger.requestBody = {
            required: true,
            content: {
                "application/json": {
                    schema: {
                    $ref: "#/components/schemas/TopUpDTO"
                    }  
                  }
                }
            }
        }
      
      #swagger.responses[200] = {
        description: "Top Up Balance berhasil",
        content: {
          "application/json": {
            example: {
              status: 0,
              message: "Top Up Balance berhasil",
              data: {
                "balance": 1900000
              }
            }
          }
        }
      }

      #swagger.responses[400] = {
        description: "Bad Request",
        content: {
          "application/json": {
            example: {
              "status": 102,
              "message": "Paramter amount hanya boleh angka dan tidak boleh lebih kecil dari 0",
              "data": null
            }
          }
        }
      }

      #swagger.responses[401] = {
        description: "Unauthorized",
        content: {
          "application/json": {
            example: {
              status: 108,
              message: "Token tidak tidak valid atau kadaluwarsa",
              data: null
            }
          }
        }
      }
    */
  try {
    const validatedData: TopUpDTO = topUpSchema.parse(req.body);
    const email = res.locals.user.email;

    const topUp = await TransactionService.topUp(email, validatedData);
    res
      .status(201)
      .json({ status: 0, message: "Top Up Balance berhasil", data: topUp });
  } catch (error) {
    if (error instanceof ZodError) {
      return res
        .status(400)
        .json({ status: 102, message: (error as ZodError).errors[0].message });
    }
    return res
      .status(500)
      .json({ status: 500, message: (error as Error).message });
  }
}

async function payment(req: Request, res: Response) {
  /*  #swagger.description = `
        Digunakan untuk melakukan transaksi dari services / layanan yang tersedia.<br>

      #swagger.requestBody = {
            required: true,
            content: {
                "application/json": {
                    schema: {
                    $ref: "#/components/schemas/PaymentDTO"
                    }  
                  }
                }
            }
        }
      
      #swagger.responses[200] = {
        description: "Transaksi berhasil",
        content: {
          "application/json": {
            example: {
              status: 0,
              message: "Transaksi berhasil",
              data: {
                "invoice_number": "1728750342931",
                "service_code": "PULSA",
                "service_name": "Pulsa",
                "transaction_type": "PAYMENT",
                "total_amount": 40000,
                "created_on": "2024-10-12T16:25:42.931Z"
              }
            }
          }
        }
      }

      #swagger.responses[400] = {
        description: "Bad Request",
        content: {
          "application/json": {
            example: {
              "status": 102,
              "message": "Service ataus Layanan tidak ditemukan",
              "data": null
            }
          }
        }
      }

      #swagger.responses[401] = {
        description: "Unauthorized",
        content: {
          "application/json": {
            example: {
              status: 108,
              message: "Token tidak tidak valid atau kadaluwarsa",
              data: null
            }
          }
        }
      }
    */
  try {
    const validatedData: PaymentDTO = paymentSchema.parse(req.body);
    const email = res.locals.user.email;

    const payment = await TransactionService.payment(email, validatedData);
    res
      .status(201)
      .json({ status: 0, message: "Transaksi berhasil", data: payment });
  } catch (error) {
    return res
      .status(500)
      .json({ status: 102, message: (error as Error).message });
  }
}

async function history(req: Request, res: Response) {
  /*  #swagger.description = `
        Digunakan untuk mendapatkan informasi balance / saldo terakhir dari User.<br>
      
      #swagger.responses[200] = {
        description: "Request Successfully",
        content: {
          "application/json": {
            example: {
              status: 0,
              message: "Get History Berhasil",
              data: {
                "offset": 0,
                "limit": 3,
                "records": [
                  {
                    "invoice_number": "INV17082023-001",
                    "transaction_type": "TOPUP",
                    "description": "Top Up balance",
                    "total_amount": 100000,
                    "created_on": "2023-08-17T10:10:10.000Z"
                  },
                  {
                    "invoice_number": "INV17082023-002",
                    "transaction_type": "PAYMENT",
                    "description": "PLN Pascabayar",
                    "total_amount": 10000,
                    "created_on": "2023-08-17T11:10:10.000Z"
                  },
                  {
                    "invoice_number": "INV17082023-003",
                    "transaction_type": "PAYMENT",
                    "description": "Pulsa Indosat",
                    "total_amount": 40000,
                    "created_on": "2023-08-17T12:10:10.000Z"
                  }
                ]
              }
            }
          }
        }
      }

      #swagger.responses[401] = {
        description: "Unauthorized",
        content: {
          "application/json": {
            example: {
              status: 108,
              message: "Token tidak tidak valid atau kadaluwarsa",
              data: null
            }
          }
        }
      }
    */
  try {
    const email = res.locals.user.email;
    const limit = req.query.limit
      ? parseInt(req.query.limit as string, 10)
      : undefined;

    const history = (await TransactionService.history(
      email,
      limit
    )) as TransactionEntity[];
    res.status(201).json({
      status: 0,
      message: "Get History Berhasil",
      data: {
        offset: 0,
        limit: limit || history.length,
        records: history,
      },
    });
  } catch (error) {
    return res
      .status(500)
      .json({ status: 500, message: (error as Error).message });
  }
}

export default { getBalance, topUp, payment, history };
