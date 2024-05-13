import React, { useState, useEffect } from 'react';
import { io, Socket } from 'socket.io-client';
import { IconButton, Drawer, TextField, Button, List, ListItem, ListItemText, Typography } from '@mui/material';
import ChatIcon from '@mui/icons-material/Chat';

const socket: Socket = io('http://localhost:3000'); // Ensure this matches your backend

const Chat: React.FC = () => {
  const [open, setOpen] = useState(false);
  const [username, setUsername] = useState('');
  const [message, setMessage] = useState('');
  const [messages, setMessages] = useState<Array<{ user: string; text: string }>>([]);

  useEffect(() => {
    socket.on('chat message', (msg) => {
      setMessages(prevMessages => [...prevMessages, msg]);
    });

    return () => {
      socket.off('chat message');
    };
  }, []);

  const handleToggleChat = () => setOpen(!open);

  const sendMessage = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (message && username) {
      socket.emit('chat message', { user: username, text: message });
      setMessage('');
    }
  };

  return (
    <>
      <IconButton onClick={handleToggleChat} color="primary" aria-label="chat">
        <ChatIcon />
      </IconButton>
      <Drawer anchor="right" open={open} onClose={handleToggleChat}>
        <div style={{ width: '350px', padding: '20px' }}>
          <Typography>General Chat</Typography>
          <TextField
            label="Username"
            type="text"
            value={username}
            onChange={e => setUsername(e.target.value)}
            variant="outlined"
            fullWidth
            margin="normal"
          />
          <List>
            {messages.map((msg, index) => (
              <ListItem key={index}>
                <ListItemText primary={`${msg.user}: ${msg.text}`} />
              </ListItem>
            ))}
          </List>
          <form onSubmit={sendMessage} style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
            <TextField
              label="Message"
              type="text"
              value={message}
              onChange={e => setMessage(e.target.value)}
              variant="outlined"
              fullWidth
            />
            <Button type="submit" color="primary" variant="contained">Send</Button>
          </form>
        </div>
      </Drawer>
    </>
  );
};

export default Chat;