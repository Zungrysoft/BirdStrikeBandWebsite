import React from 'react';
import { Box, Stack, Tab, Tabs } from '@mui/material';
import InstagramIcon from '@mui/icons-material/Instagram';
import YouTubeIcon from '@mui/icons-material/YouTube';
import { SvgIcon } from '@mui/material';
import { ReactComponent as SpotifyIcon } from '../spotify-icon.svg';
import SocialMediaButton from './SocialMediaButton';
import { LIGHTNING } from '../config/colors';

const images = require.context('../../public/images', true);

function Header({ project }) {
    return(
        <Box sx={{ flex: 1, minWidth: 0, color: LIGHTNING }}>
            <Stack direction="row" justifyContent="center" sx={{ padding: 2, height: '200px' }}>
                <Stack direction="column" justifyContent="space-evenly" alignItems="center" sx={{ padding: 3 }}>
                    <SocialMediaButton href="https://www.instagram.com/birdstrike.band/">
                        <InstagramIcon sx={{ fontSize: 50 }} />
                    </SocialMediaButton>
                    <SocialMediaButton href="https://www.youtube.com/@BirdStrike-Music">
                        <YouTubeIcon sx={{ fontSize: 50 }} />
                    </SocialMediaButton>
                </Stack>
                <img src={images("./logo.png")} style={{ flex: 0, height: '100%' }}/>
                <Stack direction="column" justifyContent="space-evenly" alignItems="center" sx={{ padding: 3 }}>
                    <SocialMediaButton href="https://open.spotify.com/artist/2LUg9x87S4NoaASrjvDWMY?si=CdX8ZsARRkSQ1BGZS8ugMw">
                        <SvgIcon component={SpotifyIcon} sx={{ fontSize: 50 }} viewBox="0 0 64 64"/>
                    </SocialMediaButton>
                </Stack>
            </Stack>
            <Box>
                <Tabs
                    textColor="secondary"
                    indicatorColor="secondary"
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
