const fs = require('fs');
const { spin } = require('./spin');
const { clearLastLine } = require('./clearLastLine');
const { getPackageInfo } = require('./getPackageInfo');
const { isValidPackageJson } = require('./isValidPackageJson');
const { getEmptySpaces } = require('./getEmptySpaces');

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
                const { name, latVer, currVer, license } = item;
                const namePadLength = 26 - name.length;
                const latVerPadLength = 18 - latVer.length;
                const currVerPadLength = 12 - currVer.length;
                console.log("+ " + name + getEmptySpaces(namePadLength) + currVer + getEmptySpaces(currVerPadLength) + latVer + getEmptySpaces(latVerPadLength) + license);
            });
            console.log(getEmptySpaces(75, '-'));

        } catch (error) {
            console.error('Error parsing the package.json file:', error.message);
        }
    });
}
exports.run = run;
