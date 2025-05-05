import React from 'react';
import { Box, Stack, Tab, Tabs } from '@mui/material';

import { LIGHTNING } from '../config/colors';
import SocialMediaSpotify from './SocialMediaSpotify';
import SocialMediaAppleMusic from './SocialMediaAppleMusic';
import SocialMediaYouTube from './SocialMediaYouTube';
import SocialMediaInstagram from './SocialMediaInstagram';

const images = require.context('../../public/images', true);

function HeaderCompact({ tab, onChangeTab }) {
    return(
        <Stack direction="column" justifyContent="center" alignItems="center" sx={{ padding: 2 }}>
            <Stack direction="row" justifyContent="center">
                <img src={images("./logo.png")} style={{
                    height: '100%',
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
        </Stack>
    )
}

export default HeaderCompact;
