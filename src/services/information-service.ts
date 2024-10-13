import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function allBanner() {
  try {
    const query = `
      SELECT * FROM banners
      ORDER BY banner_name ASC;
    `;
    const banners = await prisma.$queryRawUnsafe(query);

    return banners;
  } catch (error) {
    if (error instanceof Error) {
      throw new Error(error.message);
    } else {
      throw new Error("An unknown error occurred");
    }
  }
}

async function allService() {
  try {
    const query = `
      SELECT * FROM services
      ORDER BY service_code ASC;
    `;
    const services = await prisma.$queryRawUnsafe(query);

    return services;
  } catch (error) {
    if (error instanceof Error) {
      throw new Error(error.message);
    } else {
      throw new Error("An unknown error occurred");
    }
  }
}

export default { allBanner, allService };
