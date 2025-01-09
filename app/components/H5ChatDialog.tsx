'use client'
import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FaPaperPlane } from 'react-icons/fa';
import { BiLoaderAlt } from 'react-icons/bi';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import { Inter, Roboto_Mono } from 'next/font/google';

const inter = Inter({ 
  subsets: ['latin'],
  weight: ['400', '700']
});
const roboto_mono = Roboto_Mono({ subsets: ['latin'] });

const exampleQuestions = [
  "What's on today's lunch menu?",
  "What are notable alumni of H5?",
  "what is female visiting policy?",
  "Why is H5 called penthouse?"
];


let sessionMessages = [
  { 
    role: 'ai', 
    content: "👋 Hi! I'm your H5 assistant. Note: Please verify important information with hostel staff." 
  }
];

const ThinkingAnimation = () => {
  const [elapsedTime, setElapsedTime] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setElapsedTime(prev => prev + 0.1);
    }, 100);

    return () => clearInterval(timer);
  }, []);

  return (
    <div className={inter.className} style={{ 
      display: 'inline-flex', 
      alignItems: 'center',
      gap: '8px',
      color: '#66fcf1',
      fontSize: '14px',
      fontFamily: 'inherit'
    }}>
      <BiLoaderAlt className="thinking-icon" style={{
        animation: 'spin 1s linear infinite'
      }} />
      <span>Thinking{Array(Math.floor(elapsedTime % 4)).fill('.').join('')}</span>
      <span style={{ opacity: 0.7 }}>({elapsedTime.toFixed(1)}s)</span>
    </div>
  );
};

const MessageContent = ({ content, sources }: { 
  content: string, 
  sources?: Array<{url: string, title: string}> 
}) => (
  <div className={inter.className} style={{ 
    display: 'flex', 
    flexDirection: 'column', 
    gap: '8px'
  }}>
    <ReactMarkdown 
      remarkPlugins={[remarkGfm]}
      components={{
        p: ({ children }) => <p style={{ margin: '4px 0', lineHeight: '1.5' }}>{children}</p>,
        a: ({ href, children }) => (
          <a 
            href={href} 
            target="_blank" 
            rel="noopener noreferrer"
            style={{ color: '#66fcf1', textDecoration: 'underline' }}
          >
            {children}
          </a>
        ),
        ul: ({ children }) => (
          <ul style={{ marginLeft: '20px', marginTop: '8px' }}>{children}</ul>
        ),
        li: ({ children }) => (
          <li style={{ margin: '4px 0' }}>{children}</li>
        ),
        code: ({ children }) => (
          <code className={roboto_mono.className} style={{ 
            backgroundColor: '#1f1f1f',
            padding: '2px 4px',
            borderRadius: '4px'
          }}>
            {children}
          </code>
        )
      }}
    >
      {content}
    </ReactMarkdown>
    
    {sources && sources.length > 0 && (
      <div style={{ 
        marginTop: '12px',
        fontSize: '12px',
        opacity: 0.8,
        display: 'flex',
        flexDirection: 'column',
        gap: '4px'
      }}>
        <span style={{ color: '#66fcf1' }}>Sources:</span>
        {sources.map((source, index) => (
          <a
            key={index}
            href={source.url}
            target="_blank"
            rel="noopener noreferrer"
            style={{ 
              color: '#66fcf1',
              textDecoration: 'underline',
              '&:hover': {
                opacity: 0.8
              }
            }}
          >
            {source.url}
          </a>
        ))}
      </div>
    )}
  </div>
);

const SendButton = ({ onClick, disabled }: { onClick: () => void, disabled: boolean }) => {
  const isMobile = window.innerWidth <= 768; // Check for mobile viewport
  
  return (
    <button 
      onClick={onClick}
      disabled={disabled}
      style={{
        padding: isMobile ? '12px' : '12px 20px',
        backgroundColor: '#66fcf1',
        color: '#000033',
        border: 'none',
        borderRadius: '25px',
        cursor: 'pointer',
        fontSize: '16px',
        display: 'flex',
        alignItems: 'center',
        gap: '8px',
        opacity: disabled ? 0.7 : 1,
        transition: 'all 0.3s ease',
        minWidth: isMobile ? '44px' : 'auto',
        justifyContent: 'center'
      }}
    >
      {!isMobile && <span>Send</span>}
      <FaPaperPlane size={16} />
    </button>
  );
};

