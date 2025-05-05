import { Box, ImageList, ImageListItem, useMediaQuery, useTheme } from "@mui/material";
import ParagraphBox from "../components/ParagraphBox";

const images = require.context('../../public/images', true);

const ABOUT_TEXT = "Bird Strike is a hard rock and punk band from Sunnyvale, California. This website is under construction.";

const GALLERY_IMAGES = [
    "slide_group_war_machine.jpg",
    "slide_tom_garage.jpg",
    "slide_alex_cowboy_hat.jpg",
    "slide_rocking.jpg",
];

function AboutPage() {
    const theme = useTheme();
    const isCompact = useMediaQuery(theme.breakpoints.down('sm'));
    const isModeratelyCompact = useMediaQuery(theme.breakpoints.down('md'))
    const isSomewhatCompact = useMediaQuery(theme.breakpoints.down('lg'))

    let numCols = 5;
    if (isCompact) {
        numCols = 2;
    }
    else if (isModeratelyCompact) {
        numCols = 3;
    }
    else if (isSomewhatCompact) {
        numCols = 4;
    }

    return(
        <Box sx={{ justifySelf: 'center', width: 'min(100%, 1600px)' }}>
            <ParagraphBox text={ABOUT_TEXT}/>
            <Box sx={{ marginLeft: '16px', marginRight: '16px', marginBottom: '16px' }}>
                <ImageList variant="masonry" cols={numCols} gap={16}>
                    {GALLERY_IMAGES.map((img) => (
                        <ImageListItem key={img}>
                            <img
                                src={images(`./${img}`)}
                                loading="lazy"
                            />
                        </ImageListItem>
                    ))}
                </ImageList>
            </Box>
        </Box>
    )
}

export default AboutPage;
