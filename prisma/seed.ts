import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
  const banners = [
    {
      banner_name: "Banner 1",
      banner_image: "banner.jpg",
      description: "Lerem Ipsum Dolor sit amet",
    },
    {
      banner_name: "Banner 2",
      banner_image: "banner.jpg",
      description: "Lerem Ipsum Dolor sit amet",
    },
    {
      banner_name: "Banner 3",
      banner_image: "banner.jpg",
      description: "Lerem Ipsum Dolor sit amet",
    },
    {
      banner_name: "Banner 4",
      banner_image: "banner.jpg",
      description: "Lerem Ipsum Dolor sit amet",
    },
    {
      banner_name: "Banner 5",
      banner_image: "banner.jpg",
      description: "Lerem Ipsum Dolor sit amet",
    },
    {
      banner_name: "Banner 6",
      banner_image: "banner.jpg",
      description: "Lerem Ipsum Dolor sit amet",
    },
  ];

  for (const banner of banners) {
    await prisma.banner.create({
      data: banner,
    });
  }

  const services = [
    {
      service_code: "PAJAK",
      service_name: "Pajak PBB",
      service_icon: "services.jpg",
      service_tarif: 40000,
    },
    {
      service_code: "PLN",
      service_name: "Listrik",
      service_icon: "services.jpg",
      service_tarif: 10000,
    },
    {
      service_code: "PDAM",
      service_name: "PDAM Berlangganan",
      service_icon: "services.jpg",
      service_tarif: 40000,
    },
    {
      service_code: "PULSA",
      service_name: "Pulsa",
      service_icon: "services.jpg",
      service_tarif: 40000,
    },
    {
      service_code: "PGN",
      service_name: "PGN Berlangganan",
      service_icon: "services.jpg",
      service_tarif: 50000,
    },
    {
      service_code: "MUSIK",
      service_name: "Musik Berlangganan",
      service_icon: "services.jpg",
      service_tarif: 50000,
    },
    {
      service_code: "TV",
      service_name: "TV Berlangganan",
      service_icon: "services.jpg",
      service_tarif: 50000,
    },
    {
      service_code: "PAKET_DATA",
      service_name: "Paket data",
      service_icon: "services.jpg",
      service_tarif: 50000,
    },
    {
      service_code: "VOUCHER_GAME",
      service_name: "Voucher Game",
      service_icon: "services.jpg",
      service_tarif: 100000,
    },
    {
      service_code: "VOUCHER_MAKANAN",
      service_name: "Voucher Makanan",
      service_icon: "services.jpg",
      service_tarif: 100000,
    },
    {
      service_code: "QURBAN",
      service_name: "Qurban",
      service_icon: "services.jpg",
      service_tarif: 200000,
    },
    {
      service_code: "ZAKAT",
      service_name: "Zakat",
      service_icon: "services.jpg",
      service_tarif: 300000,
    },
  ];

  for (const service of services) {
    await prisma.service.create({
      data: service,
    });
  }
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
