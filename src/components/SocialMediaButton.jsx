import { IconButton } from '@mui/material';
import React from 'react';
import { LIGHTNING } from '../config/colors';

function SocialMediaButton({ href, children }) {
    return(
        <IconButton
            component="a"
            href={href}
            target="_blank"
            rel="noopener noreferrer"
            sx={{ color: LIGHTNING }}
        >
                {children}
        </IconButton>
    )
}

export default SocialMediaButton;
