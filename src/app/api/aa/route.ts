import type { NextApiRequest, NextApiResponse } from "next";

type ResponseData = {
  message: string;
};

export async function GET(
  req: NextApiRequest,
  res: NextApiResponse<ResponseData>
) {
  console.log(req.method, res);

  return Response.json({ message: "Hello from Next.js!" });
}
