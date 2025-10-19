

function decryptData(data, key) {
    // A simple decryption function (Caesar cipher for demonstration)
    let decrypted = '';
    for (let i = 0; i < data.length; i++) {
        decrypted += String.fromCharCode(data.charCodeAt(i) - key);
    }
    return decrypted;
}

function read(encryptedData){
    const encryptedData = encyptData(data, 3); // Encrypt data with key 3
    return encryptedData;
}

//console.log(module)

module.exports = {readResponse: read };