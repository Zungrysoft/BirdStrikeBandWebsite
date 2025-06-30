import { Box, ImageList, ImageListItem, useMediaQuery, useTheme } from "@mui/material";
import { useLayoutEffect, useState } from "react";

const images = require.context('../../public/images', true);

const GALLERY_IMAGES = [
    { "filename": "slide_group_war_machine.jpg", "size": [3828, 3024] },
    { "filename": "slide_garage_tom.jpg", "size": [2610, 3702] },
    { "filename": "slide_garage_alex.jpg", "size": [3024, 3894] },
    { "filename": "slide_garage_hannan.jpg", "size": [2688, 3520] },
    { "filename": "slide_garage_1.jpg", "size": [4044, 3464] },
    { "filename": "slide_blood_on_the_bass.jpg", "size": [3000, 4000] },
    { "filename": "slide_war_machine_tom.jpg", "size": [3803, 2771] },
    { "filename": "slide_war_machine_calvin.jpg", "size": [4031, 3023] },
    { "filename": "slide_skate_1.jpg", "size": [3188, 2368] },
    { "filename": "slide_skate_2.jpg", "size": [1258, 1376] },
    { "filename": "slide_gilman_alex.jpg", "size": [754, 982] },
    { "filename": "slide_gilman_1.jpg", "size": [609, 614] },
    { "filename": "slide_i_drink_your_milkshake.jpg", "size": [2232, 3550] },
    { "filename": "slide_caravan_1.jpg", "size": [942, 605] },
    { "filename": "slide_caravan_2.jpg", "size": [2896, 2532] },
    { "filename": "slide_botb_1.jpg", "size": [1159, 1080] },
    { "filename": "slide_botb_2.jpg", "size": [3162, 3526] },
    { "filename": "slide_botb_3.jpg", "size": [2436, 3214] },
    { "filename": "slide_botb_alan.jpg", "size": [689, 1017] },
    { "filename": "slide_botb_calvin.jpg", "size": [738, 907] },
    { "filename": "slide_botb_tom.jpg", "size": [660, 769] },
    { "filename": "slide_jury_room_1.jpg", "size": [776, 1040] },
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
                    {galleryImages.map((imgData) => (
                        <ImageListItem key={imgData.filename}>
                            <img
                                src={images(`./${imgData.filename}`)}
                                loading="lazy"
                                style={{
                                    width: '100%',
                                    aspectRatio: (imgData.size[0] / imgData.size[1]) ?? '3/2',
                                }}
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
