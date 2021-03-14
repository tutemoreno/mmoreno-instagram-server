import fs from 'fs';

import Post from '../models/post.js';

import path from 'path';

const __dirname = path.resolve();

export async function getImage(req, res) {
  const post = await Post.findById(req.params.id);

  res.sendFile(path.join(__dirname, 'uploads', post.fileName));
}

export async function getPosts(req, res) {
  const search = req.query.search || '';

  const posts = await Post.find({ description: { $regex: search } });

  console.log(posts);

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
    { description, uuid } = req.body;

  const post = new Post({
    fileName: uuid,
    description,
    owner: req.AUTH.USER_ID,
  });

  try {
    const postSaved = await post.save();

    await tmpFile.mv(path.join('uploads', uuid));

    res.json({ post: postSaved });
  } catch (error) {
    res.json(error);
  }
}
