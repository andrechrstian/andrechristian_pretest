import React from "react";
import { Route, Routes } from "react-router-dom";
import Navbar from "./component/Navbar";
import Album from "./pages/Album";
import Post from "./pages/Post";
import User from "./pages/User";
import Photo from "./pages/Photo";
import PhotoID from "./pages/PhotoID";
import PostID from "./pages/PostID";
import UserPost from "./pages/UserPost";
import UserAlbum from "./pages/UserAlbum";

const App = () => {
  return (
    <div>
      <Navbar />
      <Routes>
        <Route path="/" element={<User />} />
        <Route path="/user-post/:id" element={<UserPost />} />
        <Route path="/user-album/:id" element={<UserAlbum />} />
        <Route path="/album" element={<Album />} />
        <Route path="/album/:id" element={<Photo />} />
        <Route path="/photo/:id" element={<PhotoID />} />
        <Route path="/post" element={<Post />} />
        <Route path="/post/:id" element={<PostID />} />
      </Routes>
    </div>
  );
};

export default App;
