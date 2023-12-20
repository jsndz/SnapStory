import dotenv from 'dotenv'; 
dotenv.config();

export const PORT = process.env.PORT;
export const BCRYPT_SALT_ROUNDS = process.env.BCRYPT_SALT_ROUNDS;
