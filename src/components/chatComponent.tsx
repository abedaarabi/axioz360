"use client";

import { useState } from "react";
import { Send } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import React from "react";
import Markdown from "react-markdown";
import rehypeRaw from "rehype-raw";
import remarkGfm from "remark-gfm";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { a11yDark } from "react-syntax-highlighter/dist/esm/styles/hljs";

export default function ChatComponent() {
  const [messages, setMessages] = useState<{ text: string; isUser: boolean }[]>(
    [
      {
        isUser: false,
        text: `
\`\`\`javascript
// Sample JavaScript code block
function greet(name) {
  return \`Hello, \${name}!\`;
}
console.log(greet('World'));
\`\`\`

| Column 1 | Column 2 | Column 3 |
|----------|----------|----------|
|   Row 1  |   Row 1  |   Row 1  |
|   Row 2  |   Row 2  |   Row 2  |
      `,
      },
    ]
  );
  const [input, setInput] = useState("");

  const handleSend = () => {
    if (input.trim()) {
      setMessages([...messages, { text: input, isUser: true }]);
      // Simulate bot response
      setTimeout(() => {
        setMessages((prev) => [
          ...prev,
          { text: "<h2>This is a simulated response.,</h2>", isUser: false },
        ]);
      }, 1000);
      setInput("");
    }
  };

  return (
    <div className="flex flex-col h-screen w-[80%] m-auto bg-background">
      <div className="flex-1 overflow-y-auto p-4 space-y-4 mt-24 rounded-sm bg-slate-50">
        {messages.map((message, index) => (
          <div
            key={index}
            className={`max-w-[80%] p-3 rounded-lg ${
              message.isUser
                ? "ml-auto bg-primary text-primary-foreground"
                : "bg-secondary text-secondary-foreground"
            }`}
          >
            <Markdown
              className="pl-8  mb-4 text-base max-sm:text-sm  prose dark:prose-invert"
              rehypePlugins={[rehypeRaw]}
              remarkPlugins={[remarkGfm]}
              // eslint-disable-next-line react/no-children-prop
              children={message.text}
              components={{
                a: LinkRenderer,

                code(props) {
                  const { children, className, ...rest } = props;

                  const match = /language-(\w+)/.exec(className || "");
                  return match ? (
                    <SyntaxHighlighter
                      {...rest}
                      PreTag="div"
                      // eslint-disable-next-line react/no-children-prop
                      children={String(children).replace(/\n$/, "")}
                      //@ts-ignore
                      language={match}
                      showLineNumbers
                    />
                  ) : (
                    <code {...rest} className={className}>
                      {children}
                    </code>
                  );
                },
              }}
            />
            {message.text}
          </div>
        ))}
      </div>
      <div className="border-t border-border p-4">
        <div className="flex space-x-2">
          <Textarea
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Type your message..."
            className="flex-1 resize-none"
            rows={1}
          />
          <Button
            onClick={handleSend}
            className="bg-primary text-primary-foreground"
          >
            <Send className="h-4 w-4" />
            <span className="sr-only">Send</span>
          </Button>
        </div>
      </div>
    </div>
  );
}
function LinkRenderer(props: any) {
  console.log({ props });
  return (
    <a
      href={props.href}
      target="_blank"
      rel="noreferrer"
      className=" underline font-sans"
    >
      {props.href}
    </a>
  );
}
