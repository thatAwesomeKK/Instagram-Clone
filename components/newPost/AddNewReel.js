import React, { useState } from "react";
import Header from "./ReelsUploader/Header";
import Gallery from "./ReelsUploader/Gallery";

export default function AddNewReel() {
  const [selectedVideo, setSelectedVideo] = useState(null);
  return (
    <>
      <Header selectedVideo={selectedVideo} />
      <Gallery
        selectedVideo={selectedVideo}
        setSelectedVideo={setSelectedVideo}
      />
    </>
  );
}
