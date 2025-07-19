


const cache = {};


const getCache = (key) => {
    return cache[key];
}

const setCache = (key, value, ttlMs) => {
    cache[key] = value;
    setTimeout(() => {
        delete cache[key];
    }, ttlMs);
};

const clearCache = (key) => {
    if (key) {
        delete cache[key];
    } else {
        for (const k in cache) {
            delete cache[k];
        }
    }
}


module.exports = {
    getCache,
    setCache,
    clearCache
};