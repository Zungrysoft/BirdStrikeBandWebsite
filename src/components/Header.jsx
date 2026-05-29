import React from 'react';
import { Box, Stack, Tab, Tabs } from '@mui/material';

import { LIGHTNING } from '../config/colors';
import SocialMediaSpotify from './SocialMediaSpotify';
import SocialMediaAppleMusic from './SocialMediaAppleMusic';
import SocialMediaYouTube from './SocialMediaYouTube';
import SocialMediaInstagram from './SocialMediaInstagram';
import { Link, useLocation } from 'react-router-dom';

const images = require.context('../../public/images', true);

function Header() {
    const location = useLocation();

    return(
        <Box sx={{ color: LIGHTNING, position: 'relative', width: '100%' }}>
            <Stack direction="row" justifyContent="center" sx={{ padding: 2 }}>
                <Stack direction="column" justifyContent="space-evenly" alignItems="center" sx={{ padding: 3 }}>
                    <SocialMediaInstagram tooltipPlacement='left'/>
                    <SocialMediaYouTube tooltipPlacement='left'/>
                </Stack>
                <Box>
                    <img src={images("./logo_small.png")} style={{
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
                    value={location.pathname}
                    textColor="inherit"
                    indicatorColor="secondary"
                    centered
                >
                    <Tab
                        label="About"
                        value="/"
                        component={Link}
                        to="/"
                    />

                    <Tab
                        label="Gallery"
                        value="/gallery"
                        component={Link}
                        to="/gallery"
                    />

                    <Tab
                        label="Members"
                        value="/members"
                        component={Link}
                        to="/members"
                    />
                </Tabs>
            </Box>
        </Box>
    )
}

export default Header;
