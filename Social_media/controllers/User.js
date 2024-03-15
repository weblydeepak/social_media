import User from "../models/UserSchema.js";

// reads 
export const getUser = async(req,res)=>{
    try {
        const {id}= req.params;
        const user = await User.findById(id);
        res.status(200).josn({user});
    } catch (err) {
        res.status(500).josn({
            err: err.message
        });
    }
}

export const getUserFriends = async(req,res) => {
    try {
    const {id}= req.params;
    const user = await User.findById(id);
    
    const friends = await Promise.all(
        user.friends.map((id)=>User.findById(id))
    );
    const formattedFriends = friends.map(
        ({  _id,
             firstName,
              lastName,
               occupation,
                location,
                 picturePath })=>{
                    return {
                        id:_id,
                        firstName,
                        lastName,
                        occupation,
                        location,
                        picturePath
                    }
                 });
    res.status(200).josn(formattedFriends);
}
    catch (err) {
        res.status(500).josn({
            err: err.message
        });
    }
    
}

// update way 
export const addRemoveFriend = async(req,res)=>{
try {
    const {id,friendId} = req.params;
    const user = await User.findById(id);
    const friend = await User.findById(friendId);
    if(user.friends.includes(friendId)){
        user.friends = user.friends.filter((id) => id !== friendId);
        friend.friends = friend.friends.filter((id) => id !== id);
       }
       await user.save();
       await friend.save();
       const friends = await Promise.all(
        user.friends.map((id) => User.findById(id))
      );
      const formattedFriends = friends.map(
        ({ _id, firstName, lastName, occupation, location, picturePath }) => {
          return { _id, firstName, lastName, occupation, location, picturePath };
        }
      );
  
      res.status(200).json(formattedFriends);
} catch (err) {
    res.status(404).josn({
        message: err.message
    })
}
}











