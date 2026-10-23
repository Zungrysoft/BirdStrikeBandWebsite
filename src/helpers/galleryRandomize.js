import galleryImagesRaw from '../data/galleryImages.json';

const MAX_WIDTH = 700;
const MAX_HEIGHT = 700;
const GALLERY_IMAGES = galleryImagesRaw.map((img) => {
    let sizeCompressed = img.size;

    const width = sizeCompressed[0];
    const height = sizeCompressed[1];
    if (width > MAX_WIDTH || height > MAX_HEIGHT) {
        const scale = Math.min(MAX_WIDTH / width, MAX_HEIGHT / height);
        sizeCompressed = [Math.floor(width * scale), Math.floor(height * scale)];
    }
    
    return {
        ...img,
        sizeCompressed: sizeCompressed,
    };
})

export const GALLERY_SPACING_PX = 16;

const IMAGE_CROP_COST = 1;
const IMAGE_CROP_COST_GROWTH = 1.1;
const GAP_ALIGNMENT_COST = 60;
const GAP_ALIGNMENT_COST_DIST = 64;
const GALLERY_SETS = 20;
const GALLERY_SET_ARRANGEMENTS = 120;
const ADD_IMAGE_COST = 200;
const EMPTY_COLUMN_COST = 1_000_000_000;
const IMAGE_COUNT_BY_NUM_COLUMNS = [8, 11, 16, 19, 23, 25];


/*
Pick 17 images to start with. 
Choose random combinations, cropping each image by a random amount to get them to line up
Check badness
*/


export function pickGalleryImages(numColumns, columnWidthPx) {
    columnWidthPx = Math.floor(columnWidthPx);
    const imageCount = IMAGE_COUNT_BY_NUM_COLUMNS[Math.min(numColumns + 1, IMAGE_COUNT_BY_NUM_COLUMNS.length - 1)];

    let possibilities = [];

    // Pick N different gallery image sets
    for (let i = 0; i < GALLERY_SETS; i ++) {
        const images = pickRandomImages(imageCount);

        // Pick N different random arrangements of this image set
        for (let j = 0; j < GALLERY_SET_ARRANGEMENTS; j ++) {

            // Init columns array
            let columns = [];
            for (let k = 0; k < numColumns; k ++) {
                columns.push([]);
            }

            for (const image of images) {
                columns[Math.floor(Math.random() * numColumns)].push(image);
            }

            columns = cropColumns(columns, columnWidthPx);

            possibilities.push(columns);
        }
    }

    // Evalute the randomly generated possibilities for lowest badness
    let lowestBadness = 9999999999999;
    let highestBadness = 0;
    let lowestBadnessColumns = null;
    for (const possibility of possibilities) {
        const possibilityBadness = getBadness(possibility);
        if (possibilityBadness < lowestBadness) {
            lowestBadness = possibilityBadness;
            lowestBadnessColumns = possibility;
        }
        if (possibilityBadness > highestBadness) {
            highestBadness = possibilityBadness;
        }
    }

    console.log("BADNESS: ", lowestBadness, highestBadness)
    
    return lowestBadnessColumns;
}

function getImageNaturalHeight(img, columnWidthPx) {
    return columnWidthPx * (img.size[1] / img.size[0]);
}

function getColumnHeight(column, columnWidthPx) {
    let height = Math.max(column.length - 1, 0) * GALLERY_SPACING_PX;
    for (const img of column) {
        height += getImageNaturalHeight(img, columnWidthPx);
    }
    return height;
}

