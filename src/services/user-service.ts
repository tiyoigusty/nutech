import { PrismaClient } from "@prisma/client";
import { UserDTO } from "../dtos/user-dto";
import { v2 as cloudinary } from "cloudinary";

const prisma = new PrismaClient();

async function findUser(email: string) {
  try {
    const query = `
      SELECT email, first_name, last_name, profile_image 
      FROM users 
      WHERE email = $1;
    `;
    const user = await prisma.$queryRawUnsafe(query, email);

    return user;
  } catch (error) {
    if (error instanceof Error) {
      throw new Error(error.message);
    } else {
      throw new Error("An unknown error occurred");
    }
  }
}

async function editUser(email: string, data: UserDTO) {
  try {
    const query = `
      UPDATE users 
      SET first_name = $1, last_name = $2
      WHERE email = $3
      RETURNING first_name, last_name;
    `;
    const user = await prisma.$queryRawUnsafe(
      query,
      data.firstname,
      data.lastname,
      email
    );

    return user;
  } catch (error) {
    if (error instanceof Error) {
      throw new Error(error.message);
    } else {
      throw new Error("An unknown error occurred");
    }
  }
}

async function editPhoto(email: string, file: string) {
  try {
    cloudinary.config({
      cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
      api_key: process.env.CLOUDINARY_API_KEY,
      api_secret: process.env.CLOUDINARY_API_SECRET,
    });

    let imageURL;

    if (file) {
      const upload = await cloudinary.uploader.upload(file, {
        upload_preset: "nutech",
      });
      imageURL = upload.secure_url;
    }

    const query = `
      UPDATE users 
      SET profile_image = $1
      WHERE email = $2
      RETURNING profile_image;
    `;
    const user = await prisma.$queryRawUnsafe(query, imageURL, email);

    return user;
  } catch (error) {
    if (error instanceof Error) {
      throw new Error(error.message);
    } else {
      throw new Error("An unknown error occurred");
    }
  }
}

export default { findUser, editUser, editPhoto };
