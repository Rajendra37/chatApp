"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var mongoose_1 = __importDefault(require("mongoose"));
var ObjectId = mongoose_1.default.Schema.Types.ObjectId;
var PostSchema = new mongoose_1.default.Schema({
    Postbody: {
        type: String,
        required: true
    },
    PostPhoto: {
        type: String,
        required: true
    },
    likes: [{
            type: ObjectId,
            ref: "user"
        }],
    comments: [{
            text: String,
            PostedBy: {
                type: ObjectId,
                ref: "user"
            }
        }],
    PostedBy: {
        type: ObjectId,
        ref: "user"
    }
});
var postModel = mongoose_1.default.model('Post', PostSchema);
exports.default = postModel;
