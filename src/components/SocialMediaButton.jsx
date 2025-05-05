import { IconButton, Tooltip } from '@mui/material';
import React from 'react';
import { LIGHTNING } from '../config/colors';

function SocialMediaButton({ href, children, tooltipText, tooltipPlacement }) {
    return(
        <IconButton
            component="a"
            href={href}
            sx={{ color: LIGHTNING }}
        >
            <Tooltip title={tooltipPlacement ? tooltipText : undefined} placement={tooltipPlacement}>
                {children}
            </Tooltip>
        </IconButton>
    )
}

export default SocialMediaButton;
