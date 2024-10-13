import { Request, Response } from "express";
import InformationService from "../services/information-service";

async function allBanner(req: Request, res: Response) {
  /*  #swagger.description = `
        Digunakan untuk mendapatkan list banner.<br>
      
      #swagger.responses[200] = {
        description: "Request Successfully",
        content: {
          "application/json": {
            example: {
              status: 0,
              message: "Sukses",
              data: [
                {
                  "banner_name": "Banner 1",
                  "banner_image": "https://nutech-integrasi.app/dummy.jpg",
                  "description": "Lerem Ipsum Dolor sit amet"
                },
                {
                  "banner_name": "Banner 2",
                  "banner_image": "https://nutech-integrasi.app/dummy.jpg",
                  "description": "Lerem Ipsum Dolor sit amet"
                },
                {
                  "banner_name": "Banner 3",
                  "banner_image": "https://nutech-integrasi.app/dummy.jpg",
                  "description": "Lerem Ipsum Dolor sit amet"
                },
                {
                  "banner_name": "Banner 4",
                  "banner_image": "https://nutech-integrasi.app/dummy.jpg",
                  "description": "Lerem Ipsum Dolor sit amet"
                },
                {
                  "banner_name": "Banner 5",
                  "banner_image": "https://nutech-integrasi.app/dummy.jpg",
                  "description": "Lerem Ipsum Dolor sit amet"
                },
                {
                  "banner_name": "Banner 6",
                  "banner_image": "https://nutech-integrasi.app/dummy.jpg",
                  "description": "Lerem Ipsum Dolor sit amet"
                }
              ]
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
    const banner = await InformationService.allBanner();
    res.status(201).json({ status: 0, message: "Sukses", data: banner });
  } catch (error) {
    return res
      .status(500)
      .json({ status: 500, message: (error as Error).message });
  }
}

async function allService(req: Request, res: Response) {
  /*  #swagger.description = `
        Digunakan untuk mendapatkan list Service/Layanan PPOB.<br>
      
      #swagger.responses[200] = {
        description: "Request Successfully",
        content: {
          "application/json": {
            example: {
              status: 0,
              message: "Sukses",
              data: [
                {
                  "service_code": "PGN",
                  "service_name": "PGN Berlangganan",
                  "service_icon": "https://nutech-integrasi.app/dummy.jpg",
                  "service_tariff": 50000
                },
                {
                  "service_code": "MUSIK",
                  "service_name": "Musik Berlangganan",
                  "service_icon": "https://nutech-integrasi.app/dummy.jpg",
                  "service_tariff": 50000
                },
                {
                  "service_code": "TV",
                  "service_name": "TV Berlangganan",
                  "service_icon": "https://nutech-integrasi.app/dummy.jpg",
                  "service_tariff": 50000
                },
                {
                  "service_code": "PAKET_DATA",
                  "service_name": "Paket data",
                  "service_icon": "https://nutech-integrasi.app/dummy.jpg",
                  "service_tariff": 50000
                },
                {
                  "service_code": "VOUCHER_GAME",
                  "service_name": "Voucher Game",
                  "service_icon": "https://nutech-integrasi.app/dummy.jpg",
                  "service_tariff": 100000
                },
                {
                  "service_code": "VOUCHER_MAKANAN",
                  "service_name": "Voucher Makanan",
                  "service_icon": "https://nutech-integrasi.app/dummy.jpg",
                  "service_tariff": 100000
                },
                {
                  "service_code": "QURBAN",
                  "service_name": "Qurban",
                  "service_icon": "https://nutech-integrasi.app/dummy.jpg",
                  "service_tariff": 200000
                },
                {
                  "service_code": "ZAKAT",
                  "service_name": "Zakat",
                  "service_icon": "https://nutech-integrasi.app/dummy.jpg",
                  "service_tariff": 300000
                }
              ]
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
    const services = await InformationService.allService();
    res.status(201).json({ status: 0, message: "Sukses", data: services });
  } catch (error) {
    return res
      .status(500)
      .json({ status: 500, message: (error as Error).message });
  }
}

export default { allBanner, allService };
