import { Box, ImageList, ImageListItem, Link, Stack, useMediaQuery, useTheme } from "@mui/material";
import ParagraphBox from "../components/ParagraphBox";
import { BACKGROUND_1, LIGHTNING, LIGHTNING2 } from "../config/colors";
import SocialMediaInstagram from "../components/SocialMediaInstagram";
import SocialMediaAppleMusic from "../components/SocialMediaAppleMusic";
import SocialMediaSpotify from "../components/SocialMediaSpotify";
import SocialMediaYouTube from "../components/SocialMediaYouTube";
import { URL_APPLE_MUSIC, URL_INSTAGRAM, URL_SPOTIFY, URL_YOUTUBE } from "../helpers/socialMedia";
import UpcomingShows from "../components/UpcomingShows";

const images = require.context('../../public/images', true);

const ABOUT_TEXT = "We've already hit your windshield, now we're hitting your speakers. Out of the depths of the Sunnyvale Projects, Bird Strike is here to distribute hard rock and punk to the masses.";

function AboutPage() {
    const theme = useTheme();
    const isCompact = useMediaQuery(theme.breakpoints.down('sm'));

    return(
        <Box sx={{ justifySelf: 'center', width: 'min(100%, 1600px)', minHeight: isCompact ? null : '101vh' }}>
            <ParagraphBox text={ABOUT_TEXT}/>
            <Box sx={{
                marginLeft: '16px',
                marginRight: '16px',
                marginBottom: '16px',
            }}>
                <img src={images(isCompact ? './main_page_cropped.jpg' : './main_page.jpg')} style={{
                    width: '100%',
                    display: 'block',
                    objectFit: 'contain',
                }}/>
            </Box>
            <Stack direction={isCompact ? 'column-reverse' : 'row'} spacing={2} sx={{ marginLeft: '16px', marginRight: '16px', marginBottom: '16px' }}>
                <Box sx={{ flex: 1, padding: 1.5, backgroundColor: BACKGROUND_1 }}>
                    <h6 style={{ color: LIGHTNING, textAlign: 'left', marginBottom: '16px' }}>Links</h6>
                    <Box sx={{ fontSize: 16, color: LIGHTNING2 }}>
                        <Stack direction='row' alignItems='center'>
                            <SocialMediaInstagram size={20}/>
                            <Link href={URL_INSTAGRAM}>Instagram</Link>
                        </Stack>
                        <Stack direction='row' alignItems='center'>
                            <SocialMediaYouTube size={20}/>
                            <Link href={URL_YOUTUBE}>YouTube</Link>
                        </Stack>
                        <Stack direction='row' alignItems='center'>
                            <SocialMediaSpotify size={20}/>
                            <Link href={URL_SPOTIFY}>Spotify</Link>
                        </Stack>
                        <Stack direction='row' alignItems='center'>
                            <SocialMediaAppleMusic size={20}/>
                            <Link href={URL_APPLE_MUSIC}>Apple Music</Link>
                        </Stack>
                    </Box>
                </Box>
                <Box sx={{ flex: 1, padding: 1.5, backgroundColor: BACKGROUND_1 }}>
                    <h6 style={{ color: LIGHTNING, textAlign: 'left', marginBottom: '16px' }}>Upcoming Shows</h6>
                    <UpcomingShows/>
                </Box>
            </Stack>
            <Box sx={{ height: '1px' }}/>
        </Box>
    )
}

export default AboutPage;
