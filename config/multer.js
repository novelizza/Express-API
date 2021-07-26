const multer = require('multer');
// const path = require('path');
// require and configure dotenv, will load vars in .env in PROCESS.ENV
// require('dotenv').config();

const storages = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, `${process.env.ASSETS_ORIGINAL_PATH}/${file.fieldname}/`);
    },
    filename: (req, file, cb) => {
        cb(null, `${Date.now()}-${file.originalname.replace(/\s/g, '-')}`);
    },
});
const upload = multer({
    storage: storages,
    // fileFilter: (req, file, cb) => {
    //     const ext = path.extname(file.originalname);
// if (ext !== '.png' && ext !== '.jpg' && ext !== '.gif' && ext !== '.jpeg' && ext !== '.mp4') {
    //         req.fileValidationError = 'Exetendion not alloewed';
    //         return cb(null, false, req.fileValidationError);
    //         // return cb(new Error('Only image are allowed'), false);
    //     }
    //     return cb(null, true);
    // },
});

export default upload;
