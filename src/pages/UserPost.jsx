import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import "./UserPost.css";

const UserPost = () => {
  const navigate = useNavigate();
  const [dataUserPost, setDataUserPost] = useState([]);
  const { id } = useParams();
  const [isLoading, setIsLoading] = useState(false);

  const fetchListPost = async () => {
    setIsLoading(true);
    let res = await axios.get(
      `https://jsonplaceholder.typicode.com/posts?userId=${id}`
    );
    setDataUserPost(res.data);
    setIsLoading(false);
  };

  const navigateToComment = (id) => {
    navigate(`/post/${id}`);
  };

  useEffect(() => {
    fetchListPost();
  }, []);

  if (isLoading) return <p>Loading...</p>;

  return (
    <div className="userPost-full">
      <div className="userPost-container">
        {!!dataUserPost.length
          ? dataUserPost.map((item, i) => {
              return (
                <div
                  className="userPost-card"
                  onClick={() => navigateToComment(item.id)}
                >
                  <h5> {item.title}</h5>
                  <p> {item.body}</p>
                </div>
              );
            })
          : ""}
      </div>
    </div>
  );
};

export default UserPost;
