import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./User.css";

const User = () => {
  const navigate = useNavigate();
  const [dataUser, setDataUser] = useState([]);

  const fetchListUser = async () => {
    let res = await axios.get("https://jsonplaceholder.typicode.com/users");
    console.log(res.data);
    setDataUser(res.data);
  };

  const navigateToUserPost = (id) => {
    navigate(`/user-post/${id}`);
  };

  const navigateToAlbum = (id) => {
    navigate(`/user-album/${id}`);
  };

  useEffect(() => {
    fetchListUser();
  }, []);

  return (
    <div className="user-card">
      {!!dataUser.length
        ? dataUser.map((item, i) => {
            return (
              <div className="user-card-1" key={i}>
                <div>
                  <p className="user-card-p-1"> Name : {item.name} </p>
                </div>
                <div>
                  <p className="user-card-p-2">Username : {item.username}</p>
                </div>
                <div>
                  <p className="user-card-p-3"> Email : {item.email} </p>
                </div>
                <div>
                  <p className="user-card-p-4"> Phone : {item.phone} </p>
                </div>
                <div>
                  <p className="user-card-p-5"> Website : {item.website} </p>
                </div>
                <div className="user-card-btn">
                  <button
                    className="user-card-btn-post"
                    onClick={() => navigateToUserPost(item.id)}
                  >
                    Post
                  </button>
                  <button
                    className="user-card-btn-album"
                    onClick={() => navigateToAlbum(item.id)}
                  >
                    Album
                  </button>
                </div>
              </div>
            );
          })
        : ""}
    </div>
  );
};

export default User;
