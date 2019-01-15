const path = require('path');
const { spawnSync } = require('child_process');
const fs = require('fs');
const BASE_APP_DIR = path.resolve(__dirname, '../');

const buildAlias = process.env.PRIOS_RELEASE_KEY_ALIAS || 'xtest-android-signing-key';
const keyStoreFilename = process.env.PRIOS_RELEASE_STORE_FILENAME || `${buildAlias}.keystore`;
const keyStorePath = `${BASE_APP_DIR}/android/app/${keyStoreFilename}`;

const keystoreFileExists = fs.existsSync(keyStorePath);

if(keystoreFileExists) {
    fs.unlinkSync(keyStorePath);
}

const keyToolCmdArgs = ["-genkey", "-v", "-keystore", keyStorePath, 
"-alias", buildAlias, "-keyalg", "RSA", "-keysize", "2048", "-validity", "10000"];

const spawnResult = spawnSync('keytool', keyToolCmdArgs, { stdio: 'inherit' });

if(spawnResult.error) {
    console.error("ERROR > keytool command failed:", spawnResult.error.stack);
    process.exit(1);
} else {
    console.log(`New Android private signing key generated succesfully: ${keyStorePath}`);
}