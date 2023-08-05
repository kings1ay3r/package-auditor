const fs = require('fs');
const copyPaste = require('copy-paste');
const { spin } = require('./spin');
const { clearLastLine } = require('./clearLastLine');
const { getPackageInfo } = require('./getPackageInfo');
const { isValidPackageJson } = require('./isValidPackageJson');
const { getEmptySpaces } = require('./getEmptySpaces');


const { unparse } = require('papaparse');

// Function to convert an array of objects to CSV
function convertArrayToCSV(arrayData) {
  // Create the CSV string using papaparse
  const csvString = unparse(arrayData);

  return csvString;
}

function copyToClipboard(text) {
  copyPaste.copy(text);
}


function run() {


    if (process.argv.length < 3) {
        console.error('Error: Please provide the file name as a command-line argument.');
        process.exit(1);
    }

    const fileName = process.argv[2];
    fs.readFile(fileName, 'utf8', async (err, data) => {
        if (err) {
            console.error('Error reading the file:', err);
            process.exit(1);
        }

        try {
            const packageJson = JSON.parse(data);
            if (!isValidPackageJson(packageJson)) {
                console.error('Invalid package.json file');
                return;
            }
            const interval = setInterval(spin, 100);


            const packages = Object.entries(packageJson.dependencies || {}).map(([pkg, version]) => ({
                pkg,
                version,
            }));

            const promiseArray = [];
            for (const pkgInfo of packages) {
                promiseArray[pkgInfo.pkg] = getPackageInfo(pkgInfo);
            }
            const parsedData = await Promise.all(Object.values(promiseArray));
            clearInterval(interval);
            clearLastLine();


            console.log(getEmptySpaces(75, '='));
            console.log("| Package Name" + getEmptySpaces(12) + "| Version" + getEmptySpaces(3) + "| Latest Version" + getEmptySpaces(1) + "| license");
            console.log(getEmptySpaces(75, '='));
            parsedData.map(item => {
                const { name, latestVersion, currentVersion, license } = item;
                const namePadLength = 26 - name.length;
                const latestVersionPadLength = 18 - latestVersion.length;
                const currentVersionPadLength = 12 - currentVersion.length;
                console.log("+ " + name + getEmptySpaces(namePadLength) + currentVersion + getEmptySpaces(currentVersionPadLength) + latestVersion + getEmptySpaces(latestVersionPadLength) + license);
            });
            console.log(getEmptySpaces(75, '-'));

            copyToClipboard(convertArrayToCSV(parsedData))
            console.log("\n CSV Data Copied to Clipboard")
            console.log(getEmptySpaces(75, '='));

        } catch (error) {
            console.error('Error parsing the package.json file:', error.message);
        }
    });
}
exports.run = run;
