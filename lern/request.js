function encyptData(data, key) {
    // A simple encryption function (Caesar cipher for demonstration)
    let encrypted = '';
    for (let i = 0; i < data.length; i++) {
        encrypted += String.fromCharCode(data.charCodeAt(i) + key);
    }
    return encrypted;
}


function sendToUrl(url,data){
    const encryptedData = encyptData(data, 3); // Encrypt data with key 3
    const http = require('https'); // require('http')
    const req = http.request(url, { method: 'POST' }, (res) => {
        let responseData = '';
        res.on('data', (chunk) => {
            responseData += chunk;
        });
        res.on('end', () => {
            console.log('Response from server:', responseData);
        });
    }).on('error', (err) => {
        console.error(`Error in sending request: ${err.message}`);
    });
    req.write(encryptedData);
    req.end();
}


function send(data){
    const encryptedData = encyptData(data, 3); // Encrypt data with key 3
    return encryptedData;
}
module.exports.REQUEST_TIMEOUT = 444
module.exports = { send };