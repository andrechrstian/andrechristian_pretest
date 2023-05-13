import axios from "axios";
import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import "./Photo.css";

const Photo = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const [dataPhoto, setDataPhoto] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const fetchListPhoto = async () => {
    setIsLoading(true);
    let res = await axios.get(
      `https://jsonplaceholder.typicode.com/albums/${id}/photos`
    );
    setDataPhoto(res.data);
    setIsLoading(false);
  };

  const navigateToPhotos = (id) => {
    navigate(`/photo/${id}`);
  };

  useEffect(() => {
    fetchListPhoto();
  }, []);

  if (isLoading) return <p>Loading...</p>;

  return (
    <div className="photo-full">
      <div className="photo-container">
        <div className="headline-photo">
          <h1> Photos From Album </h1>
        </div>
        <div className="photo-card">
          {!!dataPhoto.length
            ? dataPhoto.map((item, i) => {
                return (
                  <div
                    className="photo-card-1"
                    key={i}
                    onClick={() => navigateToPhotos(item.id)}
                  >
                    <div className="photo-card-p-1">
                      <p>{item.title}</p>
                      <img src={item.url} className="photo-card-image" />
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

export default Photo;
