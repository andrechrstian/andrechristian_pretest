import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import "./UserAlbum.css";

const UserPost = () => {
  const navigate = useNavigate();
  const [dataUserAlbum, setDataUserAlbum] = useState([]);
  const { id } = useParams();
  const [isLoading, setIsLoading] = useState(false);

  const fetchListAlbum = async () => {
    setIsLoading(true);
    let res = await axios.get(
      `https://jsonplaceholder.typicode.com/albums?userId=${id}`
    );
    setDataUserAlbum(res.data);
    setIsLoading(false);
  };

  const navigateToPhotos = (id) => {
    navigate(`/album/${id}`);
  };

  useEffect(() => {
    fetchListAlbum();
  }, []);

  if (isLoading) return <p>Loading...</p>;

  return (
    <div className="userAlbum-full">
      <div className="userAlbum-container">
        {!!dataUserAlbum.length
          ? dataUserAlbum.map((item, i) => {
              return (
                <div
                  className="userAlbum-card"
                  onClick={() => navigateToPhotos(item.id)}
                >
                  <h5> {item.title}</h5>
                </div>
              );
            })
          : ""}
      </div>
    </div>
  );
};

export default UserPost;
