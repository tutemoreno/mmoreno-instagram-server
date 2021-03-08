import fs from 'fs';

import File from '../models/file.js';
import Post from '../models/post.js';

import path from 'path';

const __dirname = path.resolve();

export async function getImage(req, res) {
  const file = await File.findById(req.params.id);

  res.sendFile(path.join(__dirname, 'uploads', file.path));
}

export async function getPosts(req, res) {
  const search = req.query.search || '';

  const posts = await Post.find({ name: { $regex: search } });

  res.json({ posts });
}

export async function deletePost(req, res) {
  const post = await Post.findByIdAndDelete(req.params.id);

  try {
    fs.unlinkSync(path.join(__dirname, 'uploads', post.file.path));
    fs.unlinkSync(path.join(__dirname, 'thumbs', `${post.file.path}.png`));
  } catch (err) {
    console.error(err);
  } finally {
    res.json({ post });
  }
}

export async function deleteAllPosts(req, res) {
  const posts = await Posts.deleteMany({});

  for (const post of posts) {
    try {
      fs.unlinkSync(path.join(__dirname, 'uploads', post.file.path));
      fs.unlinkSync(path.join(__dirname, 'thumbs', `${post.file.path}.png`));
    } catch (err) {
      console.error(err);
    }
  }

  res.json({ posts });
}

export async function createPost(req, res) {
  const tmpFile = req.files.file,
    fileName = String(Date.now()),
    newPathFile = path.join('uploads', fileName);

  if (fs.existsSync(path.join(__dirname, 'uploads'))) {
    console.log('Directory exists!');
  } else {
    console.log('Directory not found.');
    fs.mkdirSync(path.join(__dirname, 'uploads'));
  }

  await tmpFile.mv(newPathFile);

  const post = new Post({
    path: fileName,
  });

  const fileSaved = await post.save();

  res.json({ post: fileSaved });
}
