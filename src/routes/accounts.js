import { Router } from 'express';
// import {
//   uploadVideo,
//   getVideo,
//   getVideos,
//   deleteVideo,
//   deleteAllVideos,
//   getThumb,
// } from '../controllers/videos.controller.js';

const router = Router();

router.post('/', function (req, res) {
  console.log('llega');
  res.json({});
});

export default router;
