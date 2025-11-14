const mongoose = require("mongoose");

const DB_URL = "mongodb://localhost:27017/chat-app";

const groupSchema = mongoose.Schema({
    name: String,
    image: { type: String, default: "default-group-image.png" },
    users: [{ type: mongoose.Schema.Types.ObjectId, ref: "user" }]
});

const Group = mongoose.model("group", groupSchema);
exports.createGroup = async data => {
    try {
        await mongoose.connect(DB_URL);
        let group = new Group(data);
        let groupData = await group.save();
        return groupData._id;
    } catch (error) {
     
        throw new Error(error);
    }
};
exports.getUserGroups = async userId => {
    try {
        await mongoose.connect(DB_URL);
        let groups = await Group.find({
            users: {
                $all: [userId]
            }
        });

        return groups;
    } catch (error) {
      
        throw new Error(error);
    }
};

exports.getGroupInfo = async groupId => {
    try {
        await mongoose.connect(DB_URL);
        let group = await Group.findById(groupId).populate({
            path: "users",
            model: "user",
            select: "username image"
        });
     

        return group;
    } catch (error) {
  
        throw new Error(error);
    }
};