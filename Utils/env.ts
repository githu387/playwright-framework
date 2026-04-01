import * as dotenv from "dotenv";
import path from "path";

export function loadEnv()
{
    const env=process.env.TEST_ENV || "dev";
    const envPath=path.resolve(`.env.${env}`);
    dotenv.config({path:envPath});
    console.log(`Running test in: ${env}`);
}

export function getconfig()
{
    return{
    baseURL: process.env.BASE_URL,
    username:process.env.USERNAME,
    password:process.env.PASSWORD,
      };
}