import React from 'react';
import SocialMediaButton from './SocialMediaButton';
import InstagramIcon from '@mui/icons-material/Instagram';
import { URL_INSTAGRAM } from '../helpers/socialMedia';

function SocialMediaInstagram({ tooltipPlacement, size=50 }) {
    return(
        <SocialMediaButton
            href={URL_INSTAGRAM}
            tooltipText="Instagram"
            tooltipPlacement={tooltipPlacement}
        >
            <InstagramIcon sx={{ fontSize: size }} />
        </SocialMediaButton>
    )
}

export default SocialMediaInstagram;
