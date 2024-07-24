const Image = require('../models/image');

const postimage = async (req, res) => {
    try {
        const frontImagePath = req.files.frontImage[0].path;
        const doctorImagePath = req.files.doctorImage[0].path;

        const image = new Image({
            frontimage: frontImagePath,
            doctorimage: doctorImagePath
        });

        await image.save();
        res.status(201).json(image);
    } catch (error) {
        console.error(error);
        res.status(500).send({ message: 'Server error' });
    }
}

module.exports = { postimage };
