import axios from "axios";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import "./PhotoID.css";

const PhotoID = () => {
  const { id } = useParams();
  const [dataPhotoID, setDataPhotoID] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const fetchListPhotoID = async () => {
    setIsLoading(true);
    let res = await axios.get(
      `https://jsonplaceholder.typicode.com/photos/${id}`
    );
    setDataPhotoID(res.data);
    console.log(res.data);
    setIsLoading(false);
  };

  useEffect(() => {
    fetchListPhotoID();
  }, []);

  if (isLoading) return <p>Loading...</p>;

  return (
    <div className="photoID-full">
      <div className="photoID-card">
        <p>{dataPhotoID.title}</p>
        <img src={dataPhotoID.url} className="photoID-card-image" />
      </div>
    </div>
  );
};

export default PhotoID;
