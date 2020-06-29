// const sharp = require('sharp');
// const User = require('../models/User');

// exports.uploadAvatar = async (req, res) => {
//   const buffer = await sharp(req.file.buffer).resize({ width: 250, height: 250 }).png().toBuffer();
//   req.user.avatar = buffer;
//   await req.user.save();
//   res.send();
// };

// exports.multerErrHandler = (err, req, res, next) => {
//   res.status(400).json({ error: `Error: ${err.message}` });
// };

// exports.deleteAvatar = async (req, res) => {
//   req.user.avatar = undefined;
//   await req.user.save();
//   res.send();
// };

// exports.getAvatar = (req, res) => {
//   try {
//     const user = req.profile;
//     if (!user || !user.avatar) {
//       throw new Error();
//     }
//     res.set('Content-Type', 'image/png');
//     res.send(user.avatar);
//   } catch (err) {
//     res.status(400).json({
//       error: `Error: ${err}`
//     });
//   }
// };
