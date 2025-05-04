import { IconButton, Tooltip } from '@mui/material';
import React from 'react';
import { LIGHTNING } from '../config/colors';

function SocialMediaButton({ href, children, titleText, side="left" }) {
    return(
        <IconButton
            component="a"
            href={href}
            target="_blank"
            rel="noopener noreferrer"
            sx={{ color: LIGHTNING }}
        >
            <Tooltip title={titleText} placement={side === "left" ? "left" : "right"}>
                {children}
            </Tooltip>
        </IconButton>
    )
}

export default SocialMediaButton;
