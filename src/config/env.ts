import dotenv from "dotenv";
dotenv.config();

export function getEnvVar(name: string): string {
  const value = process.env[name];
  if (value === undefined || value === null) {
    throw new Error(`${name} is not defined`);
  }
  if (typeof value !== "string") {
    throw new Error(`${name} must be a string`);
  }
  return value;
}

function getOptionalEnvVar(name: string): string | undefined {
  const value = process.env[name];
  return typeof value === "string" && value.length > 0 ? value : undefined;
}

export const config = {
  postgres: {
    // If POSTGRES_URL is provided, it takes precedence and individual fields may be omitted
    url: getOptionalEnvVar("POSTGRES_URL"),
    username: getOptionalEnvVar("POSTGRES_USERNAME"),
    password: getOptionalEnvVar("POSTGRES_PASSWORD"),
    host: getOptionalEnvVar("POSTGRES_HOST"),
    database: getOptionalEnvVar("POSTGRES_DATABASE"),
    port: parseInt(process.env.POSTGRES_PORT || "5432", 10),
  },
  server: {
    port: parseInt(process.env.PORT || "3000", 10),
    host: process.env.HOST || "0.0.0.0",
    corsOrigins: process.env.CORS_ORIGIN
      ? process.env.CORS_ORIGIN.split(",")
      : ["http://localhost:8080", "http://localhost:3000"],
  },
};
