const {Images} = require('../models/image-model');
const cloudinary = require("../helpers/image-uploader");

exports.UploadImage = async (imagePath) => {
    const uploadResult = await cloudinary.uploader.upload(imagePath);
    const image = new Images({
        imgUrl : uploadResult.url
    })
    const uploadedImage = await image.save();
    return uploadedImage;
}

exports.deleteImage = async (url,id) => {
    const imageUrl = url.split("/");
    await cloudinary.uploader.destroy(
        imageUrl[imageUrl.length - 1].split(".")[0]
    );
    await Images.findByIdAndRemove(id);
    return true
}
