
import bandNames from '../data/bandNames.json';
import causeOfDeathData from '../data/causesOfDeath.json';

function getDayIndex(n) {
  const today = new Date();
  const utcMidnight = Date.UTC(today.getUTCFullYear(), today.getUTCMonth(), today.getUTCDate());
  const daysSinceEpoch = Math.floor(utcMidnight / (1000 * 60 * 60 * 24));

  return daysSinceEpoch % n;
}

function pickFromList(list) {
    return list[getDayIndex(list.length)];
}

function pickFromListRandom(list) {
    return list[Math.floor(Math.random() * list.length)];
}

export function getTomBandName() {
    return pickFromList(bandNames);
}

export function getCauseOfDeath() {
    const party = pickFromListRandom(causeOfDeathData.parties);
    const thing1 = pickFromListRandom(causeOfDeathData.things1);
    const thing2 = pickFromListRandom(causeOfDeathData.things2);

    return `${party}, ${thing1}, and ${thing2}`
}
