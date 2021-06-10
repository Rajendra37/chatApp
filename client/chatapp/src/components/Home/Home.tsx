import React, { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import { HandThumbsUp, HandThumbsDown,ChatDotsFill } from "react-bootstrap-icons";
import "./home.css";
import { service } from "../../service/service";
import { useDispatch } from "react-redux";
import "bootstrap/dist/css/bootstrap.css";
import { useSelector } from "react-redux";

export default function Home() {
  const history = useHistory();
  const dispatch = useDispatch();
  const [commentBox, setcommentBox] = useState(false)
  const [image, setimage] = useState("");
  const [MyPost, setMypost] = useState([]);
  const [like, setlike] = useState([]);
  const [comment, setcomment] = useState("");

  let srObj = new service();
  const [PostBody, setPostBody] = useState("");

  const allpost = useSelector((posts: any) =>
    posts.UserReducer.allpost.reverse()
  );

  useEffect(() => {
    srObj.getAllpost(dispatch);
  }, [like, MyPost, comment]);

  const submitFormdata = async (e: any) => {
    e.preventDefault();

    let data = new FormData();
    data.append("file", image);
    data.append("upload_preset", "chat-app");
    data.append("cloud_name", "chat-cloud-by-rajendra");

    let response = await fetch(
      "https://api.cloudinary.com/v1_1/chat-cloud-by-rajendra/image/upload",
      {
        method: "POST",
        body: data,
      }
    );
    let newUrl = await response.json();
    let submitResponse = await srObj.createPost(dispatch, PostBody, newUrl.url);
    if (submitResponse.status == 201) {
      alert("post added....");
      setMypost(allpost);
    }
  };

  const HitLike = (id: any) => {
    srObj.likePost(id);
    setlike(id);
  };
  const disLike = (id: any) => {
    srObj.dislike(id);
    setlike([]);
  };

  console.log("mypost", allpost);

  const postComment = (id: any) => {
    srObj.makeComment(dispatch, comment, id);
    setcomment("");
  };

  const showcomments=(e:any)=>{
    e.preventDefault();
    setcommentBox(true)
  }
  return (
    <div className="Main-div-of_profile">
      <div className="card-one">
        <span className="card-body">
          <form>
            <textarea
              className="form-control"
              onChange={(e: any) => {
                setPostBody(e.target.value);
              }}
            />
            <input
              type="file"
              className="form-control"
              onChange={(e: any) => {
                setimage(e.target.files[0]);
              }}
            />
            <button className="btn" onClick={submitFormdata}>
              Add Post
            </button>
          </form>
        </span>
      </div>

      {allpost.map((postData: any) => {
        return (
          <div className="card-two ">
            <h6 className="list-group-item list-group-item">
              {postData.PostedBy.Name}
            </h6>

            <div className="card-body list-group-item list-group-item-action list-group-item-action">
              <p>{postData.Postbody}</p>
              <img src={postData.PostPhoto} height="100%" width="100%" alt="" />
            </div>
            <div className="Like-div">
              <p>
              <HandThumbsUp
              size={20}
                color="white"
                onClick={(e: any) => {
                  e.preventDefault();
                  HitLike(postData._id);
                }}
              />
              </p>
              <p>
              <HandThumbsDown
              size={20}
                color="white"
                onClick={(e: any) => {
                  e.preventDefault();
                  disLike(postData._id);
                }}
              />
              </p>
              <p>
              <ChatDotsFill size={20} onClick={showcomments}/>
              </p>
            </div>
            <p>{postData.likes.length} Likes</p>
              
              {commentBox ? <div>
            {postData.comments.map((cData: any) => {
              return (
                <div>
                  <p>{cData.PostedBy.Name}</p>
                  <p>{cData.text}</p>
                </div>
              );
            })}

            <div className="comment-div">
              <input
                type="text"
                className="form-control"
                name="comment"
                onChange={(e: any) => {
                  setcomment(e.target.value);
                }}
              />
              <button
                className="btn"
                onClick={(e: any) => {
                  postComment(postData._id);
                }}
              >
                Comment
              </button>
            </div>
            </div>:null}

          </div>
        );
      })}
    </div>
  );
}
