const copyPaste = require('copy-paste');

function copyToClipboard(text) {
    copyPaste.copy(text);
}
exports.copyToClipboard = copyToClipboard;
