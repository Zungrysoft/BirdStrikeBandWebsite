import { Box, useMediaQuery, useTheme } from "@mui/material";
import Profile from "../components/Profile";

const images = require.context('../../public/images', true);

function MembersPage() {
    const theme = useTheme();
    const isCompact = useMediaQuery(theme.breakpoints.down('sm'));

    return(
        <Box sx={{ justifySelf: 'center', width: 'min(100%, 1600px)' }}>
            <Profile
                name="Alex Martinez"
                instrument="Lead Vocals"
                description="Alex's Description Here"
                date="May 2024 - Current"
                imageSide="right"
                image="profile_alex"
            />
            <Profile
                name="Tom Cannon"
                instrument="Guitar"
                description="Tom's Description Here"
                date="January 2024 - Current"
                imageSide="left"
                image="profile_tom"
            />
            <Profile
                name="Calvin Martinez"
                instrument="Keyboard, Harmonica, Backing Vocals"
                description="Calvin has spent the last five years perfecting his overdriven Hammond B3 sound to create his own alternative to the rhythm guitar. "
                date="January 2024 - Current"
                imageSide="right"
                image="profile_calvin"
            />
            <Profile
                name="Alan Brilliant"
                instrument="Bass Guitar"
                description="Alan's Description Here"
                date="January 2024 - Current"
                imageSide="left"
                image="profile_alan"
            />
            <Profile
                name="Abdul Hannan Kanji"
                instrument="Drums"
                description="Hannan's Description Here"
                date="June 2024 - Current"
                imageSide="right"
                image=""
            />
            <Box sx={{ height: '1px' }}/>
        </Box>
    )
}

export default MembersPage;
