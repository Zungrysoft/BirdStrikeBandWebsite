import React from 'react';
import { ReactComponent as SpotifyIcon } from '../svg/spotify.svg';
import SocialMediaButton from './SocialMediaButton';
import { SvgIcon } from '@mui/material';

function SocialMediaSpotify({ tooltipPlacement }) {
    return(
        <SocialMediaButton
            href="https://open.spotify.com/artist/2LUg9x87S4NoaASrjvDWMY?si=CdX8ZsARRkSQ1BGZS8ugMw"
            tooltipText="Spotify"
            tooltipPlacement={tooltipPlacement}
        >
            <SvgIcon component={SpotifyIcon} sx={{ fontSize: 50 }} viewBox="0 0 64 64" />
        </SocialMediaButton>
    )
}

export default SocialMediaSpotify;
