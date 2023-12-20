const {
  handleUpload,
  getFileName,
  getFileNames,
} = require("../middlewares/upload");

const singleUpload = async (req, res) => {
  try {
    const path = await getFileName(req, res);
    const cldRes = await handleUpload(path);
    res.send({ url: cldRes });
  } catch (error) {
    res.status(500).send("Cannot upload image");
  }
};
const multipleUpload = async (req, res) => {
  try {
    const urls = [];
    const files = await getFileNames(req, res);
    
    for (const file of files) {
      const newPath = await handleUpload(file);
      urls.push(newPath);
    }
    return({ images: urls })
  } catch (error) {
    console.log("error multiple upload", error);
    res.status(500).send("Cannot upload images");
  }
};

module.exports = {singleUpload, multipleUpload}
