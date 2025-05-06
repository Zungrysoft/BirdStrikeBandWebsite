import { Box, ImageList, ImageListItem, useMediaQuery, useTheme } from "@mui/material";
import { useLayoutEffect, useState } from "react";

const images = require.context('../../public/images', true);

const GALLERY_IMAGES = [
    "slide_group_war_machine.jpg",
    "slide_garage_tom.jpg",
    "slide_garage_alex.jpg",
    "slide_blood_on_the_bass.jpg",
    "slide_war_machine_tom.jpg",
    "slide_calvin_war_machine.jpg",
    "slide_skate_1.jpg",
    "slide_skate_2.jpg",
    "slide_gilman_alex.jpg",
    "slide_gilman_1.jpg",
    "slide_i_drink_your_milkshake.jpg",
    "slide_caravan_1.jpg",
    "slide_caravan_2.jpg",
    "slide_botb_1.jpg",
    "slide_botb_2.jpg",
    "slide_botb_3.jpg",
    "slide_botb_alan.jpg",
    "slide_botb_calvin.jpg",
    "slide_botb_tom.jpg",
    "slide_garage_hannan.jpg",
    "slide_garage_1.jpg",
];

function shuffleArray(array) {
    for (var i = array.length - 1; i > 0; i--) {
        var j = Math.floor(Math.random() * (i + 1));
        var temp = array[i];
        array[i] = array[j];
        array[j] = temp;
    }
}

function GalleryPage() {
    const theme = useTheme();
    const isCompact = useMediaQuery(theme.breakpoints.down('sm'));
    const isModeratelyCompact = useMediaQuery(theme.breakpoints.down('md'))
    const isSomewhatCompact = useMediaQuery(theme.breakpoints.down('lg'))
    const [galleryImages, setGalleryImages] = useState([]);

    useLayoutEffect(() => {
        let shuffledGalleryImages = [...GALLERY_IMAGES];
        shuffleArray(shuffledGalleryImages);
        setGalleryImages(shuffledGalleryImages);
    }, []);

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
        <Box sx={{ margin: 'auto', width: 'min(100%, 1600px)', minHeight: isCompact ? null : '101vh' }}>
            <Box sx={{ marginLeft: '16px', marginRight: '16px', marginBottom: '16px' }}>
                <ImageList variant="masonry" cols={numCols} gap={16}>
                    {galleryImages.map((img) => (
                        <ImageListItem key={img}>
                            <img
                                src={images(`./${img}`)}
                                loading="lazy"
                            />
                        </ImageListItem>
                    ))}
                </ImageList>
            </Box>
            <Box sx={{ height: '1px' }}/>
        </Box>
    )
}

export default GalleryPage;
