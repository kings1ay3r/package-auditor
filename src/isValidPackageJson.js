function isValidPackageJson(packageJson) {
    return packageJson && typeof packageJson === 'object' && !Array.isArray(packageJson);
}
exports.isValidPackageJson = isValidPackageJson;
