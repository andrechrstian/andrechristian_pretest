import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Album.css";

const Album = () => {
  const navigate = useNavigate();
  const [dataAlbum, setDataAlbum] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const fetchListAlbum = async () => {
    setIsLoading(true);
    let res = await axios.get("https://jsonplaceholder.typicode.com/albums");
    setDataAlbum(res.data);
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
    <div className="album-full">
      <div className="album-container">
        <div className="headline-album">
          <h1> Album </h1>
        </div>
        <div className="album-card">
          {!!dataAlbum.length
            ? dataAlbum.map((item, i) => {
                return (
                  <div className="album-card-1" key={i}>
                    <div
                      className="album-card-p-1"
                      onClick={() => navigateToPhotos(item.id)}
                    >
                      <p>{item.title}</p>
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

export default Album;
