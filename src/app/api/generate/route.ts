import type { NextApiRequest, NextApiResponse } from "next";

type ResponseData = {
  message: string;
};

export async function GET() {
  return Response.json({ message: "Hello from Next.js!" });
}
// app/api/generate/route.ts
import { NextRequest } from "next/server";

export const runtime = "edge";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { prompt } = body;

    const response = await fetch("http://localhost:11434/api/generate", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        model: "llama3.2",
        prompt: prompt,
      }),
    });

    // Create a TransformStream to handle the streaming
    const { readable, writable } = new TransformStream();
    const writer = writable.getWriter();
    console.log(response);

    // Process the stream
    const reader = response.body?.getReader();
    if (!reader) {
      throw new Error("No reader available");
    }

    // Read and transform the stream
    const processStream = async () => {
      try {
        while (true) {
          const { done, value } = await reader.read();
          if (done) {
            await writer.close();
            break;
          }

          // Convert the bytes to text
          const text = new TextDecoder().decode(value);
          const lines = text.split("\n").filter(Boolean);

          // Process each line
          for (const line of lines) {
            const data = JSON.parse(line);
            await writer.write(new TextEncoder().encode(data.response));
          }
        }
      } catch (error) {
        console.error("Stream processing error:", error);
        await writer.abort(error as Error);
      }
    };

    // Start processing the stream
    processStream();

    // Return the readable stream
    return new Response(readable, {
      headers: {
        "Content-Type": "text/event-stream",
        "Cache-Control": "no-cache",
        Connection: "keep-alive",
      },
    });
  } catch (error) {
    console.error("Error:", error);
    return new Response(JSON.stringify({ error: "Internal Server Error" }), {
      status: 500,
      headers: {
        "Content-Type": "application/json",
      },
    });
  }
}
