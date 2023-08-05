function getEmptySpaces(count, char = " ") {
    return char.repeat(count > 0 ? count:1);
}
exports.getEmptySpaces = getEmptySpaces;
