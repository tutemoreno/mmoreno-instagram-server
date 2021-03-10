import fs from 'fs';

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
    fs.unlinkSync(path.join(__dirname, 'uploads', post.fileName));
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
    } catch (err) {
      console.error(err);
    }
  }

  res.json({ posts });
}

export async function createPost(req, res) {
  const tmpFile = req.files.file,
    fileName = String(Date.now()),
    filePath = path.join('uploads', fileName),
    { description } = req.body;

  const post = new Post({ fileName, description });

  try {
    const fileSaved = await post.save();

    if (!fs.existsSync(path.join(__dirname, 'uploads'))) {
      fs.mkdirSync(path.join(__dirname, 'uploads'));
    }

    await tmpFile.mv(filePath);

    res.json({ post: fileSaved });
  } catch (error) {
    res.json(error);
  }
}
