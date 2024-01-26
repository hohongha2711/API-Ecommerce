const cloudinary = require("cloudinary").v2;
const streamifier = require("streamifier");

cloudinary.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.API_KEY,
  api_secret: process.env.API_SECRET,
});

const uploadToCloudinary = (file) => {
    return new Promise((resolve, reject) => {
        let stream = cloudinary.uploader.upload_stream({ folder: "be_ecommerce" }, (error, result) => {
            if (result) {
                resolve(result);
            } else {
                reject(error);
            }
        });

        streamifier.createReadStream(file.buffer).pipe(stream);
    });
};

module.exports = uploadToCloudinary;