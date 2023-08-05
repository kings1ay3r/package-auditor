function clearLastLine() {
    process.stdout.write('\r\x1B[K'); // Move the cursor to the beginning of the line and clear it
}
exports.clearLastLine = clearLastLine;
