import { Box, ImageList, ImageListItem, useMediaQuery, useTheme } from "@mui/material";
import { useLayoutEffect, useState } from "react";
import shows from '../data/shows.json';
import { humanizeDate } from "../components/UpcomingShows";

const images = require.context('../../public/images/compressed', true);

const GALLERY_IMAGES = [
    { "filename": "slide_garage_1.jpg", "size": [4044, 3464], "show": "war_machine" },
    { "filename": "slide_garage_tom.jpg", "size": [2610, 3702], "title": "Tom in the practice garage" },
    { "filename": "slide_garage_alan.jpg", "size": [3484, 4284], "title": "Alan in the practice garage" },
    { "filename": "slide_garage_calvin.jpg", "size": [5395, 4284], "title": "Calvin in the practice garage" },
    { "filename": "slide_garage_kern.jpg", "size": [4296, 4284], "title": "Kern in the practice garage" },
    { "filename": "slide_garage_alex.jpg", "size": [3024, 3894], "title": "Alex in the practice garage" },
    { "filename": "slide_garage_alex_2.jpg", "size": [5424, 4046], "title": "Alex in the practice garage" },
    { "filename": "slide_garage_gabe.jpg", "size": [2880, 4132], "title": "Gabe in the practice garage" },
    { "filename": "slide_garage_gabe_2.jpg", "size": [2520, 3510], "title": "Gabe in the practice garage" },
    // { "filename": "slide_garage_hannan.jpg", "size": [2688, 3520], "title": "In the practice garage" },
    { "filename": "slide_studio_alex.jpg", "size": [2646, 3666], "title": "Alex recording vocals for Sludge Supper" },
    { "filename": "slide_i_drink_your_milkshake.jpg", "size": [2232, 3550], "title": "DRAINAGE ALAN, YOU BOY!" },
    { "filename": "slide_gilman_1.jpg", "size": [609, 614], "show": "gilman_open_mic" },
    { "filename": "slide_gilman_alex.jpg", "size": [754, 982], "show": "gilman_open_mic"  },
    { "filename": "slide_war_machine_tom.jpg", "size": [3803, 2771], "show": "war_machine" },
    { "filename": "slide_war_machine_calvin.jpg", "size": [4031, 3023], "show": "war_machine" },
    { "filename": "slide_war_machine_alex.jpg", "size": [2695, 2410], "show": "war_machine" },
    { "filename": "slide_war_machine_group.jpg", "size": [3828, 3024], "show": "war_machine" },
    { "filename": "slide_skate_1.jpg", "size": [3188, 2368], "show": "skate_park" },
    { "filename": "slide_skate_2.jpg", "size": [1258, 1376], "show": "skate_park" },
    { "filename": "slide_caravan_1.jpg", "size": [942, 605], "show": "caravan" },
    { "filename": "slide_caravan_2.jpg", "size": [2896, 2532], "show": "caravan" },
    { "filename": "slide_botb_1.jpg", "size": [1159, 1080], "show": "botb" },
    { "filename": "slide_botb_2.jpg", "size": [3162, 3526], "show": "botb" },
    { "filename": "slide_botb_3.jpg", "size": [2436, 3214], "show": "botb" },
    { "filename": "slide_botb_alan.jpg", "size": [689, 1017], "show": "botb" },
    { "filename": "slide_botb_calvin.jpg", "size": [738, 907], "show": "botb" },
    { "filename": "slide_botb_tom.jpg", "size": [660, 769], "show": "botb" },
    { "filename": "slide_blood_on_the_bass.jpg", "size": [3000, 4000], "show": "botb" },
    { "filename": "slide_jury_room_1.jpg", "size": [776, 1040], "show": "jury_room" },
    { "filename": "slide_war_machine_2_1.jpg", "size": [1964, 1223], "show": "war_machine_2" },
    { "filename": "slide_war_machine_2_2.jpg", "size": [1463, 1488], "show": "war_machine_2" },
    { "filename": "slide_war_machine_2_alan.jpg", "size": [1406, 1496], "show": "war_machine_2" },
    { "filename": "slide_war_machine_2_alex.jpg", "size": [1424, 1832], "show": "war_machine_2" },
    { "filename": "slide_war_machine_2_hannan.jpg", "size": [1463, 2048], "show": "war_machine_2" },
    { "filename": "slide_war_machine_2_mosh_pit.jpg", "size": [1463, 1901], "show": "war_machine_2" },
    { "filename": "slide_war_machine_2_worship.jpg", "size": [1883, 1280], "show": "war_machine_2" },
    { "filename": "slide_war_machine_2_sermon.jpg", "size": [1256, 690], "show": "war_machine_2" },
    { "filename": "slide_yard_1.jpg", "size": [1114, 910], "show": "the_yard" },
    // { "filename": "slide_caravan_3_1.jpg", "size": [3516, 2880], "show": "caravan_3" },
    { "filename": "slide_caravan_3_2.jpg", "size": [4104, 2880], "show": "caravan_3" },
    { "filename": "slide_caravan_3_alan.jpg", "size": [2442, 2880], "show": "caravan_3" },
    { "filename": "slide_caravan_3_calvin.jpg", "size": [1720, 2880], "show": "caravan_3" },
    { "filename": "slide_caravan_3_kern.jpg", "size": [1716, 2880], "show": "caravan_3" },
    { "filename": "slide_vessel_1.jpg", "size": [1892, 2356], "show": "the_vessel" },
    { "filename": "slide_vessel_2.jpg", "size": [1885, 1980], "show": "the_vessel" },
    { "filename": "slide_vessel_3.jpg", "size": [1207, 1616], "show": "the_vessel" },
    { "filename": "slide_vessel_4.jpg", "size": [1586, 2188], "show": "the_vessel" },
];

function shuffleArray(array) {
    for (var i = array.length - 1; i > 0; i--) {
        var j = Math.floor(Math.random() * (i + 1));
        var temp = array[i];
        array[i] = array[j];
        array[j] = temp;
    }
}

function getImageTitleFromShow(show) {
    if (!show || !shows[show]) {
        return "";
    }

    const name = shows[show].title || shows[show].venue;
    const date = new Date(shows[show].date)
    const dateStr = humanizeDate(date, false, false);

    return `${name} - ${dateStr}`;
}

function GalleryPage() {
    const theme = useTheme();
    const isCompact = useMediaQuery(theme.breakpoints.down('sm'));
    const isModeratelyCompact = useMediaQuery(theme.breakpoints.down('md'))
    const isSomewhatCompact = useMediaQuery(theme.breakpoints.down('xxl'))
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
                                title={imgData.title ?? getImageTitleFromShow(imgData.show)}
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
