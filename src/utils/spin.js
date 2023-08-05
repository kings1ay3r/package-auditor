const spinnerFrames = ['-', '\\', '|', '/'];
let currentFrameIndex = 0;
function spin() {
    process.stdout.write(`\r${spinnerFrames[currentFrameIndex]} Processing... `);
    currentFrameIndex = (currentFrameIndex + 1) % spinnerFrames.length;
}
exports.spin = spin;
