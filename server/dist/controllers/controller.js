"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CreateComment = exports.DislikePost = exports.likePost = exports.getAlluser = exports.logout = exports.userVerify = exports.getPostOfOneUser = exports.getAllPost = exports.CreatePost = exports.loginUser = exports.adduser = void 0;
var UserModel_1 = __importDefault(require("../models/UserModel"));
var PostModel_1 = __importDefault(require("../models/PostModel"));
var bcrypt_1 = __importDefault(require("bcrypt"));
var jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
var adduser = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var _a, Name, email, password, userExist, RegUser, error_1;
    return __generator(this, function (_b) {
        switch (_b.label) {
            case 0:
                _a = req.body, Name = _a.Name, email = _a.email, password = _a.password;
                if (!Name || !email || !password) {
                    return [2 /*return*/, res.status(401).json({ error: "plz filled the field" })];
                }
                _b.label = 1;
            case 1:
                _b.trys.push([1, 4, , 5]);
                return [4 /*yield*/, UserModel_1.default.findOne({ email: email })];
            case 2:
                userExist = _b.sent();
                if (userExist) {
                    return [2 /*return*/, res.status(422).json({ message: "email already present" })];
                }
                RegUser = new UserModel_1.default({ Name: Name, email: email, password: password });
                return [4 /*yield*/, RegUser.save()];
            case 3:
                _b.sent();
                res.status(201).json({ message: "user added successfully" });
                return [3 /*break*/, 5];
            case 4:
                error_1 = _b.sent();
                res.status(400).send(error_1);
                return [3 /*break*/, 5];
            case 5: return [2 /*return*/];
        }
    });
}); };
exports.adduser = adduser;
var loginUser = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var _a, email, password, userLogin, isMatch, token, error_2;
    return __generator(this, function (_b) {
        switch (_b.label) {
            case 0:
                _b.trys.push([0, 8, , 9]);
                _a = req.body, email = _a.email, password = _a.password;
                if (!email || !password) {
                    return [2 /*return*/, res.status(422).json({ error: "plz filled the field..." })];
                }
                return [4 /*yield*/, UserModel_1.default.findOne({ email: email })];
            case 1:
                userLogin = _b.sent();
                if (!userLogin) return [3 /*break*/, 6];
                return [4 /*yield*/, bcrypt_1.default.compare(password, userLogin.password)];
            case 2:
                isMatch = _b.sent();
                if (!!isMatch) return [3 /*break*/, 3];
                res.status(400).json({ error: "Invalid Cridentilas..." });
                return [3 /*break*/, 5];
            case 3: return [4 /*yield*/, userLogin.genratetoken()];
            case 4:
                token = _b.sent();
                res.cookie("token", token, { expires: new Date(Date.now() + 360000) });
                res.status(200).json({ name: userLogin.Name, email: userLogin.email });
                _b.label = 5;
            case 5: return [3 /*break*/, 7];
            case 6:
                res.status(400).json({ error: "Invalid Cridentilas..." });
                _b.label = 7;
            case 7: return [3 /*break*/, 9];
            case 8:
                error_2 = _b.sent();
                res.status(400).send(error_2);
                return [3 /*break*/, 9];
            case 9: return [2 /*return*/];
        }
    });
}); };
exports.loginUser = loginUser;
var CreatePost = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var _a, Postbody, PostPhoto, AddPost, error_3;
    return __generator(this, function (_b) {
        switch (_b.label) {
            case 0:
                _b.trys.push([0, 2, , 3]);
                _a = req.body, Postbody = _a.Postbody, PostPhoto = _a.PostPhoto;
                if (!Postbody || !PostPhoto) {
                    return [2 /*return*/, res.status(400).json({ error: "plz filled the field" })];
                }
                req.user.password = undefined;
                AddPost = new PostModel_1.default({ Postbody: Postbody, PostPhoto: PostPhoto, PostedBy: req.user });
                return [4 /*yield*/, AddPost.save()];
            case 1:
                _b.sent();
                res.status(201).json(AddPost);
                return [3 /*break*/, 3];
            case 2:
                error_3 = _b.sent();
                res.status(400).send(error_3);
                return [3 /*break*/, 3];
            case 3: return [2 /*return*/];
        }
    });
}); };
exports.CreatePost = CreatePost;
var getAllPost = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var getPost, error_4;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 2, , 3]);
                return [4 /*yield*/, PostModel_1.default.find().populate("PostedBy", "_id Name")
                        .populate("comments.PostedBy", "_id Name")];
            case 1:
                getPost = _a.sent();
                if (!getPost) {
                    return [2 /*return*/, res.status(404).json({ message: "No Post Available" })];
                }
                res.status(200).send(getPost);
                return [3 /*break*/, 3];
            case 2:
                error_4 = _a.sent();
                res.status(400).json({ error: "Somthing Wrong is Happend" });
                return [3 /*break*/, 3];
            case 3: return [2 /*return*/];
        }
    });
}); };
exports.getAllPost = getAllPost;
var getPostOfOneUser = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var getposts, error_5;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 2, , 3]);
                return [4 /*yield*/, PostModel_1.default
                        .find({ PostedBy: req.user._id })
                        .populate("PostedBy", "_id Name")];
            case 1:
                getposts = _a.sent();
                if (!getposts) {
                    return [2 /*return*/, res.status(404).json({ message: "No Post Available" })];
                }
                res.status(200).send(getposts);
                return [3 /*break*/, 3];
            case 2:
                error_5 = _a.sent();
                console.log(error_5);
                res.status(400).json({ error: "Somthing Wrong is Happend" });
                return [3 /*break*/, 3];
            case 3: return [2 /*return*/];
        }
    });
}); };
exports.getPostOfOneUser = getPostOfOneUser;
var userVerify = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    return __generator(this, function (_a) {
        try {
            jsonwebtoken_1.default.verify(req.cookies.token, process.env.SECRET_KEY, function (error) {
                if (!error) {
                    res.status(200).send();
                }
                else {
                    res.status(401).send();
                }
            });
        }
        catch (error) {
            res.status(401).send(error);
        }
        return [2 /*return*/];
    });
}); };
exports.userVerify = userVerify;
var logout = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    return __generator(this, function (_a) {
        try {
            res.clearCookie("token", { path: "/" });
            res.status(200).json({ message: "logout" });
        }
        catch (error) {
            res.status(400).json({ error: "something wrong happened..." });
        }
        return [2 /*return*/];
    });
}); };
exports.logout = logout;
var getAlluser = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var getUsre, error_6;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 2, , 3]);
                return [4 /*yield*/, UserModel_1.default.find()];
            case 1:
                getUsre = _a.sent();
                if (!getUsre) {
                    return [2 /*return*/, res.status(404).send({ message: "Users not  found" })];
                }
                res.status(200).send(getUsre);
                return [3 /*break*/, 3];
            case 2:
                error_6 = _a.sent();
                res.status(400).send({ error: "something wrong happend..." });
                return [3 /*break*/, 3];
            case 3: return [2 /*return*/];
        }
    });
}); };
exports.getAlluser = getAlluser;
var likePost = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var like, error_7;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 2, , 3]);
                return [4 /*yield*/, PostModel_1.default.findByIdAndUpdate(req.body.PostId, {
                        $push: { likes: req.user._id },
                    })];
            case 1:
                like = _a.sent();
                if (!like) {
                    return [2 /*return*/, res.status(422).json({ error: "error" })];
                }
                res.status(200).json(like);
                return [3 /*break*/, 3];
            case 2:
                error_7 = _a.sent();
                res.status(400).send({ error: "something wrong happend..." });
                return [3 /*break*/, 3];
            case 3: return [2 /*return*/];
        }
    });
}); };
exports.likePost = likePost;
var DislikePost = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var Dislike, error_8;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 2, , 3]);
                return [4 /*yield*/, PostModel_1.default.findByIdAndUpdate(req.body.PostId, {
                        $pull: { likes: req.user._id },
                    })];
            case 1:
                Dislike = _a.sent();
                if (!Dislike) {
                    return [2 /*return*/, res.status(422).json({ error: "error" })];
                }
                res.status(200).json(Dislike);
                return [3 /*break*/, 3];
            case 2:
                error_8 = _a.sent();
                res.status(400).send({ error: "something wrong happend..." });
                return [3 /*break*/, 3];
            case 3: return [2 /*return*/];
        }
    });
}); };
exports.DislikePost = DislikePost;
var CreateComment = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var comment, newComment, error_9;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                comment = {
                    text: req.body.text,
                    PostedBy: req.user._id,
                };
                _a.label = 1;
            case 1:
                _a.trys.push([1, 3, , 4]);
                return [4 /*yield*/, PostModel_1.default.findByIdAndUpdate(req.body.PostId, {
                        $push: { comments: comment },
                    }).populate("comments.PostedBy", "_id Name")];
            case 2:
                newComment = _a.sent();
                if (!newComment) {
                    return [2 /*return*/, res.status(422).json({ error: "error" })];
                }
                res.status(200).json(newComment);
                return [3 /*break*/, 4];
            case 3:
                error_9 = _a.sent();
                console.log(error_9);
                res.status(400).send({ error: "something wrong happend..." });
                return [3 /*break*/, 4];
            case 4: return [2 /*return*/];
        }
    });
}); };
exports.CreateComment = CreateComment;
