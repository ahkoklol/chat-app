import { createTheme, ThemeProvider } from '@mui/material/styles';
import './App.css';
import { Outlet } from 'react-router-dom';
import Chat from './components/Chat';
import socket from './socket.ts';

const client = socket;

const theme = createTheme(); // Create the Material-UI theme

function App() {

  return (
    <ThemeProvider theme={theme}>
      <div>
          <div>
            <Outlet />
          </div>
          <Chat />
      </div>
    </ThemeProvider>
  );
}

export default App;