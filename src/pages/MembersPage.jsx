import { Box, useMediaQuery, useTheme } from "@mui/material";
import Profile from "../components/Profile";
import { LIGHTNING2 } from "../config/colors";
import { getCauseOfDeath } from "../helpers/profileData";
import React, { useMemo } from 'react';

const images = require.context('../../public/images', true);

function MembersPage() {
    const theme = useTheme();

    const causeOfDeath = useMemo(() => {
        const storedCauseOfDeath = localStorage.getItem("causeOfDeath");
        if (!storedCauseOfDeath) {
            const generatedCauseOfDeath = getCauseOfDeath();
            localStorage.setItem("causeOfDeath", generatedCauseOfDeath);
            return generatedCauseOfDeath;
        }
        return storedCauseOfDeath;
    }, []);

    return(
        <Box sx={{ margin: 'auto', width: 'min(100%, 1600px)' }}>
            <Profile
                name="Alex Martinez"
                instrument="Lead Vocals"
                description={`Parkour instructor by day, rock vocalist by night, Alex's massive stage presence saved Bird Strike in its hour of need. Without Alex, the band would just be four nerds. Four poor wretches struggling to make it as single childless software engineers.\n\nIn the days before Alex joined, the band was creating its vocal tracks by cutting together audio snippets of Joe Rogan interviews. Tired of having to do this, Calvin hired his brother Alex to cut together the Joe Rogan snippets for them. But then he came up with a better way.`}
                date="May 2024 - Current"
                imageSide="right"
                image="profile_alex"
                links={[
                    {
                        text: "Instagram",
                        url: "https://www.instagram.com/cavrn/",
                    },
                ]}
            />
            <Profile
                name="Kern Kim"
                instrument="Guitar"
                description={``}
                date="July 2025 - Current"
                imageSide="left"
                image="profile_kern"
            />
            {/* <Profile 
                name="Kern Kim"
                instrument="Guitar"
                description={`After their previous guitarist Tom's untimely death, the band performed an ancient Portugese ritual passed down by Calvin and Alex's grandmother to transplant his soul and guitar-playing ability into another man's body. The band chose Kern as the victim shell in order to raise the band's average attractiveness and get a head start on their plan to transition into a K-Pop group so gradually that no one would notice. Half way through the ritual which took the form of a 9-part prog metal opera, Tom (in Kern's body) leapt up from the ceremonial cot, grabbed his guitar, and began shredding!\n\nThe band found out later that the ritual didn't actually work; Kern had in fact been playing guitar for over 13 years. But he seemed like a nice enough guy so the band let him stay. Though they remind him that if he slips up once too many, they can always do the ritual again (and get it right this time.)`}
                date="July 2025 - Current"
                imageSide="left"
                image="profile_mystery"
                hidden
            />*/}
            <Profile
                name="Calvin Martinez"
                instrument="Keyboard, Harmonica, Ocarina, Accordion, Vibraslap, Backing Vocals"
                description={`Bird Strike originally formed when Calvin hosted a seminar to rope suckers into his cryptocurrency scheme. But when only two people showed up, both musicians, he abandoned the idea and turned it into a jam session instead. And it's a good thing too because buying audio equipment for Bird Strike allows them to hemorrhage money just a little bit slower than if they had invested in crypto.\n\nCalvin has been perfecting his overdriven Hammond Organ tone to create a screaming beastly rival to the power of the lead guitar. In fact, he specializes in the lesser-used instruments that no one else plays or really likes. But the rest of the band has to put up with it because he pays for the practice garage. He suffers no fools, asks no quarter, and arrives to no practice session sober; for he is a founding member of Bird Strike first, last, and always.`}
                date="January 2024 - Current"
                imageSide="right"
                image="profile_calvin"
                links={[
                    {
                        text: "Hobby Projects Website",
                        url: "https://zungrysoft.github.io",
                    },
                ]}
            />
            <Profile
                name="Alan Brilliant"
                instrument="Bass Guitar"
                description={`Alan is the workhorse of the band. He lines up the band's gigs, handles online promotion, shines the other members' shoes, and more! He barely even gets time to play his instrument. (And it shows.) Whether Bird Strike is playing a sold-out show at Madison Square Garden or in a dive bar in West Oakland occupied only by two regulars taking greater interest in their whiskey sours, it was Alan who knew which palms to grease to make it happen.\n\nAlan's complex and intricate basslines put to shame lesser bassists who haven't touched their D and G strings since the Clinton administration. His unique style of bass playing requires a lot of imagination, though mostly because he's turned down so low that you have to imagine what he's playing.`}
                date="January 2024 - Current"
                imageSide="left"
                image="profile_alan"
            />
            <Profile
                name="Abdul Hannan Kanji"
                instrument="Drums"
                description={`In a band of hyper control freaks (Alan and Calvin) and flakey primadonas (Alex and Tom), it helps to have a reliable backbone who's always there and always friendly. Just a smiling face who's ready to play when you are. Can anyone come up with a single bad thing to say about Hannan? (Seriously, can you think of anything? It would be nice to have some dirt on him just in case.)`}
                date="June 2024 - Current"
                imageSide="right"
                image="profile_hannan"
            />

            <h4 style={{ marginBottom: '16px', marginTop: '96px', color: LIGHTNING2 }}>Past Members</h4>

            <Profile
                name="Tom Cannon"
                instrument="Guitar"
                description={`With his skilled guitar shredding and 80's rock style, Tom "Thundergun" Cannon seemed destined for fame and glory in the Bay Area music scene. As a founding member of Bird Strike (formerly known as *bandName*), he brought to every practice session some dirty licks, some clean solos, and just a little bit of workout stank.\n\nTom's rise to fame was cut short by his tragic death in August of 2025. For the sake of the family's privacy, the band wishes not to go into much detail, but they will say that it involved *causeOfDeath*.`}
                date="January 2024 - August 2025"
                imageSide="left"
                image="profile_tom"
                causeOfDeath={causeOfDeath}
            />

            <Box sx={{ height: '1px' }}/>
        </Box>
    )
}

export default MembersPage;
