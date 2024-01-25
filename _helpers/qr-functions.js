const QRCode = require('qrcode');


module.exports = {
    generateQRCode
};

async function generateQRCode(data) {
    const qrURI = await QRCode.toDataURL(data);
    // console.log(qrURI);
    return qrURI;
}