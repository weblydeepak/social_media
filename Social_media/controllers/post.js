import Post from '../models/post.js';
import User from '../models/UserSchema.js';

export const createPost = async (req, res) => {
    try {
      const { userId, description, picturePath } = req.body;
      const user = await User.findById(userId);
      const newPost = new Post({
        userId,
        firstName: user.firstName,
        lastName: user.lastName,
        location: user.location,
        description,
        userPicturePath: user.picturePath,
        picturePath,
        likes: {},
        comments: [],
      });
      await newPost.save();
  
      const post = await Post.find();
      res.status(201).json(post);
    } catch (err) {
      res.status(409).json({ message: err.message });
    }
  };
// to read 
export const getFeedPosts =async(req, res) => {
    
}
export const getUserPosts =async(req, res) => {
}
    // to update 
export const likePost =async(req, res) => {

}
