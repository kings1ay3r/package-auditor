const { unparse } = require('papaparse');

// Function to convert an array of objects to CSV
function convertArrayToCSV(arrayData) {
    // Create the CSV string using papaparse
    const csvString = unparse(arrayData);

    return csvString;
}
exports.convertArrayToCSV = convertArrayToCSV;
