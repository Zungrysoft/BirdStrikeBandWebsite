import React from 'react';
import { Box, Stack, Tab, Tabs } from '@mui/material';

import { LIGHTNING } from '../config/colors';
import SocialMediaSpotify from './SocialMediaSpotify';
import SocialMediaAppleMusic from './SocialMediaAppleMusic';
import SocialMediaYouTube from './SocialMediaYouTube';
import SocialMediaInstagram from './SocialMediaInstagram';

const images = require.context('../../public/images', true);

function Header({ tab, onChangeTab }) {
    return(
        <Box sx={{ color: LIGHTNING, position: 'relative', width: '100%' }}>
            <Stack direction="row" justifyContent="center" sx={{ padding: 2 }}>
                <Stack direction="column" justifyContent="space-evenly" alignItems="center" sx={{ padding: 3 }}>
                    <SocialMediaInstagram tooltipPlacement='left'/>
                    <SocialMediaYouTube tooltipPlacement='left'/>
                </Stack>
                <Box>
                    <img src={images("./logo.png")} style={{
                        height: '100%',
                        maxHeight: '200px',
                        maxWidth: '100%',
                        display: 'block',
                        objectFit: 'contain',
                    }}/>
                </Box>
                <Stack direction="column" justifyContent="space-evenly" alignItems="center" sx={{ padding: 3 }}>
                    <SocialMediaSpotify tooltipPlacement='right'/>
                    <SocialMediaAppleMusic tooltipPlacement='right'/>
                </Stack>
            </Stack>
            <Box sx={{ position: 'absolute', left: '50%', transform: 'translate(-50%, -60px)' }}>
                <Tabs
                    textColor="inherit"
                    value={tab}
                    onChange={onChangeTab}
                    centered
                >
                    <Tab label="About"/>
                    <Tab label="Music"/>
                    <Tab label="Members"/>
                </Tabs>
            </Box>
        </Box>
    )
}

export default Header;
