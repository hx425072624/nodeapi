if (process.env.NODE_ENV !== 'production') {
    require('dotenv').load();
}

const azureStorage = require('azure-storage')
    , blobService = azureStorage.createBlobService()
    , containerName = process.env.CONTAINER_NAME;

const getBlobName = originalName => {
    const identifier = Math.random().toString().replace(/0\./, ''); // remove "0." from start of string
    return `${identifier}-${originalName}`;
};

exports.upload = ( originalName, stream, streamLength) => {
    return new Promise((resolve, reject) => {
        const blobName = getBlobName(originalName);
        blobService.createBlockBlobFromStream(containerName, blobName, stream, streamLength, err => {
            if (err) {
                reject(err);
            } else {
                resolve(blobName);
            }
        });
    });
};
