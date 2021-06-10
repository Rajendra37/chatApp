import express from "express";
import user from "../models/UserModel";
import postModel from "../models/PostModel";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

export const adduser = async (req: any, res: any) => {
  const { Name, email, password } = req.body;
  if (!Name || !email || !password) {
    return res.status(401).json({ error: "plz filled the field" });
  }

  try {
    const userExist = await user.findOne({ email: email });
    if (userExist) {
      return res.status(422).json({ message: "email already present" });
    }

    const RegUser = new user({ Name, email, password });
    await RegUser.save();
    res.status(201).json({ message: "user added successfully" });
  } catch (error) {
    res.status(400).send(error);
  }
};

export const loginUser = async (req: any, res: any) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      return res.status(422).json({ error: "plz filled the field..." });
    }

    let userLogin = await user.findOne({ email: email });
    if (userLogin) {
      let isMatch = await bcrypt.compare(password, userLogin.password);
      if (!isMatch) {
        res.status(400).json({ error: "Invalid Cridentilas..." });
      } else {
        const token = await userLogin.genratetoken();
        res.cookie("token", token, { expires: new Date(Date.now() + 360000) });
        res.status(200).json({ name: userLogin.Name, email: userLogin.email });
      }
    } else {
      res.status(400).json({ error: "Invalid Cridentilas..." });
    }
  } catch (error) {
    res.status(400).send(error);
  }
};

export const CreatePost = async (req: any, res: any) => {
  try {
    const { Postbody, PostPhoto } = req.body;
    if (!Postbody || !PostPhoto) {
      return res.status(400).json({ error: "plz filled the field" });
    }
    req.user.password = undefined;
    const AddPost = new postModel({ Postbody, PostPhoto, PostedBy: req.user });
    await AddPost.save();
    res.status(201).json(AddPost);
  } catch (error) {
    res.status(400).send(error);
  }
};

export const getAllPost = async (req: any, res: any) => {
  try {
    let getPost = await postModel.find().populate("PostedBy", "_id Name")
    .populate("comments.PostedBy","_id Name")
    
    if (!getPost) {
      return res.status(404).json({ message: "No Post Available" });
    }
    res.status(200).send(getPost);
  } catch (error) {
    res.status(400).json({ error: "Somthing Wrong is Happend" });
  }
};

export const getPostOfOneUser = async (req: any, res: any) => {
  try {
    let getposts = await postModel
      .find({ PostedBy: req.user._id })
      .populate("PostedBy", "_id Name");
    if (!getposts) {
      return res.status(404).json({ message: "No Post Available" });
    }
    res.status(200).send(getposts);
  } catch (error) {
    console.log(error);

    res.status(400).json({ error: "Somthing Wrong is Happend" });
  }
};

export const userVerify = async (req: any, res: any) => {
  try {
    jwt.verify(req.cookies.token, process.env.SECRET_KEY, (error) => {
      if (!error) {
        res.status(200).send();
      } else {
        res.status(401).send();
      }
    });
  } catch (error) {
    res.status(401).send(error);
  }
};

export const logout = async (req: any, res: any) => {
  try {
    res.clearCookie("token", { path: "/" });
    res.status(200).json({ message: "logout" });
  } catch (error) {
    res.status(400).json({ error: "something wrong happened..." });
  }
};

export const getAlluser = async (req: any, res: any) => {
  try {
    let getUsre = await user.find();
    if (!getUsre) {
      return res.status(404).send({ message: "Users not  found" });
    }
    res.status(200).send(getUsre);
  } catch (error) {
    res.status(400).send({ error: "something wrong happend..." });
  }
};

export const likePost = async (req: any, res: any) => {
  try {
    let like = await postModel.findByIdAndUpdate(req.body.PostId, {
      $push: { likes: req.user._id },
    });
    if (!like) {
      return res.status(422).json({ error: "error" });
    }
    res.status(200).json(like);
  } catch (error) {
    res.status(400).send({ error: "something wrong happend..." });
  }
};

export const DislikePost = async (req: any, res: any) => {
  try {
    let Dislike = await postModel.findByIdAndUpdate(req.body.PostId, {
      $pull: { likes: req.user._id },
    });
    if (!Dislike) {
      return res.status(422).json({ error: "error" });
    }
    res.status(200).json(Dislike);
  } catch (error) {
    res.status(400).send({ error: "something wrong happend..." });
  }
};

export const CreateComment = async (req: any, res: any) => {
  const comment = {
    text: req.body.text,
    PostedBy: req.user._id,
  };

  try {
    let newComment = await postModel.findByIdAndUpdate(req.body.PostId, {
      $push: { comments:comment},
    }).populate("comments.PostedBy","_id Name")
    if (!newComment) {
      return res.status(422).json({ error: "error" });
    }
    res.status(200).json(newComment);
  } catch (error) {
  
    console.log(error)
    res.status(400).send({ error: "something wrong happend..." });
  }
};






