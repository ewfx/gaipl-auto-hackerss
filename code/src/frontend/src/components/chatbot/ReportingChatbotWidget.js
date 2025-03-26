import React, { useState, useRef, useEffect } from 'react';
import { v4 as uuidv4 } from 'uuid';
import { Dialog, DialogContent, DialogTitle, IconButton, Tooltip } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import OpenInNewIcon from '@mui/icons-material/OpenInNew';
import { generateDetailedDescription } from '../../utilities/helper';


const ReportingChatbotWidget = ({ incidents, reportingdata }) => {
  const [collapsed, setCollapsed] = useState(true);
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState([
    {
      sender: 'bot',
      text: 'Hello! I am your reporting assistant. How can I help you today?'
    }
  ]);
  const [userInput, setUserInput] = useState('');
  const messagesEndRef = useRef(null);
  const chatID = useRef(uuidv4());

  const toggleCollapsed = () => setCollapsed(!collapsed);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  useEffect(() => {
    if (!collapsed && messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [messages, collapsed]);

  const handleSend = async () => {
    const trimmedInput = userInput.trim();
    if (!trimmedInput) return;

    const userMessage = { sender: 'user', text: trimmedInput };
    setMessages((prev) => [...prev, userMessage]);
    setUserInput('');

    const messagesForBackend = [
      { role: "user", content: trimmedInput }
    ];

    try {
      const response = await fetch("http://localhost:8000/api/reportingchat", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({ chatid: chatID.current, messages: messagesForBackend, incidents: incidents , reportingdata: JSON.stringify(reportingdata) })
      });

      const data = await response.json();
      let botReply = "";
      if (data && data.reply) {
        botReply = typeof data.reply === 'string' ? data.reply : JSON.stringify(data.reply);
      } else {
        botReply = "I'm sorry, I couldn't process your request.";
      }
      setMessages((prev) => [...prev, { sender: 'bot', text: botReply }]);
    } catch (error) {
      console.error("Error calling FastAPI:", error);
      setMessages((prev) => [
        ...prev,
        { sender: 'bot', text: "Error: Unable to retrieve a response from our reporting assistant." }
      ]);
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      handleSend();
    }
  };

  return (
    <>
      <div
        style={{
          position: "fixed",
          bottom: "20px",
          right: "20px",
          width: collapsed ? "200px" : "350px",
          height: collapsed ? "60px" : "450px",
          boxShadow: "0 0 10px rgba(0,0,0,0.3)",
          borderRadius: "10px",
          background: "#fff",
          transition: "all 0.3s ease",
          zIndex: 1000,
          overflow: "hidden"
        }}
      >
        <div
          onClick={toggleCollapsed}
          style={{
            background: "#4e8bed",
            color: "#fff",
            padding: "10px",
            fontWeight: "bold",
            cursor: "pointer",
            textAlign: "center",
            fontSize: "16px",
            whiteSpace: "nowrap",
            display: "flex",
            alignItems: "center",
            justifyContent: "center"
          }}
        >
          {collapsed ? "Reporting ChatBot" : "Reporting Assistant"}
        </div>

        {!collapsed && (
          <div style={{ display: "flex", flexDirection: "column", height: "calc(100% - 40px)" }}>
            <div
              style={{
                flex: 1,
                padding: "10px",
                overflowY: "auto",
                borderBottom: "1px solid #eee"
              }}
            >
              {messages.map((msg, index) => (
                <div
                  key={index}
                  style={{
                    marginBottom: "8px",
                    textAlign: msg.sender === "bot" ? "left" : "right"
                  }}
                >
                  <span
                    style={{
                      display: "inline-block",
                      padding: "8px",
                      borderRadius: "8px",
                      background: msg.sender === "bot" ? "#f0f0f0" : "#4e8bed",
                      color: msg.sender === "bot" ? "#000" : "#fff",
                      maxWidth: "80%"
                    }}
                  >
                    {msg.text}
                  </span>
                </div>
              ))}
              <div ref={messagesEndRef} />
            </div>
            <div style={{ display: "flex", padding: "10px", alignItems: "center" }}>
              <input
                type="text"
                placeholder="Type your message..."
                value={userInput}
                onChange={(e) => setUserInput(e.target.value)}
                onKeyDown={handleKeyDown}
                style={{
                  flex: 1,
                  padding: "8px",
                  borderRadius: "4px",
                  border: "1px solid #ccc"
                }}
              />
              <button
                onClick={handleSend}
                style={{
                  marginLeft: "10px",
                  padding: "8px 12px",
                  backgroundColor: "#4e8bed",
                  color: "#fff",
                  border: "none",
                  borderRadius: "4px",
                  cursor: "pointer"
                }}
              >
                Send
              </button>
              <Tooltip title="Open in Popup">
                <IconButton
                  onClick={handleOpen}
                  style={{
                    marginLeft: "10px",
                    padding: "8px 12px",
                    backgroundColor: "#4e8bed",
                    color: "#fff",
                    border: "none",
                    borderRadius: "4px",
                    cursor: "pointer"
                  }}
                >
                  <OpenInNewIcon style={{ backgroundColor: 'black', borderRadius: '4px' }} />
                </IconButton>
              </Tooltip>
            </div>
          </div>
        )}
      </div>

      <Dialog open={open} onClose={handleClose} fullWidth maxWidth="md">
        <DialogTitle>
          Reporting Assistant
          <IconButton
            aria-label="close"
            onClick={handleClose}
            style={{ position: 'absolute', right: 8, top: 8, color: '#000' }}
          >
            <CloseIcon />
          </IconButton>
        </DialogTitle>
        <DialogContent dividers>
          <div style={{ display: "flex", flexDirection: "column", height: "400px" }}>
            <div
              style={{
                flex: 1,
                padding: "10px",
                overflowY: "auto",
                borderBottom: "1px solid #eee"
              }}
            >
              {messages.map((msg, index) => (
                <div
                  key={index}
                  style={{
                    marginBottom: "8px",
                    textAlign: msg.sender === "bot" ? "left" : "right"
                  }}
                >
                  <span
                    style={{
                      display: "inline-block",
                      padding: "8px",
                      borderRadius: "8px",
                      background: msg.sender === "bot" ? "#f0f0f0" : "#4e8bed",
                      color: msg.sender === "bot" ? "#000" : "#fff",
                      maxWidth: "80%"
                    }}
                  >
                    {msg.text}
                  </span>
                </div>
              ))}
              <div ref={messagesEndRef} />
            </div>
            <div style={{ display: "flex", padding: "10px", alignItems: "center" }}>
              <input
                type="text"
                placeholder="Type your message..."
                value={userInput}
                onChange={(e) => setUserInput(e.target.value)}
                onKeyDown={handleKeyDown}
                style={{
                  flex: 1,
                  padding: "8px",
                  borderRadius: "4px",
                  border: "1px solid #ccc"
                }}
              />
              <button
                onClick={handleSend}
                style={{
                  marginLeft: "10px",
                  padding: "8px 12px",
                  backgroundColor: "#4e8bed",
                  color: "#fff",
                  border: "none",
                  borderRadius: "4px",
                  cursor: "pointer"
                }}
              >
                Send
              </button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default ReportingChatbotWidget;