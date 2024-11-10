"use client";

import { useState, KeyboardEvent, useRef, useEffect } from "react";
import { Send, Trash2, X, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import React from "react";
import Markdown from "react-markdown";
import rehypeRaw from "rehype-raw";
import remarkGfm from "remark-gfm";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { log } from "console";

interface ChatMessage {
  text: string;
  isUser: boolean;
}

function formatConversationHistory(messages: ChatMessage[]): string {
  return (
    messages
      .map((msg) => `${msg.isUser ? "Human" : "Assistant"}: ${msg.text}`)
      .join("\n\n") + "\n\nAssistant:"
  );
}

async function getResponse(
  messages: ChatMessage[],
  chunksCallback: (content: string, isFirstChunk: boolean) => void,
  signal: AbortSignal
) {
  const conversationHistory = formatConversationHistory(messages);

  try {
    const response = await fetch("/api/generate", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        prompt: conversationHistory,
      }),
      signal, // Add abort signal to fetch request
    });

    if (!response.body) {
      throw new Error("No response body");
    }

    const reader = response.body.getReader();
    const decoder = new TextDecoder();
    let isFirstChunk = true;
    let accumulatedText = "";

    while (true) {
      const { done, value } = await reader.read();
      if (done) break;

      const text = decoder.decode(value);
      accumulatedText += text;
      chunksCallback(accumulatedText, isFirstChunk);
      isFirstChunk = false;
    }
  } catch (error: unknown) {
    if (error instanceof Error && error.name === "AbortError") {
      throw new Error("Request cancelled");
    }
    console.error("Error in getResponse:", error);
    throw error;
  }
}

function LinkRenderer(props: React.AnchorHTMLAttributes<HTMLAnchorElement>) {
  return (
    <a
      {...props}
      target="_blank"
      rel="noreferrer"
      className="underline font-sans hover:text-blue-600 transition-colors"
    >
      {props.children}
    </a>
  );
}

export default function ChatComponent() {
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const chatContainerRef = useRef<HTMLDivElement>(null);
  const abortControllerRef = useRef<AbortController | null>(null);

  const scrollToBottom = () => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: "smooth" });
    }
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  useEffect(() => {
    const container = chatContainerRef.current;
    if (!container) return;

    const handleScroll = () => {
      const isNearBottom =
        container.scrollHeight - container.scrollTop - container.clientHeight <
        100;
      if (isNearBottom) {
        scrollToBottom();
      }
    };

    container.addEventListener("scroll", handleScroll);
    return () => container.removeEventListener("scroll", handleScroll);
  }, []);

  const handleClearChat = () => {
    setMessages([]);
    setInput("");
  };

  const handleCancel = () => {
    if (abortControllerRef.current) {
      abortControllerRef.current.abort();
      abortControllerRef.current = null;
      setIsLoading(false);
    }
  };

  const handleSend = async () => {
    const trimmedInput = input.trim();
    if (!trimmedInput || isLoading) return;
    console.log("first");
    setIsLoading(true);
    const userMessage: ChatMessage = { text: trimmedInput, isUser: true };
    const updatedMessages = [...messages, userMessage];
    setMessages(updatedMessages);
    setInput("");

    // Create new AbortController for this request
    abortControllerRef.current = new AbortController();

    try {
      setMessages((msgs) => [...msgs, { text: "", isUser: false }]);
      await getResponse(
        updatedMessages,
        (newText, isFirstChunk) => {
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
        },
        abortControllerRef.current.signal
      );
    } catch (error: unknown) {
      console.error("Error getting AI response:", error);
      if (error instanceof Error && error.message === "Request cancelled") {
        setMessages((prev) => prev.slice(0, -1)); // Remove the last empty message
      } else {
        setMessages((prev) => [
          ...prev,
          {
            text: "Sorry, there was an error processing your request.",
            isUser: false,
          },
        ]);
      }
    } finally {
      setIsLoading(false);
      abortControllerRef.current = null;
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
      <div className="fixed top-0 left-0 right-0 bg-background border-b border-border z-10">
        <div className="max-w-4xl mx-auto p-4 flex justify-between items-center">
          <h1 className="text-2xl font-bold text-primary">AI Chat Assistant</h1>
          <Button
            onClick={handleClearChat}
            variant="outline"
            className="flex items-center gap-2 hover:bg-destructive hover:text-destructive-foreground transition-colors"
          >
            <Trash2 className="h-4 w-4" />
            Clear Chat
          </Button>
        </div>
      </div>

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
            className={`group flex ${
              message.isUser ? "justify-end" : "justify-start"
            }`}
          >
            <div
              className={`max-w-[85%] p-4 rounded-2xl shadow-sm transition-all overflow-auto
                ${
                  message.isUser
                    ? "bg-primary text-primary-foreground ml-4"
                    : "bg-secondary hover:bg-secondary/90 text-secondary-foreground mr-4"
                }
              `}
            >
              <Markdown
                className={`prose ${
                  message.isUser ? "dark:prose-invert" : ""
                } max-w-none
                  ${
                    message.isUser
                      ? "text-primary-foreground"
                      : "text-secondary-foreground"
                  }
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
                          language={match[1]}
                          showLineNumbers
                          className="!mt-2 !mb-2 rounded-lg"
                        >
                          {String(children).replace(/\n$/, "")}
                        </SyntaxHighlighter>
                      </div>
                    ) : (
                      <code
                        {...props}
                        className={`${className} bg-opacity-75 rounded-md px-1`}
                      >
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

        <div ref={messagesEndRef} />
      </div>

      <div className="border-t border-border bg-background p-4">
        <div className="max-w-4xl mx-auto flex space-x-2">
          <div className="flex-1 relative">
            <Textarea
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={handleKeyDown}
              placeholder="Type your message... (Press Enter to send, Shift+Enter for new line)"
              className="resize-none pr-24 min-h-[48px] max-h-[200px] py-3 px-4 rounded-xl"
              disabled={isLoading}
            />
            <div className="absolute right-2 top-2 flex gap-2">
              {isLoading ? (
                <Button
                  onClick={handleCancel}
                  variant="destructive"
                  size="icon"
                  className="h-8 w-8"
                >
                  <X className="h-4 w-4" />
                </Button>
              ) : (
                <Button
                  onClick={handleSend}
                  className="h-8 w-8 p-0"
                  disabled={!input.trim()}
                >
                  {isLoading ? (
                    <Loader2 className="h-4 w-4 animate-spin" />
                  ) : (
                    <Send className="h-4 w-4" />
                  )}
                </Button>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
