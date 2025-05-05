import React from 'react';
import SocialMediaButton from './SocialMediaButton';
import YouTubeIcon from '@mui/icons-material/YouTube';
import { URL_YOUTUBE } from '../helpers/socialMedia';

function SocialMediaYouTube({ tooltipPlacement, size=50 }) {
    return(
        <SocialMediaButton
            href={URL_YOUTUBE}
            tooltipText="YouTube"
            tooltipPlacement={tooltipPlacement}
        >
            <YouTubeIcon sx={{ fontSize: size }} />
        </SocialMediaButton>
    )
}

export default SocialMediaYouTube;
