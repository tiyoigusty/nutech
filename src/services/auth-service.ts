import { LoginDTO, RegisterDTO } from "../dtos/auth-dto";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { PrismaClient } from "@prisma/client";
import { UserEntity } from "../entities/user-entity";

const prisma = new PrismaClient();

async function register(data: RegisterDTO) {
  try {
    const findUserQuery = `SELECT * FROM users WHERE email = $1`;
    const user: UserEntity[] = await prisma.$queryRawUnsafe(
      findUserQuery,
      data.email
    );

    if (user.length > 0) {
      throw new Error("Email sudah terdaftar");
    } else {
      const hashedPassword = await bcrypt.hash(data.password, 10);

      const insertUserQuery = `
        INSERT INTO users (id, first_name, last_name, email, password, profile_image, balance)
        VALUES (gen_random_uuid(), $1, $2, $3, $4, null, 0)
        RETURNING *;
      `;
      const newUser = await prisma.$queryRawUnsafe(
        insertUserQuery,
        data.firstname,
        data.lastname,
        data.email,
        hashedPassword
      );

      return newUser;
    }
  } catch (error) {
    if (error instanceof Error) {
      throw new Error(error.message);
    } else {
      throw new Error("An unknown error occurred");
    }
  }
}

async function login(data: LoginDTO) {
  try {
    const findUserQuery = `SELECT * FROM users WHERE email = $1`;
    const user: UserEntity[] = await prisma.$queryRawUnsafe(
      findUserQuery,
      data.email
    );

    if (user.length === 0) throw new Error("Email atau password salah");

    const isPasswordValid = await bcrypt.compare(
      data.password,
      user[0].password
    );
    if (!isPasswordValid) throw new Error("Email atau password salah");

    const token = jwt.sign({ email: user[0].email }, process.env.JWT_SECRET!, {
      expiresIn: "12h",
    });

    return { token };
  } catch (error) {
    if (error instanceof Error) {
      throw new Error(error.message);
    } else {
      throw new Error("An unknown error occurred");
    }
  }
}

export default { register, login };
