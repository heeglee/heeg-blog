const mongoose = require('mongoose');

const { Schema } = mongoose;

const PostSchema = new Schema({
    title: String,
    body: String,
    tags: [String],
    publishedDate: {
        type: Date,
        default: Date.now,
    },
    user: {
        _id: mongoose.Types.ObjectId,
        username: String,
    },
    // comment: [CommentSchema],
});

/* comment schema
const CommentSchema = new Schema({
    user: {
        _id: mongoose.Types.ObjectId,
        username: String,
    },
    commentBody: String,
    commentDate: {
        type: Date,
        default: Date.now,
    }
});
*/

const Post = mongoose.model('Post', PostSchema);
module.exports = Post;