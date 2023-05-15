const wait = (delay) => new Promise((resolve) => setTimeout(() => {resolve(); console.log('delay', delay)}, delay));

module.exports = wait;
