import { useLayoutEffect, useRef, useState } from "react";
import { Box, Collapse, useMediaQuery, useTheme } from "@mui/material";
import { BACKGROUND_1, LIGHTNING, LIGHTNING2 } from "../config/colors";
import ProfileImage from "./ProfileImage";

function ReleaseContent({
    title,
    type,
    tracks,
    albumArt,
    date,
    isSingle,
    expanded,
    onExpandedChange,
}) {
    const theme = useTheme();
    const isCompact = useMediaQuery(theme.breakpoints.down('sm'));
    const compactArtRef = useRef(null);
    const detailsRef = useRef(null);
    const [compactArtHeight, setCompactArtHeight] = useState(null);
    const [overflows, setOverflows] = useState(false);

    const typeText = `${type} - ${date}`;
    const singleTrack = isSingle ? tracks[0] : null;

    useLayoutEffect(() => {
        const el = compactArtRef.current;
        if (!el) {
            setCompactArtHeight(null);
            return undefined;
        }
        const updateHeight = () => setCompactArtHeight(el.getBoundingClientRect().height);
        updateHeight();
        const observer = new ResizeObserver(updateHeight);
        observer.observe(el);
        return () => observer.disconnect();
    }, [albumArt]);

    useLayoutEffect(() => {
        const el = detailsRef.current;
        if (!el || !isSingle) {
            setOverflows(false);
            return undefined;
        }
        const updateOverflow = () => setOverflows(el.scrollHeight > el.clientHeight + 1);
        updateOverflow();
        const observer = new ResizeObserver(updateOverflow);
        observer.observe(el);
        return () => observer.disconnect();
    }, [isSingle, expanded, singleTrack, compactArtHeight, isCompact]);

    return(
        <Box sx={{ display: 'flex', flexDirection: 'column', height: '100%', minHeight: 0, flex: 1 }}>
            <Box sx={{ flex: 0, padding: 2, paddingBottom: 1, flexDirection: 'column', textAlign: 'left' }}>
                <h4 style={{ color: LIGHTNING, textAlign: 'left', marginTop: -8 }}>{title}</h4>
                {albumArt &&
                    <Box ref={compactArtRef}>
                        <ProfileImage image={albumArt} aspectRatio={'1:1'}/>
                    </Box>
                }
                <h6 style={{ color: LIGHTNING2, textAlign: 'left' }}>{typeText}</h6>
                {isSingle && singleTrack.link?.text &&
                    <Box sx={{ marginTop: 0.5 }}>
                        <ReleaseTrackLink link={singleTrack.link}/>
                    </Box>
                }
            </Box>
            
            {isSingle ? (
                <>
                    <Box
                        ref={detailsRef}
                        sx={{
                            position: 'relative',
                            flex: isCompact ? '0 1 auto' : 1,
                            minHeight: 0,
                            overflow: expanded ? 'visible' : 'hidden',
                            maxHeight: (!expanded && isCompact && compactArtHeight)
                                ? `${compactArtHeight}px`
                                : undefined,
                            padding: 2,
                            paddingTop: 0,
                            paddingBottom: 1,
                        }}
                    >
                        <ReleaseTrackDetails
                            lyrics={singleTrack.lyrics}
                            description={singleTrack.description}
                        />
                        {overflows && !expanded &&
                            <Box
                                sx={{
                                    position: 'absolute',
                                    left: 0,
                                    right: 0,
                                    bottom: 0,
                                    height: '2.5em',
                                    background: `linear-gradient(to bottom, ${BACKGROUND_1}00, ${BACKGROUND_1})`,
                                    pointerEvents: 'none',
                                }}
                            />
                        }
                    </Box>
                    {(overflows || expanded) &&
                        <Box
                            onClick={() => onExpandedChange(!expanded)}
                            sx={{
                                color: LIGHTNING,
                                cursor: 'pointer',
                                fontSize: 16,
                                textDecoration: 'underline',
                                userSelect: 'none',
                                flexShrink: 0,
                                paddingLeft: 3,
                                paddingRight: 2,
                                paddingBottom: isCompact ? 5 : 2,
                            }}
                        >
                            {expanded ? 'Show less' : 'Show more'}
                        </Box>
                    }
                </>
            ) : (
                <Box sx={{
                    flex: 1,
                    padding: 2,
                    paddingTop: 0,
                    paddingBottom: isCompact ? 5 : 2,
                    minHeight: '16px',
                }}>
                    <Box
                        component="table"
                        sx={{
                            borderCollapse: 'collapse',
                            textAlign: 'left',
                            width: '100%',
                        }}
                    >
                        {tracks.map((track, index) => (
                            <ReleaseTrack index={index} {...track} key={track.title}/>
                        ))}
                    </Box>
                </Box>
            )}
        </Box>
    )
}

