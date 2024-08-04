const fs = require('fs');
const path = require('path');

const numFiles = 30000; // Number of files to generate
const baseDir = './srv'; // Base directory to store the files
const fileSize = 102400; // Size of each file in bytes (100 KB)

// Create the directory structure
const directories = [
    baseDir,
    `${baseDir}/_i18n`,
    `${baseDir}/odata/v4`
];

directories.forEach(dir => {
    if (!fs.existsSync(dir)){
        fs.mkdirSync(dir, { recursive: true });
    }
});

// Generate dummy files
for (let i = 0; i < numFiles; i++) {
    const filePath = path.join(baseDir, `file${i}.js`);
    const content = 'A'.repeat(fileSize); // Fill each file with 'A' to reach the desired size
    fs.writeFileSync(filePath, content);
}

// Generate specific files with valid JSON for .json files
const specificFiles = [
    { path: 'generateFiles.js', content: 'A'.repeat(fileSize) },
    { path: 'package.json', content: 'A'.repeat(fileSize) },
    { path: '_i18n/i18n.json', content: JSON.stringify({ "key": "A".repeat(fileSize - 10) }) },
    { path: 'admin-service.js', content: 'A'.repeat(fileSize) },
    { path: 'cat-service copy.js', content: 'A'.repeat(fileSize) },
    { path: 'cat-service.js', content: 'A'.repeat(fileSize) },
    { path: 'csn.json', content: JSON.stringify({ "key": "A".repeat(fileSize - 10) }) },
    { path: 'odata/v4/AdminService.xml', content: 'A'.repeat(fileSize) },
    { path: 'odata/v4/CatalogService.xml', content: 'A'.repeat(fileSize) },
    { path: 'odata/v4/UserService.xml', content: 'A'.repeat(fileSize) },
    { path: 'user-service.js', content: 'A'.repeat(fileSize) }
];

specificFiles.forEach(file => {
    const filePath = path.join(baseDir, file.path);
    fs.writeFileSync(filePath, file.content);
});

console.log(`${numFiles + specificFiles.length} files created in ${baseDir}`);
