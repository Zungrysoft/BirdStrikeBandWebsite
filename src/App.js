import React,{useCallback, useState} from 'react';
import './App.css';

import { Box, ThemeProvider, useMediaQuery, useTheme } from '@mui/material';
import { THEME } from './config/theme.js';
import Main from './Main.js';

function App() {
    return (
        <ThemeProvider theme={THEME}>
            <Box className="App">
                <Main/>
            </Box>
        </ThemeProvider>
    );
}

export default App;