function ReleaseTrack({
    title,
    description,
    lyrics,
    index,
    link,
}) {
    const [expanded, setExpanded] = useState(false);

    const cellSx = {
        paddingTop: 0.5,
        paddingBottom: 0.5,
        paddingLeft: 1,
        paddingRight: 1,
        verticalAlign: 'baseline',
        fontSize: 16,
        userSelect: 'none',
        borderTop: index > 0 ? `1px solid ${LIGHTNING2}` : null,
    };

    return (
        <Box component="tbody">
            <Box
                component="tr"
                onClick={() => setExpanded((prev) => !prev)}
                sx={{ cursor: 'pointer' }}
            >
                <Box component="td" sx={{ ...cellSx, color: LIGHTNING2, fontWeight: 'normal', width: '1px', whiteSpace: 'nowrap' }}>
                    {`${index + 1}:`}
                </Box>
                <Box component="td" sx={{ ...cellSx, color: LIGHTNING, fontWeight: 'bold', width: '1px', whiteSpace: 'nowrap' }}>
                    {title}
                </Box>
                <Box component="td" sx={{ ...cellSx, fontWeight: 'normal', paddingLeft: 3, width: '100%' }}>
                    <ReleaseTrackLink link={link}/>
                </Box>
            </Box>
            <Box component="tr">
                <Box component="td" colSpan={3} sx={{ padding: 0 }}>
                    <Collapse in={expanded} timeout={0}>
                        <ReleaseTrackDetails lyrics={lyrics} description={description}/>
                    </Collapse>
                </Box>
            </Box>
        </Box>
    );
}

function ReleaseTrackDetails({
    lyrics,
    description,
}) {
    const textStyle = {
        color: LIGHTNING2,
        paddingTop: 4,
        paddingLeft: 16,
        paddingBottom: 4,
        margin: 0,
        whiteSpace: 'pre-wrap',
    };

    if (!lyrics && !description) {
        return null;
    }

    return (
        <Box sx={{ display: 'flex', flexDirection: 'row', gap: 1, alignItems: 'stretch', paddingBottom: 2 }}>
            <Box sx={{ flex: 1, minWidth: 0 }}>
                <p style={{...textStyle, fontStyle: lyrics ? null : 'italic'}}>{lyrics ?? 'This track has no lyrics'}</p>
            </Box>
            <Box sx={{ width: '1px', backgroundColor: LIGHTNING2, flexShrink: 0 }}/>
            <Box sx={{ flex: 1, minWidth: 0 }}>
                <p style={textStyle}>{description}</p>
            </Box>
        </Box>
    );
}

function ReleaseTrackLink({ link }) {
    if (!link?.text) {
        return null;
    }

    return (
        <a
            href={link.link || undefined}
            target="_blank"
            rel="noopener noreferrer"
            onClick={(event) => {
                event.stopPropagation();
                if (!link.link) {
                    event.preventDefault();
                }
            }}
            style={{
                color: LIGHTNING,
                fontSize: 16,
                fontWeight: 'normal',
                textDecoration: 'underline',
            }}
        >
            {link.text}
        </a>
    );
}

export default ReleaseContent;
