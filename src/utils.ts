// Local PRNG: does not affect Math.random.
const seedrandom = require('seedrandom');

export const prettify = (id: string) => {
    const rng = seedrandom(id);
    return ("00000" + rng()).slice(-5);
}