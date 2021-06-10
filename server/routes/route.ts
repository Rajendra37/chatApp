import express from "express";
const controller = require("../controllers/controller");
const authorization=require('../middleware/Authentication')
const charoomController=require('../controllers/ChatRoomController')

const router = express.Router();

router.post("/RegUser", controller.adduser);
router.post("/loginUser", controller.loginUser);
router.post('/create',authorization,controller.CreatePost)
router.get('/getallPost',controller.getAllPost)
router.get('/getPostOfOneUser',authorization,controller.getPostOfOneUser)
router.get('/checktoken',controller.userVerify)
router.get('/logout',controller.logout)
router.get('/alluser',controller.getAlluser)

router.put('/like',authorization,controller.likePost)
router.put('/Unlike',authorization,controller.DislikePost)
router.put('/commnet',authorization,controller.CreateComment)



router.put('/chatSetup/:id',authorization,charoomController.setUpChatRoom)
router.get('/getChatRoom/:id',charoomController.getChatroomId)
router.get('/getChatRoomOwner',authorization,charoomController.getChatroomOwner)

export default router;
