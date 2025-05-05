import React from 'react';
import SocialMediaButton from './SocialMediaButton';
import YouTubeIcon from '@mui/icons-material/YouTube';

function SocialMediaYouTube({ tooltipPlacement }) {
    return(
        <SocialMediaButton
            href="https://www.youtube.com/@BirdStrike-Music"
            tooltipText="YouTube"
            tooltipPlacement={tooltipPlacement}
        >
            <YouTubeIcon sx={{ fontSize: 50 }} />
        </SocialMediaButton>
    )
}

export default SocialMediaYouTube;