const H5ChatDialog = ({ onClose }: { onClose: () => void }) => {
  const [query, setQuery] = useState('');
  // Use session messages instead of creating new state each time
  const [messages, setMessages] = useState(sessionMessages);
  const [isInitialState, setIsInitialState] = useState(sessionMessages.length === 1);
  const [isThinking, setIsThinking] = useState(false);
  const chatContainerRef = useRef<HTMLDivElement>(null);
  const lastMessageRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (messages.length > 1 && lastMessageRef.current) {
      lastMessageRef.current.scrollIntoView({ behavior: 'smooth' });
    }
    
    sessionMessages = messages;
  }, [messages]);

  
  useEffect(() => {
    const style = document.createElement('style');
    style.textContent = `
      @keyframes spin {
        from { transform: rotate(0deg); }
        to { transform: rotate(360deg); }
      }
    `;
    document.head.appendChild(style);
    return () => document.head.removeChild(style);
  }, []);

  const handleSearch = async (exampleQuery: string | null = null) => {
    const searchQuery = exampleQuery || query;
    if (!searchQuery?.trim()) return;
    
    setIsInitialState(false);
    setMessages(prev => [...prev, { role: 'user', content: searchQuery }]);
    setQuery('');
    setIsThinking(true);

    try {
      const response = await fetch('http://localhost:8000/query', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          query: searchQuery
        })
      });

      if (!response.ok) {
        throw new Error('Network response was not ok');
      }

      const data = await response.json();
     
      const uniqueSources = data.sources.filter((source: any, index: number, self: any[]) =>
        index === self.findIndex((s) => s.url === source.url)
      );

      const aiMessage = { 
        role: 'ai', 
        content: data.response,
        sources: uniqueSources 
      };
      setMessages(prev => [...prev, aiMessage]);
      
    } catch (error) {
      console.error('Error:', error);
      const aiMessage = { 
        role: 'ai', 
        content: "Sorry, I'm having trouble connecting right now. Please try again later." 
      };
      setMessages(prev => [...prev, aiMessage]);
    } finally {
      setIsThinking(false);
    }
  };

  return (
    <>
      {/* Backdrop overlay */}
      <div
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          width: '100vw',
          height: '100vh',
          backgroundColor: 'rgba(0, 0, 0, 0.5)',
          backdropFilter: 'blur(4px)',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          zIndex: 999
        }}
        onClick={onClose}
      >
        {/* Chat Dialog */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.95 }}
          style={{
            width: '90%',
            maxWidth: '900px',
            height: '90vh',
            maxHeight: '600px',
            backgroundColor: '#000033',
            borderRadius: '15px',
            padding: '20px',
            display: 'flex',
            flexDirection: 'column',
            boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
            zIndex: 1000,
            margin: '20px',
            '@media (max-width: 768px)': {
              padding: '15px',
              margin: '10px'
            }
          }}
          onClick={(e) => e.stopPropagation()}
        >
          <div style={{ 
            fontFamily: 'inherit',
            fontSize: '16px',
            fontWeight: 'bold',
            display: 'flex', 
            justifyContent: 'space-between', 
            alignItems: 'center', 
            marginBottom: '20px',
            color: '#66fcf1'
          }}>
            <h2 className={inter.className} style={{ 
              margin: 0,
              fontWeight: 700,
              fontSize: '24px',
              letterSpacing: '-0.02em'
            }}>ASK H5 AI</h2>
            <button 
              onClick={onClose} 
              style={{ 
                background: 'none', 
                border: 'none', 
                fontSize: '24px', 
                cursor: 'pointer',
                color: '#ffffff'
              }}
            >×</button>
          </div>

          {/* Chat messages container */}
          <div 
            ref={chatContainerRef}
            style={{ 
              flexGrow: 1, 
              overflowY: 'auto', 
              marginBottom: '20px',
              
              '&::-webkit-scrollbar': {
                display: 'none'
              },
             
              msOverflowStyle: 'none',
              scrollbarWidth: 'none'
            }}
          >
            <AnimatePresence>
              {messages.map((message, index) => (
                <motion.div
                  key={index}
                  ref={index === messages.length - 1 ? lastMessageRef : null}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ duration: 0.3, ease: 'easeOut' }}
                  style={{
                    marginBottom: '15px',
                    textAlign: message.role === 'user' ? 'right' : 'left',
                    padding: '8px 0'
                  }}
                >
                  <div style={{
                    display: 'inline-block',
                    maxWidth: '80%',
                    color: message.role === 'user' ? '#000033' : '#ffffff'
                  }}>
                    {message.role === 'user' ? (
                      <div style={{
                        backgroundColor: '#66fcf1',
                        padding: '10px 15px',
                        borderRadius: '18px',
                      }}>
                        {message.content}
                      </div>
                    ) : (
                      <MessageContent 
                        content={message.content} 
                        sources={message.sources}
                      />
                    )}
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>

            {isInitialState && (
              <div style={{ marginTop: '20px' }}>
                <p className={inter.className} style={{ 
                  fontWeight: 700,
                  fontSize: '16px',
                  color: '#66fcf1', 
                  marginBottom: '10px',
                  letterSpacing: '-0.02em'
                }}>
                  EXAMPLE QUESTIONS
                </p>
                {exampleQuestions.map((question, index) => (
                  <div
                    key={index}
                    onClick={() => handleSearch(question)}
                    style={{
                      display: 'flex',
                      width: 'fit-content',
                      padding: '10px 15px',
                      margin: '5px 0',
                      backgroundColor: '#2b303c',
                      borderRadius: '18px',
                      cursor: 'pointer',
                      transition: 'background-color 0.3s',
                      color: '#ffffff'
                    }}
                  >
                    {question}
                  </div>
                ))}
              </div>
            )}

            {isThinking && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                ref={lastMessageRef}
                style={{ textAlign: 'left', marginTop: '10px' }}
              >
                <ThinkingAnimation />
              </motion.div>
            )}
          </div>

          {/* Input area */}
          <div style={{ display: 'flex', gap: '10px' }}>
            <input
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && handleSearch()}
              placeholder="Ask about mess, events, facilities..."
              className={inter.className}
              style={{ 
                flexGrow: 1, 
                padding: '12px 20px', 
                borderRadius: '25px', 
                border: '1px solid #66fcf1',
                backgroundColor: '#1f1f1f',
                color: '#ffffff',
                fontSize: '16px',
                '@media (max-width: 768px)': {
                  padding: '12px 15px',
                  fontSize: '14px'
                }
              }}
              disabled={isThinking}
            />
            <SendButton 
              onClick={() => handleSearch()}
              disabled={isThinking || !query.trim()}
            />
          </div>
        </motion.div>
      </div>
    </>
  );
};

export default H5ChatDialog;