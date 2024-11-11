'use client';

import { useState, KeyboardEvent, useRef, useEffect } from 'react';
import { Send, Trash2, X, Loader2, CheckCircle2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import React from 'react';
import Markdown from 'react-markdown';
import rehypeRaw from 'rehype-raw';
import remarkGfm from 'remark-gfm';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { ModelLoadingProgress, startWebLLM } from '@/lib/webllm';
import { MLCEngine } from '@mlc-ai/web-llm';

interface ChatMessage {
  content: string;
  role: 'user' | 'assistant';
}

interface ChatConfig {
  mode: 'api' | 'webllm';
  model?: string; // for WebLLM
}

interface LoadingState {
  status: 'downloading' | 'ready' | 'error';
  progress: number;
}

function formatConversationHistory(messages: ChatMessage[]): string {
  return (
    messages
      .map((msg) => `${msg.role === 'user' ? 'Human' : 'Assistant'}: ${msg.content}`)
      .join('\n\n') + '\n\nAssistant:'
  );
}

async function getResponse(
  messages: ChatMessage[],
  chunksCallback: (content: string, isFirstChunk: boolean) => void,
  signal: AbortSignal
) {
  const conversationHistory = formatConversationHistory(messages);

  try {
    const response = await fetch('/api/generate', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        prompt: conversationHistory,
      }),
      signal, // Add abort signal to fetch request
    });

    if (!response.body) {
      throw new Error('No response body');
    }

    const reader = response.body.getReader();
    const decoder = new TextDecoder();
    let isFirstChunk = true;
    let accumulatedText = '';

    while (true) {
      const { done, value } = await reader.read();
      if (done) break;

      const text = decoder.decode(value);
      accumulatedText += text;
      chunksCallback(accumulatedText, isFirstChunk);
      isFirstChunk = false;
    }
  } catch (error: unknown) {
    if (error instanceof Error && error.name === 'AbortError') {
      throw new Error('Request cancelled');
    }
    console.error('Error in getResponse:', error);
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
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const chatContainerRef = useRef<HTMLDivElement>(null);
  const abortControllerRef = useRef<AbortController | null>(null);
  const [chatConfig, setChatConfig] = useState<ChatConfig>({ mode: 'api' });
  const [isWebLLMReady, setIsWebLLMReady] = useState(false);
  const [engine, setEngine] = useState<MLCEngine>();
  const [loadingState, setLoadingState] = useState<LoadingState>({
    status: 'downloading',
    progress: 0,
  });

  const scrollToBottom = () => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: 'smooth' });
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
        container.scrollHeight - container.scrollTop - container.clientHeight < 100;
      if (isNearBottom) {
        scrollToBottom();
      }
    };

    container.addEventListener('scroll', handleScroll);
    return () => container.removeEventListener('scroll', handleScroll);
  }, []);

  const handleClearChat = () => {
    setMessages([]);
    setInput('');
  };

  const handleCancel = () => {
    if (abortControllerRef.current) {
      abortControllerRef.current.abort();
      abortControllerRef.current = null;
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (chatConfig.mode === 'webllm') {
      const initWebLLM = async () => {
        try {
          setLoadingState({
            status: 'downloading',
            progress: 0,
          });

          const engine = await startWebLLM((progress) => {
            setLoadingState({
              status: 'downloading',
              progress: progress.progress,
            });
          });

          setIsWebLLMReady(true);
          setEngine(engine);
          setLoadingState({
            status: 'ready',
            progress: 100,
            // text: 'Model ready!',
          });

          // Hide the progress after 2 seconds when complete
          setTimeout(() => {
            setLoadingState((prev) => ({ ...prev, status: 'ready', text: '' }));
          }, 2000);
        } catch (error) {
          console.error('Failed to initialize WebLLM:', error);
          setChatConfig({ mode: 'api' });
          setLoadingState({
            status: 'error',
            progress: 0,
            // text: 'Failed to load model',
          });
        }
      };
      initWebLLM();
    }
  }, [chatConfig.mode]);

  const handleSend = async () => {
    const trimmedInput = input.trim();
    if (!trimmedInput || isLoading) return;

    setIsLoading(true);
    const userMessage: ChatMessage = { content: trimmedInput, role: 'user' };
    const updatedMessages = [...messages, userMessage];
    setMessages(updatedMessages);
    setInput('');

    abortControllerRef.current = new AbortController();

    try {
      setMessages((msgs) => [...msgs, { content: '', role: 'assistant' }]);

      if (chatConfig.mode === 'webllm' && engine) {
        // WebLLM mode
        const response = await engine.chat.completions.create({
          messages: updatedMessages,
          stream: true,
        });

        let isFirstChunk = true;
        let accumulatedText = '';

        for await (const chunk of response) {
          const text = chunk.choices[0]?.delta?.content || '';
          accumulatedText += text;

          setMessages((prev) => {
            const updatedMessages = [...prev];
            if (!isFirstChunk && updatedMessages.length > 0) {
              updatedMessages[updatedMessages.length - 1] = {
                content: accumulatedText,
                role: 'assistant',
              };
            }
            return updatedMessages;
          });
          isFirstChunk = false;
        }
      } else {
        // API mode (existing code)
        await getResponse(
          updatedMessages,
          (newText, isFirstChunk) => {
            setMessages((prev) => {
              const updatedMessages = [...prev];
              if (!isFirstChunk && updatedMessages.length > 0) {
                updatedMessages[updatedMessages.length - 1] = {
                  content: newText,
                  role: 'assistant',
                };
              }
              return updatedMessages;
            });
          },
          abortControllerRef.current.signal
        );
      }
    } catch (error) {
      console.error('Error getting AI response:', error);
      if (error instanceof Error && error.message === 'Request cancelled') {
        setMessages((prev) => prev.slice(0, -1)); // Remove the last empty message
      } else {
        setMessages((prev) => [
          ...prev,
          {
            content: 'Sorry, there was an error processing your request.',
            role: 'assistant',
          },
        ]);
      }
    } finally {
      setIsLoading(false);
      abortControllerRef.current = null;
    }
  };

  const handleKeyDown = (e: KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  return (
    <div className="flex flex-col h-screen max-w-4xl mx-auto bg-background">
      <div className="fixed top-0 left-0 right-0 bg-background border-b border-border z-10">
        <div className="max-w-4xl mx-auto p-4 flex justify-between items-center">
          <div className="flex items-center gap-4">
            <h1 className="text-2xl font-bold text-primary">AI Chat Assistant</h1>
            <select
              value={chatConfig.mode}
              onChange={(e) => setChatConfig({ mode: e.target.value as 'api' | 'webllm' })}
              className="border rounded px-2 py-1"
            >
              <option value="api">API Mode</option>
              <option value="webllm">WebLLM Mode</option>
            </select>
            {chatConfig.mode === 'webllm' && loadingState.progress && (
              <div className="fixed top-20 right-4 z-50 animate-in fade-in slide-in-from-top-4 duration-300">
                <div
                  className={`
                  flex items-center gap-3 px-4 py-3 rounded-lg shadow-lg
                  ${
                    loadingState.status === 'downloading'
                      ? 'bg-blue-500/10 border border-blue-500/20'
                      : ''
                  }
                  ${
                    loadingState.status === 'ready'
                      ? 'bg-green-500/10 border border-green-500/20'
                      : ''
                  }
                  ${loadingState.status === 'error' ? 'bg-red-500/10 border border-red-500/20' : ''}
                `}
                >
                  <div className="flex flex-col gap-1.5 min-w-[200px]">
                    <div className="flex justify-between items-center">
                      <span
                        className={`text-sm font-medium
                        ${loadingState.status === 'downloading' ? 'text-blue-500' : ''}
                        ${loadingState.status === 'ready' ? 'text-green-500' : ''}
                        ${loadingState.status === 'error' ? 'text-red-500' : ''}
                      `}
                      >
                        {loadingState.status === 'downloading'
                          ? 'Downloading Model'
                          : loadingState.status === 'ready'
                          ? 'Model Ready'
                          : 'Error'}
                      </span>
                      <span className="text-xs text-muted-foreground ml-2">
                        {Math.round(loadingState.progress)}%
                      </span>
                    </div>
                    <div className="h-2 w-full bg-secondary rounded-full overflow-hidden">
                      <div
                        className={`h-full transition-all duration-300 ease-in-out
                          ${loadingState.status === 'downloading' ? 'bg-blue-500' : ''}
                          ${loadingState.status === 'ready' ? 'bg-green-500' : ''}
                          ${loadingState.status === 'error' ? 'bg-red-500' : ''}
                        `}
                        style={{ width: `${loadingState.progress}%` }}
                      />
                    </div>
                    {/* <span className="text-sm text-muted-foreground">{loadingState.text}</span> */}
                  </div>
                  {loadingState.status === 'ready' && (
                    <CheckCircle2 className="h-5 w-5 text-green-500" />
                  )}
                </div>
              </div>
            )}
          </div>
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
            className={`group flex ${message.role === 'user' ? 'justify-end' : 'justify-start'}`}
          >
            <div
              className={`max-w-[85%] p-4 rounded-2xl shadow-sm transition-all overflow-auto
                ${
                  message.role === 'user'
                    ? 'bg-primary text-primary-foreground ml-4'
                    : 'bg-secondary hover:bg-secondary/90 text-secondary-foreground mr-4'
                }
              `}
            >
              <Markdown
                className={`prose ${message.role === 'user' ? 'dark:prose-invert' : ''} max-w-none
                  ${
                    message.role === 'user'
                      ? 'text-primary-foreground'
                      : 'text-secondary-foreground'
                  }
                `}
                rehypePlugins={[rehypeRaw]}
                remarkPlugins={[remarkGfm]}
                components={{
                  a: LinkRenderer,
                  code({ className, children, ...props }) {
                    const match = /language-(\w+)/.exec(className || '');
                    return match ? (
                      <div className="relative group">
                        <SyntaxHighlighter
                          language={match[1]}
                          showLineNumbers
                          className="!mt-2 !mb-2 rounded-lg"
                        >
                          {String(children).replace(/\n$/, '')}
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
                {message.content}
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
                  style={{ animationDelay: '0ms' }}
                />
                <div
                  className="w-2 h-2 bg-primary rounded-full animate-bounce"
                  style={{ animationDelay: '150ms' }}
                />
                <div
                  className="w-2 h-2 bg-primary rounded-full animate-bounce"
                  style={{ animationDelay: '300ms' }}
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
                <Button onClick={handleSend} className="h-8 w-8 p-0" disabled={!input.trim()}>
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
