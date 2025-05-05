import React from 'react';
import SocialMediaButton from './SocialMediaButton';
import InstagramIcon from '@mui/icons-material/Instagram';

function SocialMediaInstagram({ tooltipPlacement }) {
    return(
        <SocialMediaButton
            href="https://www.instagram.com/birdstrike.band/"
            tooltipText="Instagram"
            tooltipPlacement={tooltipPlacement}
        >
            <InstagramIcon sx={{ fontSize: 50 }} />
        </SocialMediaButton>
    )
}

export default SocialMediaInstagram;