function allocateIntegerHeights(naturalHeights, targetSum) {
    const n = naturalHeights.length;
    if (n === 0) {
        return [];
    }

    targetSum = Math.max(Math.round(targetSum), n);

    const locked = new Array(n).fill(false);
    const desired = new Array(n).fill(1);

    for (let iter = 0; iter < n; iter++) {
        let lockedCount = 0;
        const unlocked = [];
        for (let i = 0; i < n; i++) {
            if (locked[i]) {
                lockedCount += 1;
            } else {
                unlocked.push(i);
            }
        }

        const remaining = targetSum - lockedCount;
        const unlockedNatural = unlocked.reduce((sum, i) => sum + naturalHeights[i], 0);
        const cropEach = unlocked.length > 0 ? (unlockedNatural - remaining) / unlocked.length : 0;

        let lockedNew = false;
        for (const i of unlocked) {
            const h = naturalHeights[i] - cropEach;
            if (h < 1) {
                locked[i] = true;
                desired[i] = 1;
                lockedNew = true;
            } else {
                desired[i] = h;
            }
        }
        if (!lockedNew) {
            break;
        }
    }

    const heights = desired.map((h) => Math.max(Math.floor(h), 1));
    let remainder = targetSum - heights.reduce((sum, h) => sum + h, 0);

    const order = desired
        .map((h, i) => ({ i, frac: h - Math.floor(h) }))
        .sort((a, b) => b.frac - a.frac);

    if (remainder > 0) {
        for (let k = 0; k < remainder; k++) {
            heights[order[k % n].i] += 1;
        }
    } else if (remainder < 0) {
        const byHeight = heights
            .map((h, i) => ({ i, h }))
            .sort((a, b) => b.h - a.h);
        let left = -remainder;
        for (let k = 0; left > 0 && k < n * 8; k++) {
            const i = byHeight[k % n].i;
            if (heights[i] > 1) {
                heights[i] -= 1;
                left -= 1;
            }
        }
    }

    return heights;
}

function cropColumns(columns, columnWidthPx) {
    const columnsRet = columns.map((column) => column.map((img) => ({ ...img })));

    let minHeight = Infinity;
    for (const column of columnsRet) {
        if (column.length === 0) {
            continue;
        }
        minHeight = Math.min(minHeight, getColumnHeight(column, columnWidthPx));
    }

    if (!Number.isFinite(minHeight)) {
        return columnsRet;
    }

    const targetHeight = Math.floor(minHeight);

    for (const column of columnsRet) {
        if (column.length === 0) {
            continue;
        }

        const gap = Math.max(column.length - 1, 0) * GALLERY_SPACING_PX;
        const targetContentHeight = targetHeight - gap;
        const naturalHeights = column.map((img) => getImageNaturalHeight(img, columnWidthPx));
        const displayHeights = allocateIntegerHeights(naturalHeights, targetContentHeight);

        for (let i = 0; i < column.length; i++) {
            column[i].displayHeight = displayHeights[i];
            column[i].crop = Math.max(0, naturalHeights[i] - displayHeights[i]);
        }
    }

    return columnsRet;
}

function arrangeImagesIntoColumns(images, numColumns) {
    const columns = [];
    for (let k = 0; k < numColumns; k++) {
        columns.push([]);
    }

    for (const image of images) {
        columns[Math.floor(Math.random() * numColumns)].push(image);
    }

    return columns;
}

function getBadness(columns) {
    // Punish having to crop images to line up columns
    let badnessFromCrop = 0;
    for (const column of columns) {
        for (const img of column) {
            badnessFromCrop += (img.crop * IMAGE_CROP_COST) ** IMAGE_CROP_COST_GROWTH;
        }
    }

    let emptyColumnCost = 0;
    for (const column of columns) {
        if (column.length === 0) {
            emptyColumnCost += EMPTY_COLUMN_COST;
        }
    }

    return badnessFromCrop + emptyColumnCost;
}

function weightedPick(elements) {
    let totalWeight = 0;
    for (const el of elements) {
        totalWeight += el.weight ?? 0;
    }
    let pickedWeight = Math.random() * totalWeight;
    for (const el of elements) {
        pickedWeight -= el.weight ?? 0;
        if (pickedWeight < 0) {
            return el;
        }
    }
    return elements[Math.floor(Math.random() * elements.length)];
}

function pickRandomImages(count) {
    let imageSet = new Set();
    while (imageSet.size < count) {
        const pickedImage = weightedPick(GALLERY_IMAGES);
        imageSet.add(pickedImage);
    }
    return imageSet;
}

function shuffleArray(array) {
    for (var i = array.length - 1; i > 0; i--) {
        var j = Math.floor(Math.random() * (i + 1));
        var temp = array[i];
        array[i] = array[j];
        array[j] = temp;
    }
}
