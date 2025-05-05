import React from 'react';
import { ReactComponent as AppleMusicIcon } from '../svg/apple_music.svg';
import SocialMediaButton from './SocialMediaButton';
import { SvgIcon } from '@mui/material';
import { URL_APPLE_MUSIC } from '../helpers/socialMedia';

function SocialMediaAppleMusic({ tooltipPlacement, size=50 }) {
    return(
        <SocialMediaButton
            href={URL_APPLE_MUSIC}
            tooltipText="Apple Music"
            tooltipPlacement={tooltipPlacement}
        >
            <SvgIcon component={AppleMusicIcon} sx={{ fontSize: size }} viewBox="0 0 50 50"/>
        </SocialMediaButton>
    )
}

export default SocialMediaAppleMusic;
