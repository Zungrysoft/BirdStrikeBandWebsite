import { useState } from "react";
import { Box, useMediaQuery, useTheme } from "@mui/material";
import ProfileImage from "./ProfileImage";
import { BACKGROUND_1 } from "../config/colors";
import ReleaseContent from "./ReleaseContent";

function Release({
    title,
    type,
    tracks,
    albumArt,
    date,
}) {
    const theme = useTheme();
    const isCompact = useMediaQuery(theme.breakpoints.down('sm'));
    const isSingle = tracks.length === 1;
    const [singleExpanded, setSingleExpanded] = useState(false);
    const clipToArt = isSingle && !isCompact && !singleExpanded && Boolean(albumArt);

    return(
        <Box sx={{
            display: 'flex',
            flexDirection: isCompact ? 'column' : 'row',
            alignItems: clipToArt ? 'stretch' : 'flex-start',
            backgroundColor: BACKGROUND_1,
            marginBottom: '16px',
            marginLeft: '16px',
            marginRight: '16px',
            height: '100%',
        }}>
            {!isCompact && albumArt &&
                <Box sx={{ flex: 0.3, minWidth: 0, maxWidth: '100%' }}>
                    <ProfileImage image={albumArt} aspectRatio={'1:1'}/>
                </Box>
            }
            <Box sx={{
                flex: 1,
                minWidth: 0,
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'start',
                ...(clipToArt ? { position: 'relative' } : {}),
            }}>
                <Box sx={clipToArt ? {
                    position: 'absolute',
                    inset: 0,
                    display: 'flex',
                    flexDirection: 'column',
                    overflow: 'hidden',
                } : {
                    display: 'flex',
                    flexDirection: 'column',
                    flex: 1,
                    minHeight: 0,
                }}>
                    <ReleaseContent
                        title={title}
                        type={type}
                        tracks={tracks}
                        albumArt={isCompact && albumArt}
                        date={date}
                        isSingle={isSingle}
                        expanded={singleExpanded}
                        onExpandedChange={setSingleExpanded}
                    />
                </Box>
            </Box>
            
        </Box>  
    )
}

export default Release;
