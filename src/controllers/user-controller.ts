import { Request, Response } from "express";
import UserService from "../services/user-service";
import { UserDTO } from "../dtos/user-dto";
import { userSchema } from "../validators/user-validator";
import { validateFileWithZod } from "../validators/file-validator";

async function findUser(req: Request, res: Response) {
  /*  #swagger.description = `
        Digunakan untuk mendapatkan informasi profile User.<br>
      
      #swagger.responses[200] = {
        description: "Request Successfully",
        content: {
          "application/json": {
            example: {
              status: 0,
              message: "Sukses",
              data: {
                email: "test@gmail.com",
                first_name: "test",
                last_name: "test",
                profile_image: "https://yoururlapi.com/test.jpeg"
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
    // console.log("email", email);

    const user = await UserService.findUser(email);
    res.status(201).json({ status: 0, message: "Sukses", data: user });
  } catch (error) {
    return res
      .status(500)
      .json({ status: 500, message: (error as Error).message });
  }
}

async function editUser(req: Request, res: Response) {
  /*  #swagger.description = `
        Digunakan untuk mengupdate data profile User.<br>
      
      #swagger.requestBody = {
            required: true,
            content: {
                "application/json": {
                    schema: {
                    $ref: "#/components/schemas/UserDTO"
                    }  
                  }
                }
            }
        } 

      #swagger.responses[200] = {
        description: "Request Successfully",
        content: {
          "application/json": {
            example: {
              status: 0,
              message: "Update Pofile berhasil",
              data: {
                email: "test@gmail.com",
                first_name: "test edited",
                last_name: "test edited",
                profile_image: "https://yoururlapi.com/test.jpeg"
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
    const validatedData: UserDTO = userSchema.parse(req.body);
    const email = res.locals.user.email;

    const user = await UserService.editUser(email, validatedData);
    res
      .status(201)
      .json({ status: 0, message: "Update Profile Berhasil", data: user });
  } catch (error) {
    return res
      .status(500)
      .json({ status: 500, message: (error as Error).message });
  }
}

// async function editPhoto(req: Request, res: Response) {
//   /*  #swagger.description = `
//         Digunakan untuk mengupdate / upload profile image User.<br>

//       #swagger.requestBody = {
//             required: true,
//             content: {
//                 "multipart/form-data": {
//                     schema: {
//                     $ref: "#/components/schemas/UserImageDTO"
//                     }
//                 }
//             }
//         }

//       #swagger.responses[200] = {
//         description: "Request Successfully",
//         content: {
//           "application/json": {
//             example: {
//               status: 0,
//               message: "Update Pofile berhasil",
//               data: {
//                 email: "test@gmail.com",
//                 first_name: "test edited",
//                 last_name: "test edited",
//                 profile_image: "https://yoururlapi.com/test.jpeg"
//               }
//             }
//           }
//         }
//       }

//       #swagger.responses[400] = {
//         description: "Unauthorized",
//         content: {
//           "application/json": {
//             example: {
//               status: 102,
//               message: "Format Image tidak sesuai",
//               data: null
//             }
//           }
//         }
//       }

//       #swagger.responses[401] = {
//         description: "Unauthorized",
//         content: {
//           "application/json": {
//             example: {
//               status: 108,
//               message: "Token tidak tidak valid atau kadaluwarsa",
//               data: null
//             }
//           }
//         }
//       }
//     */
//   try {
//     if (!req.file) {
//       return res.status(400).json({
//         status: 102,
//         message: "Format Image tidak sesuai",
//         data: null,
//       });
//     }

//     const fileValidationResult = validateFileWithZod(req.file);

//     if (!fileValidationResult.success) {
//       return res.status(400).json({
//         status: 102,
//         message: fileValidationResult.error,
//         data: null,
//       });
//     }

//     const file = req.file?.path;
//     const email = res.locals.user.email;

//     const user = await UserService.editPhoto(email, file);
//     res.status(201).json({
//       status: 0,
//       message: "Update Profile Image Berhasil",
//       data: user,
//     });
//   } catch (error) {
//     return res
//       .status(500)
//       .json({ status: 500, message: (error as Error).message });
//   }
// }

async function editPhoto(req: Request, res: Response) {
  try {
    if (!req.file) {
      return res.status(400).json({
        status: 102,
        message: "Format Image tidak sesuai",
        data: null,
      });
    }

    const fileValidationResult = validateFileWithZod(req.file);

    if (!fileValidationResult.success) {
      return res.status(400).json({
        status: 102,
        message: fileValidationResult.error,
        data: null,
      });
    }

    const fileBuffer = req.file.buffer; // Akses buffer file dari multer memoryStorage
    const email = res.locals.user.email;

    const user = await UserService.editPhoto(email, fileBuffer); // Kirim buffer ke service
    res.status(201).json({
      status: 0,
      message: "Update Profile Image Berhasil",
      data: user,
    });
  } catch (error) {
    return res
      .status(500)
      .json({ status: 500, message: (error as Error).message });
  }
}

export default { findUser, editUser, editPhoto };
