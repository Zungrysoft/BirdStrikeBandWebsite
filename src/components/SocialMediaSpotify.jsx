import React from 'react';
import { ReactComponent as SpotifyIcon } from '../svg/spotify.svg';
import SocialMediaButton from './SocialMediaButton';
import { SvgIcon } from '@mui/material';
import { URL_SPOTIFY } from '../helpers/socialMedia';

function SocialMediaSpotify({ tooltipPlacement, size=50 }) {
    return(
        <SocialMediaButton
            href={URL_SPOTIFY}
            tooltipText="Spotify"
            tooltipPlacement={tooltipPlacement}
        >
            <SvgIcon component={SpotifyIcon} sx={{ fontSize: size }} viewBox="0 0 64 64" />
        </SocialMediaButton>
    )
}

export default SocialMediaSpotify;
