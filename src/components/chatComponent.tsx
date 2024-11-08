"use client";

import { useState, KeyboardEvent, useRef, useEffect } from "react";
import { Send } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import React from "react";
import Markdown from "react-markdown";
import rehypeRaw from "rehype-raw";
import remarkGfm from "remark-gfm";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { createOpenAI } from "@ai-sdk/openai";
import { streamText } from "ai";

interface ChatMessage {
  text: string;
  isUser: boolean;
}

const openAi = createOpenAI({
  name: "qwen",
  apiKey: "",
  baseURL: "http://89.187.159.7:40105/v1",
});

function formatConversationHistory(messages: ChatMessage[]): string {
  return (
    messages.map((msg) => `${msg.isUser ? "Human" : "Assistant"}: ${msg.text}`).join("\n\n") +
    "\n\nAssistant:"
  );
}

async function getResponse(
  messages: ChatMessage[],
  chunksCallback: (content: string, isFirstChunk: boolean) => void
) {
  const conversationHistory = formatConversationHistory(messages);

  const { textStream } = await streamText({
    model: openAi("Qwen/Qwen2.5-7B-Instruct"),
    prompt: conversationHistory,
  });

  let response = "";
  let isFirstChunk = true;

  for await (const chunk of textStream) {
    response += chunk;
    chunksCallback(response, isFirstChunk);
    isFirstChunk = false;
  }
}

function LinkRenderer({ href, children }: { href: string; children: React.ReactNode }) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noreferrer"
      className="underline font-sans hover:text-blue-600 transition-colors"
    >
      {children}
    </a>
  );
}

export default function ChatComponent() {
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const chatContainerRef = useRef<HTMLDivElement>(null);

  // Smooth scroll to bottom
  const scrollToBottom = () => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: "smooth" });
    }
  };

  // Scroll on new messages or content updates
  useEffect(() => {
    scrollToBottom();
  }, [messages]); // This will trigger on both new messages and streaming updates

  // Monitor chat container scroll position
  useEffect(() => {
    const container = chatContainerRef.current;
    if (!container) return;

    const handleScroll = () => {
      const isNearBottom =
        container.scrollHeight - container.scrollTop - container.clientHeight < 100;
      if (isNearBottom) {
        scrollToBottom();
      }
    };

    container.addEventListener("scroll", handleScroll);
    return () => container.removeEventListener("scroll", handleScroll);
  }, []);

  const handleSend = async () => {
    const trimmedInput = input.trim();
    if (!trimmedInput || isLoading) return;

    setIsLoading(true);
    const userMessage: ChatMessage = { text: trimmedInput, isUser: true };
    const updatedMessages = [...messages, userMessage];
    setMessages(updatedMessages);
    setInput("");

    try {
      setMessages((msgs) => [...msgs, { text: "", isUser: false }]);
      await getResponse(updatedMessages, (newText, isFirstChunk) => {
        setMessages((prev) => {
          const updatedMessages = [...prev];
          if (!isFirstChunk && updatedMessages.length > 0) {
            updatedMessages[updatedMessages.length - 1] = {
              text: newText,
              isUser: false,
            };
          }
          return updatedMessages;
        });
      });
    } catch (error) {
      console.error("Error getting AI response:", error);
      setMessages((prev) => [
        ...prev,
        {
          text: "Sorry, there was an error processing your request.",
          isUser: false,
        },
      ]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleKeyDown = (e: KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  return (
    <div className="flex flex-col h-screen max-w-4xl mx-auto bg-background">
      {/* Header */}
      <div className="fixed top-0 left-0 right-0 bg-background border-b border-border z-10">
        <div className="max-w-4xl mx-auto p-4">
          <h1 className="text-2xl font-bold text-primary">AI Chat Assistant</h1>
        </div>
      </div>

      {/* Chat Messages */}
      <div
        ref={chatContainerRef}
        className="flex-1 overflow-y-auto p-4 space-y-6 mt-16 mb-4 scroll-smooth"
      >
        {messages.length === 0 && (
          <div className="text-center text-muted-foreground py-12">
            <h2 className="text-xl font-semibold mb-2">Welcome to AI Chat!</h2>
            <p>Start a conversation by typing a message below.</p>
          </div>
        )}

        {messages.map((message, index) => (
          <div
            key={index}
            className={`group flex ${message.isUser ? "justify-end" : "justify-start"}`}
          >
            <div
              className={`max-w-[85%] p-4 rounded-2xl shadow-sm transition-all
                ${
                  message.isUser
                    ? "bg-primary text-primary-foreground ml-4"
                    : "bg-secondary hover:bg-secondary/90 text-secondary-foreground mr-4"
                }
              `}
            >
              <Markdown
                className={`prose ${message.isUser ? "dark:prose-invert" : ""} max-w-none
                  ${message.isUser ? "text-primary-foreground" : "text-secondary-foreground"}
                `}
                rehypePlugins={[rehypeRaw]}
                remarkPlugins={[remarkGfm]}
                components={{
                  a: LinkRenderer,
                  code({ className, children, ...props }) {
                    const match = /language-(\w+)/.exec(className || "");
                    return match ? (
                      <div className="relative group">
                        <SyntaxHighlighter
                          {...props}
                          PreTag="div"
                          language={match[1]}
                          showLineNumbers
                          className="!mt-2 !mb-2 rounded-lg"
                        >
                          {String(children).replace(/\n$/, "")}
                        </SyntaxHighlighter>
                      </div>
                    ) : (
                      <code {...props} className={`${className} bg-opacity-75 rounded-md px-1`}>
                        {children}
                      </code>
                    );
                  },
                }}
              >
                {message.text}
              </Markdown>
            </div>
          </div>
        ))}

        {isLoading && (
          <div className="flex justify-start">
            <div className="bg-secondary rounded-2xl p-4 flex items-center space-x-2">
              <div className="flex space-x-1">
                <div
                  className="w-2 h-2 bg-primary rounded-full animate-bounce"
                  style={{ animationDelay: "0ms" }}
                />
                <div
                  className="w-2 h-2 bg-primary rounded-full animate-bounce"
                  style={{ animationDelay: "150ms" }}
                />
                <div
                  className="w-2 h-2 bg-primary rounded-full animate-bounce"
                  style={{ animationDelay: "300ms" }}
                />
              </div>
            </div>
          </div>
        )}

        {/* Invisible div for scroll anchoring */}
        <div ref={messagesEndRef} />
      </div>

      {/* Input Area */}
      <div className="border-t border-border bg-background p-4">
        <div className="max-w-4xl mx-auto flex space-x-2">
          <Textarea
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder="Type your message... (Press Enter to send, Shift+Enter for new line)"
            className="flex-1 resize-none min-h-[48px] max-h-[200px] py-3 px-4 rounded-xl"
            disabled={isLoading}
          />
          <Button
            onClick={handleSend}
            className={`rounded-xl px-4 transition-all duration-200 ${
              isLoading ? "opacity-50 cursor-not-allowed" : "hover:bg-primary/90"
            }`}
            disabled={isLoading}
          >
            <Send className="h-5 w-5" />
            <span className="sr-only">Send</span>
          </Button>
        </div>
      </div>
    </div>
  );
}
