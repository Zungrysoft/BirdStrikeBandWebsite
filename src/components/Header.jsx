import React from 'react';
import { Box, Stack, Tab, Tabs } from '@mui/material';
import InstagramIcon from '@mui/icons-material/Instagram';
import YouTubeIcon from '@mui/icons-material/YouTube';
import { SvgIcon } from '@mui/material';
import { ReactComponent as SpotifyIcon } from '../svg/spotify.svg';
import { ReactComponent as AppleMusicIcon } from '../svg/apple_music.svg';
import SocialMediaButton from './SocialMediaButton';
import { LIGHTNING } from '../config/colors';

const images = require.context('../../public/images', true);

function Header({ tab, onChangeTab }) {
    return(
        <Box sx={{ color: LIGHTNING, position: 'relative', width: '100%' }}>
            <Stack direction="row" justifyContent="center" sx={{ padding: 2 }}>
                <Stack direction="column" justifyContent="space-evenly" alignItems="center" sx={{ padding: 3 }}>
                    <SocialMediaButton
                        href="https://www.instagram.com/birdstrike.band/"
                        titleText="Instagram"
                    >
                        <InstagramIcon sx={{ fontSize: 50 }} />
                    </SocialMediaButton>
                    <SocialMediaButton
                        href="https://www.youtube.com/@BirdStrike-Music"
                        titleText="YouTube"
                    >
                        <YouTubeIcon sx={{ fontSize: 50 }} />
                    </SocialMediaButton>
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
                    <SocialMediaButton
                        href="https://open.spotify.com/artist/2LUg9x87S4NoaASrjvDWMY?si=CdX8ZsARRkSQ1BGZS8ugMw"
                        titleText="Spotify"
                        side="right"
                    >
                        <SvgIcon component={SpotifyIcon} sx={{ fontSize: 50 }} viewBox="0 0 64 64" />
                    </SocialMediaButton>
                    <SocialMediaButton
                        href="https://music.apple.com/us/artist/bird-strike/1800520296"
                        titleText="Apple Music"
                        side="right"
                    >
                        <SvgIcon component={AppleMusicIcon} sx={{ fontSize: 50 }} viewBox="0 0 50 50"/>
                    </SocialMediaButton>
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
