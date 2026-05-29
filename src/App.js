import React,{useCallback, useState} from 'react';
import './App.css';

import { Box, ThemeProvider, useMediaQuery, useTheme } from '@mui/material';
import { THEME } from './config/theme.js';
import Main from './Main.js';
import { BrowserRouter } from 'react-router-dom';

function App() {
    return (
        <ThemeProvider theme={THEME}>
            <BrowserRouter>
                <Box className="App">
                    <Main/>
                </Box>
            </BrowserRouter>
        </ThemeProvider>
    );
}

export default App;
