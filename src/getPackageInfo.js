const axios = require('axios');
const NPM_BASEPATH = "https://registry.npmjs.org/";

async function getPackageInfo(pkgInfo) {
    try {
        const response = await axios.get(`${NPM_BASEPATH}${pkgInfo.pkg}`);
        const returnData = {
            name: pkgInfo.pkg,
            currVer: pkgInfo.version,
            latVer: response.data['dist-tags'].latest,
            license: response.data.license
        };
        return returnData;
    } catch (error) {
        console.error(`Error fetching information for package ${pkgInfo.pkg}:`, error.message);
    }
}
exports.getPackageInfo = getPackageInfo;
