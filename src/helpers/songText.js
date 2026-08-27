const songFiles = require.context('../data/song', false, /\.txt$/);

const songTextPromises = {};
for (const key of songFiles.keys()) {
    const id = key.replace(/^\.\//, '').replace(/\.txt$/, '');
    const loaded = songFiles(key);
    const url = typeof loaded === 'string' ? loaded : loaded.default;
    songTextPromises[id] = fetch(url)
        .then((response) => (response.ok ? response.text() : undefined))
        .catch(() => undefined);
}

function loadSongText(id) {
    if (!id) {
        return Promise.resolve(undefined);
    }
    const fileId = id.replace(/\.txt$/, '');
    return songTextPromises[fileId] ?? Promise.resolve(undefined);
}

async function resolveTrackTexts(track) {
    const [lyrics, description] = await Promise.all([
        loadSongText(track.lyrics),
        loadSongText(track.description),
    ]);
    return {
        ...track,
        lyrics,
        description,
    };
}

export async function resolveDiscography(discography) {
    return Promise.all(discography.map(async (release) => ({
        ...release,
        tracks: await Promise.all(release.tracks.map(resolveTrackTexts)),
    })));
}
