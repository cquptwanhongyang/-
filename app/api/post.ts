// pages/api/posts.ts

import { NextApiRequest, NextApiResponse } from "next";
import clientPromise from "../../lib/mongodb";

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  const client = await clientPromise;
  const db = client.db();

  if (req.method === "GET") {
    try {
      const posts = await db.collection("posts").find().toArray();
      res.status(200).json(posts);
    } catch (error) {
      res.status(500).json({ error: "Failed to fetch posts" });
    }
  } else if (req.method === "POST") {
    try {
      const { title, content } = req.body;
      const newPost = { title, content, createdAt: new Date() };
      const result = await db.collection("posts").insertOne(newPost);
      res.status(201).json(result.ops[0]);
    } catch (error) {
      res.status(500).json({ error: "Failed to create post" });
    }
  } else {
    res.status(405).json({ error: "Method not allowed" });
  }
};

export default handler;
