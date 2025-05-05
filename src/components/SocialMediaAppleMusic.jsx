import React from 'react';
import { ReactComponent as AppleMusicIcon } from '../svg/apple_music.svg';
import SocialMediaButton from './SocialMediaButton';
import { SvgIcon } from '@mui/material';

function SocialMediaAppleMusic({ tooltipPlacement }) {
    return(
        <SocialMediaButton
            href="https://music.apple.com/us/artist/bird-strike/1800520296"
            tooltipText="Apple Music"
            tooltipPlacement={tooltipPlacement}
        >
            <SvgIcon component={AppleMusicIcon} sx={{ fontSize: 50 }} viewBox="0 0 50 50"/>
        </SocialMediaButton>
    )
}

export default SocialMediaAppleMusic;
