// app/api/generate/route.ts
import { NextRequest } from 'next/server';

// export const runtime = "edge";

async function improvePrompt(originalPrompt: string): Promise<string> {
  const improvementPrompt = `As an AI assistant, analyze and improve the following prompt to get better responses. Add necessary context, specify the desired format (including HTML/Markdown tags if needed), and make it more specific. Here's the user's prompt:

"${originalPrompt}"

Provide an improved version that will result in a more detailed, well-structured response. If relevant, include instructions for formatting with markdown or HTML tags.

Return ONLY the improved prompt, nothing else.`;

  try {
    const response = await fetch('http://localhost:11434/api/generate', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        model: 'llama3.2',
        prompt: originalPrompt,
      }),
    });

    let improvedPrompt = '';
    const reader = response.body?.getReader();
    const decoder = new TextDecoder();

    while (reader) {
      const { done, value } = await reader.read();
      if (done) break;

      const chunk = decoder.decode(value);
      const lines = chunk.split('\n').filter(Boolean);

      for (const line of lines) {
        const data = JSON.parse(line);
        improvedPrompt += data.response;
      }
    }

    return improvedPrompt.trim();
  } catch (error) {
    console.error('Error improving prompt:', error);
    return originalPrompt; // Fallback to original prompt if improvement fails
  }
}

// Helper function to format conversation context
function formatConversationContext(messages: any[]): string {
  if (!messages || messages.length === 0) return '';

  return messages.map((msg) => `${msg.role}: ${msg.content}`).join('\n\n') + '\n\n';
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { prompt, messages = [] } = body;

    // Get conversation context
    const conversationContext = formatConversationContext(messages);

    // Improve the prompt
    // const improvedPrompt = await improvePrompt(prompt);/*  */

    // Combine context with improved prompt
    const finalPrompt = `${conversationContext}Human: ${prompt}\n\nAssistant: `;

    // Create the final response stream
    const response = await fetch('http://localhost:11434/api/generate', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        model: 'llama3.2',
        prompt: finalPrompt,
        system: `You are a helpful assistant that provides well-structured, detailed responses. 
                When appropriate, use markdown formatting for better readability. 
                Use code blocks with language specification for code examples. 
                Format lists and tables appropriately. 
                Break down complex explanations into sections.`,
      }),
    });

    // Create a TransformStream to handle the streaming
    const { readable, writable } = new TransformStream();
    const writer = writable.getWriter();

    // Process the stream
    const reader = response.body?.getReader();
    if (!reader) {
      throw new Error('No reader available');
    }

    // Read and transform the stream
    const processStream = async () => {
      try {
        const decoder = new TextDecoder();
        while (true) {
          const { done, value } = await reader.read();
          if (done) {
            await writer.close();
            break;
          }

          const text = decoder.decode(value);
          const lines = text.split('\n').filter(Boolean);

          for (const line of lines) {
            const data = JSON.parse(line);
            await writer.write(new TextEncoder().encode(data.response));
          }
        }
      } catch (error) {
        console.error('Stream processing error:', error);
        await writer.abort(error as Error);
      }
    };

    // Start processing the stream
    processStream();

    // Return the readable stream
    return new Response(readable, {
      headers: {
        'Content-Type': 'text/event-stream',
        'Cache-Control': 'no-cache',
        Connection: 'keep-alive',
      },
    });
  } catch (error) {
    console.error('Error:', error);
    return new Response(JSON.stringify({ error: 'Internal Server Error' }), {
      status: 500,
      headers: {
        'Content-Type': 'application/json',
      },
    });
  }
}
