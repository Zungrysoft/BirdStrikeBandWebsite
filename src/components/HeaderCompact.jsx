import React from 'react';
import { Box, Stack, Tab, Tabs } from '@mui/material';

import { LIGHTNING } from '../config/colors';
import SocialMediaSpotify from './SocialMediaSpotify';
import SocialMediaAppleMusic from './SocialMediaAppleMusic';
import SocialMediaYouTube from './SocialMediaYouTube';
import SocialMediaInstagram from './SocialMediaInstagram';
import { Link, useLocation } from 'react-router-dom';

const images = require.context('../../public/images', true);

function HeaderCompact() {
    const location = useLocation();

    return(
        <Stack direction="column" justifyContent="center" alignItems="center" sx={{ padding: 2 }}>
            <Stack direction="row" justifyContent="center">
                <img src={images("./logo_small.png")} style={{
                    height: '100%',
                    aspectRatio: '1256 : 400',
                    maxHeight: '200px',
                    maxWidth: '100%',
                    display: 'block',
                    objectFit: 'contain',
                }}/>
            </Stack>
            <Stack direction="row" justifyContent="center">
                <SocialMediaInstagram/>
                <SocialMediaYouTube/>
                <SocialMediaSpotify/>
                <SocialMediaAppleMusic/>
            </Stack>
            <Box sx={{ color: LIGHTNING }}>
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
                        label="Music"
                        value="/discography"
                        component={Link}
                        to="/discography"
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
        </Stack>
    )
}

export default HeaderCompact;
