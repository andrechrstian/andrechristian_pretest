import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Post.css";

const Post = () => {
  const navigate = useNavigate();
  const [dataPost, setDataPost] = useState([]);
  const [title, setTitle] = useState("");
  const [body, setBody] = useState("");
  const [editIndex, setEditIndex] = useState("");
  const [isEdit, setIsEdit] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const fetchListPost = async () => {
    setIsLoading(true);
    let res = await axios.get("https://jsonplaceholder.typicode.com/posts");
    setDataPost(res.data);
    setIsLoading(false);
  };

  //Delete Function
  const handleDelete = (index) => {
    let tempData = [...dataPost];
    tempData.splice(index, 1);
    setDataPost(tempData);
  };

  //Edit Function
  const editPost = (index) => {
    setTitle(dataPost[index].title);
    setBody(dataPost[index].body);
    setEditIndex(index);
    setIsEdit(true);
  };

  const handleEdit = () => {
    let tempData = [...dataPost];
    tempData.splice(editIndex, 1, {
      title,
      body,
    });
    setDataPost(tempData);
    setTitle("");
    setBody("");
  };

  //Add Function
  const handlePost = async () => {
    let res = await axios.post("https://jsonplaceholder.typicode.com/posts", {
      title,
      body,
    });
    setDataPost([res.data, ...dataPost]);
    setTitle("");
    setBody("");
  };

  const navigateToComment = (id) => {
    navigate(`/post/${id}`);
  };

  useEffect(() => {
    fetchListPost();
  }, []);

  if (isLoading) return <p>Loading...</p>;

  return (
    <div className="post-full">
      <div className="post-container">
        <div className="headline-post">
          <h1> Post </h1>
        </div>
        <div className="form-add-post">
          <input onChange={(e) => setTitle(e.target.value)} value={title} />
          <input onChange={(e) => setBody(e.target.value)} value={body} />
          <button onClick={isEdit ? handleEdit : handlePost}> Submit </button>
        </div>
        <div className="post-card">
          {!!dataPost.length
            ? dataPost.map((item, i) => {
                return (
                  <div className="post-card-1" key={i}>
                    <div onClick={() => navigateToComment(item.id)}>
                      <div className="post-card-p-1">
                        <p>{item.title}</p>
                      </div>
                      <div className="post-card-p-2">
                        <p>{item.body}</p>
                      </div>
                    </div>

                    <div>
                      <button
                        className="post-card-deleteBtn"
                        onClick={() => handleDelete(i)}
                      >
                        Delete
                      </button>
                      <button
                        className="post-card-editbtn"
                        onClick={() => editPost(i)}
                      >
                        Edit
                      </button>
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

export default Post;
