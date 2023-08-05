function isValidPackageJson(packageJson) {
    // TODO: Further enhance validation if required
    return packageJson && typeof packageJson === 'object' && !Array.isArray(packageJson) && packageJson.hasOwnProperty("dependencies");
}
exports.isValidPackageJson = isValidPackageJson;
