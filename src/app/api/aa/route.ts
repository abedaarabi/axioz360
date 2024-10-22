import type { NextApiRequest, NextApiResponse } from "next";

type ResponseData = {
  message: string;
};

export async function GET() {
  return Response.json({ message: "Hello from Next.js!" });
}
