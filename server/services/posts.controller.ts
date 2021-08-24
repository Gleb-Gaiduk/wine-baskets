import * as express from 'express';

interface Post {
  author: string;
  content: string;
  title: string;
}

module.exports = class PostsController {
  public path = '/posts';
  public router = express.Router();

  private posts: Array<Post> = [
    {
      author: 'Marcin',
      content: 'Dolor sit amet',
      title: 'Lorem Impdqw',
    },
  ];

  constructor() {
    this.initializeRoutes();
  }

  public initializeRoutes() {
    this.router.get(this.path, this.getAllPosts);
    this.router.post(this.path, this.createPost);
  }

  getAllPosts = (req: express.Request, res: express.Response) => {
    res.send(this.posts);
  };

  createPost = (req: express.Request, res: express.Response) => {
    const post: Post = req.body;
    this.posts.push(post);
    res.send(post);
  };
};
