import React,{useCallback, useState} from 'react';
import './App.css';

import { Box, Stack, useMediaQuery, useTheme } from '@mui/material';
import Header from './components/Header.jsx';
import MembersPage from './pages/MembersPage.jsx';
import HeaderCompact from './components/HeaderCompact.jsx';
import AboutPage from './pages/AboutPage.jsx';
import GalleryPage from './pages/GalleryPage.jsx';

const images = require.context('../public/images', true);

function Main() {
    const theme = useTheme();
    const isCompact = useMediaQuery(theme.breakpoints.down('sm'));
    const isLarge = useMediaQuery(theme.breakpoints.up('xxl'));
    const [selectedPage, setSelectedPage] = useState(0);

    const handleTabChange = useCallback((_, value) => {
        setSelectedPage(value)
    }, [setSelectedPage]);

    return (
        <Stack direction="row" sx={{ height: '100vh', width: '100vw', overflowY: 'auto', overflowX: 'clip' }}>
            {!isCompact && <Box sx={{ position: 'sticky', top: 0, height: '100vh', flex: 0 }}>
                <img src={images(isLarge ? "./posterslice1big.jpg" : "./posterslice1.jpg")} style={{ height: '100vh' }}/>
            </Box>}
            <Box sx={{ width: '100%', flex: 1, minWidth: 0 }}>
                {isCompact ?
                    <HeaderCompact tab={selectedPage} onChangeTab={handleTabChange}/> :
                    <Header tab={selectedPage} onChangeTab={handleTabChange}/>
                }
                {selectedPage === 0 && <AboutPage/>}
                {selectedPage === 1 && <GalleryPage/>}
                {selectedPage === 2 && <MembersPage/>}
            </Box>
            {!isCompact && <Box sx={{ position: 'sticky', top: 0, height: '100vh', flex: 0 }}>
                <img src={images(isLarge ? "./posterslice2big.jpg" : "./posterslice2.jpg")} style={{ height: '100vh' }}/>
            </Box>}
        </Stack>
    );
}

export default Main;
