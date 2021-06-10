"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var mongoose_1 = __importDefault(require("mongoose"));
var ObjectId = mongoose_1.default.Schema.Types.ObjectId;
var chatRoomSchema = new mongoose_1.default.Schema({
    ChatRoomOwnerId: {
        type: String,
    },
    ChatRoomOwner: {
        type: ObjectId,
        unique: true,
        ref: "user"
    },
    Chat: [],
});
var chaRoomModel = mongoose_1.default.model('chatRoom', chatRoomSchema);
exports.default = chaRoomModel;
