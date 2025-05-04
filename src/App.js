import React,{useCallback, useState} from 'react';
import './App.css';

import { Box, Stack, Tab, Tabs, ThemeProvider } from '@mui/material';
import { THEME } from './config/theme.js';
import Header from './components/Header.jsx';

const images = require.context('../public/images', true);

function App() {
    const [selectedPage, setSelectedPage] = useState(0);

    const handleTabChange = useCallback((_, value) => {
        setSelectedPage(value)
    }, [setSelectedPage]);

    return (
        <ThemeProvider theme={THEME}>
            <Box className="App">
                <Stack direction="row" sx={{ height: '100vh', width: '100vw' }}>
                    <img src={images("./posterslice1.png")} style={{ height: '100%' }}/>
                    <Header tab={selectedPage} onChangeTab={handleTabChange}/>
                    <img src={images("./posterslice2.png")} style={{ height: '100%' }}/>
                </Stack>
            </Box>
        </ThemeProvider>
    );
}

export default App;
