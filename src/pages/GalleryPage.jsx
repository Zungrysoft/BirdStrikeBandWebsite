import { Box, useMediaQuery, useTheme } from "@mui/material";
import { useLayoutEffect, useRef, useState } from "react";
import shows from '../data/shows.json';
import { humanizeDate } from "../components/UpcomingShows";
import { GALLERY_SPACING_PX, pickGalleryImages } from "../helpers/galleryRandomize";

const images = require.context('../../public/images/compressed', true);

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
    const isModeratelyCompact = useMediaQuery(theme.breakpoints.down('md'));
    const isSomewhatCompact = useMediaQuery(theme.breakpoints.down('xxl'));
    
    const containerRef = useRef(null);
    const [galleryColumns, setGalleryColumns] = useState([]);
    const [columnWidthPx, setColumnWidthPx] = useState(0);

    useLayoutEffect(() => {
        const width = containerRef.current.getBoundingClientRect().width;
        
        let numCols = 5;
        if (isSomewhatCompact) numCols = 4;
        if (isModeratelyCompact) numCols = 3;
        if (isCompact) numCols = 2;

        const columnWidth = Math.floor((width - ((numCols - 1) * GALLERY_SPACING_PX)) / numCols);

        const columns = pickGalleryImages(numCols, columnWidth);

        setColumnWidthPx(columnWidth);
        setGalleryColumns(columns);
    }, []);

    return(
        <Box sx={{ margin: 'auto', width: 'min(100%, 1600px)', minHeight: isCompact ? null : '101vh' }}>
            <Box sx={{ width: 'auto', marginLeft: `${GALLERY_SPACING_PX}px`, marginRight: `${GALLERY_SPACING_PX}px`, marginBottom: `${GALLERY_SPACING_PX}px`, display: 'flex', gap: `${GALLERY_SPACING_PX}px` }} ref={containerRef}>
                {galleryColumns.map((column, i) => (
                    <Box sx={{ display: 'flex', flexDirection: 'column', gap: `${GALLERY_SPACING_PX}px`, width: columnWidthPx, flex: `0 0 ${columnWidthPx}px`, minWidth: 0 }} key={i}>
                        {column.map((imgData) => (
                            <div
                                style={{
                                    overflow: 'hidden',
                                    height: imgData.displayHeight,
                                    flexShrink: 0,
                                    lineHeight: 0,
                                }}
                                key={imgData.filename}
                            >
                                <img
                                    src={images(`./${imgData.filename}`)}
                                    title={imgData.title ?? getImageTitleFromShow(imgData.show)}
                                    loading="lazy"
                                    alt={imgData.title ?? getImageTitleFromShow(imgData.show)}
                                    style={{
                                        display: 'block',
                                        width: '100%',
                                        height: '100%',
                                        objectFit: 'cover',
                                        objectPosition: 'center',
                                    }}
                                />
                            </div>
                        ))}
                    </Box>
                ))}
            </Box>
            <Box sx={{ height: '1px' }}/>
        </Box>
    )
}

export default GalleryPage;
