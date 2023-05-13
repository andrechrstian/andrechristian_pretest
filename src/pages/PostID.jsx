import axios from "axios";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import "./PostID.css";

const PostID = () => {
  const [dataPostID, setDataPostID] = useState([]);
  const [dataComment, setDataComment] = useState([]);
  const [editCommentIndex, setEditCommentIndex] = useState("");
  const [body, setBody] = useState("");
  const [bodyEdit, setBodyEdit] = useState("");
  const [isEdit, setIsEdit] = useState(false);
  const { id } = useParams();
  const [isLoading, setIsLoading] = useState(false);

  const fetchListPostID = async () => {
    setIsLoading(true);
    let res = await axios.get(
      `https://jsonplaceholder.typicode.com/posts/${id}`
    );
    setDataPostID(res.data);
    setIsLoading(false);
  };

  const fetchListComment = async () => {
    let res = await axios.get(
      `https://jsonplaceholder.typicode.com/posts/${id}/comments`
    );
    setDataComment(res.data);
  };

  //Add Function
  const handlePostComment = async () => {
    let res = await axios.post(
      `https://jsonplaceholder.typicode.com/posts/${id}/comments`,
      {
        name: "Admin",
        email: "Admin@gmail.com",
        body,
      }
    );
    setDataComment([res.data, ...dataComment]);
    setBody("");
    console.log(res.data);
  };

  //Delete Function
  const handleDeleteComment = (index) => {
    let tempData = [...dataComment];
    tempData.splice(index, 1);
    setDataComment(tempData);
  };

  //Edit Function
  const editComment = (index) => {
    setBodyEdit(dataComment[index].body);
    setEditCommentIndex(index);
    setIsEdit(true);
  };

  const handleEditComment = () => {
    let tempData = [...dataComment];
    tempData.splice(editCommentIndex, 1, {
      name: "Admin",
      email: "Admin@gmail.com",
      body: bodyEdit,
    });
    setDataComment(tempData);
    setBody("");
    setIsEdit(false);
    console.log(tempData);
  };

  useEffect(() => {
    fetchListPostID();
    fetchListComment();
  }, []);

  if (isLoading) return <p>Loading...</p>;

  return (
    <div className="postID-full">
      <div className="postID-card">
        <div className="postID-card-1">
          <h3>{dataPostID.title}</h3>
          <p>{dataPostID.body}</p>
        </div>
        <div className="postID-card-2">
          <p> Komentar </p>
        </div>
        <div className="form-add-comment">
          <p> Nama : Admin </p>
          <p> Email : Admin@gmail.com </p>
          <input onChange={(e) => setBody(e.target.value)} value={body} />
          <button onClick={handlePostComment}> Comment </button>
        </div>
        <div className="postID-card-3">
          {!!dataComment.length
            ? dataComment.map((item, i) => {
                return (
                  <div className="postID-card-4">
                    <p>Name : {item.name}</p>
                    <p>Email : {item.email}</p>
                    {isEdit && editCommentIndex === i ? (
                      <input
                        value={bodyEdit}
                        onChange={(e) => setBodyEdit(e.target.value)}
                      />
                    ) : (
                      <p> {item.body} </p>
                    )}
                    <div className="postID-card-5">
                      <button onClick={handleDeleteComment}> Delete </button>
                      {item.name === "Admin" && (
                        <>
                          <button onClick={() => editComment(i)}> Edit </button>
                          <button onClick={handleEditComment}> Save </button>
                        </>
                      )}
                    </div>
                  </div>
                );
              })
            : ""}
        </div>
      </div>
    </div>
  );
};

export default PostID;
