import { Request, Response } from "express";
import { LoginDTO, RegisterDTO } from "../dtos/auth-dto";
import { loginSchema, registerSchema } from "../validators/auth-validator";
import { ZodError } from "zod";
import AuthService from "../services/auth-service";

async function register(req: Request, res: Response) {
  /*  #swagger.description = `
        Digunakan untuk melakukan registrasi User agar bisa Login kedalam aplikasi.<br>

      #swagger.requestBody = {
            required: true,
            content: {
                "application/json": {
                    schema: {
                    $ref: "#/components/schemas/RegisterDTO"
                    }  
                  }
                }
            }
        }
      
      #swagger.responses[200] = {
        description: "Registrasi berhasil silahkan login",
        content: {
          "application/json": {
            example: {
              status: 0,
              message: "Registrasi berhasil silahkan login",
              data: null
            }
          }
        }
      }

      #swagger.responses[400] = {
        description: "Bad Request",
        content: {
          "application/json": {
            example: {
              status: 102,
              message: "Parameter email tidak sesuai format",
              data: null
            }
          }
        }
      }
    */
  try {
    const validatedData: RegisterDTO = registerSchema.parse(req.body);
    await AuthService.register(validatedData);
    res.status(201).json({ status: 0, message: "Register Sukses", data: null });
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

async function login(req: Request, res: Response) {
  /*  #swagger.description = `
        Digunakan untuk melakukan login dan mendapatkan authentication berupa JWT (Json Web Token)<br>
      
      #swagger.requestBody = {
            required: true,
            content: {
                "application/json": {
                    schema: {
                    $ref: "#/components/schemas/LoginDTO"
                    }  
                  }
                }
            }
        }
      
      #swagger.responses[200] = {
        description: "Login Sukses",
        content: {
          "application/json": {
            example: {
              status: 0,
              message: "Login Sukses",
              data: {
                token: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
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
              status: 102,
              message: "Parameter email tidak sesuai format",
              data: null
            }
          }
        }
      }

      #swagger.responses[401] = {
        description: "Unauthorized",
        content: {
          "application/json": {
            example: {
              status: 103,
              message: "Username atau password salah",
              data: null
            }
          }
        }
      }
    */
  try {
    const validatedData: LoginDTO = loginSchema.parse(req.body);
    const user = await AuthService.login(validatedData);
    res.status(201).json({ status: 0, message: "Login Sukses", data: user });
  } catch (error) {
    if (error instanceof ZodError) {
      return res
        .status(400)
        .json({ status: 102, message: (error as ZodError).errors[0].message });
    }
    return res
      .status(500)
      .json({ status: 103, message: (error as Error).message });
  }
}

export default { register, login };
