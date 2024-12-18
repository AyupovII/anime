import { useEffect, useState } from "react";
import ReactPlayer from "react-player";
import { useDispatch, useSelector } from "react-redux";
import { fetchVideo } from "../toolkitRedux/video";
import { AnyAction } from "@reduxjs/toolkit";
import { ImageBox } from "./AnimeList";
import { styled } from "styled-components";

const VideoContent = styled.div`
  display: flex;
  flex-direction: row;
  height: 360px;
  justify-content: center;
`
const VideoList = styled.div`
overflow-y: auto;
height: 100%;
background-color: rgba(0,0,0,0.2);

`
const VideoItem = styled.div`
  display: flex;
  max-width: 250px;
  cursor: pointer;
  &:hover{
    /* filter: brightness(40%); */
    background-color: rgba(0,0,0,0.3);
  }
`

const Title = styled.div`
  display: flex;
  padding: 5px 5px;
  align-items: center;
  width: -webkit-fill-available;
  height: auto;
  color: white;
`

const PreviewVideos = ({ id }: { id: string }) => {
  const videoData = useSelector((state: any) => state.video.videoData);
  const dispatch = useDispatch();
  const arrayYouTubeVideos = videoData.filter((filterVideo: any) => filterVideo.hosting === "youtube");
  const [video, setVideo] = useState(arrayYouTubeVideos?.[0] ?? "");

  const [playState, setPlayState] = useState(false);
  const onPlayHandler = () => {
    setPlayState(true)
  };
  const onHandlerItem = (index: number) => {
    setVideo(arrayYouTubeVideos[index])
    onPlayHandler()
  }

  useEffect(() => {
    dispatch(fetchVideo(id) as unknown as AnyAction);
  }, [])

  return <VideoContent>
    <ReactPlayer controls url={video.url} onPlay={() => onPlayHandler}
      playing={playState}
    />
    <VideoList>
      {arrayYouTubeVideos.map((video: any, index: number) => {
        return <VideoItem onClick={() => onHandlerItem(index)}>
          <ImageBox style={{ width: "100%", height: "100%", minHeight: "100px" }}>
            <img src={video.image_url} alt={video.name} width={"100%"} height={"100%"} />
          </ImageBox>
          <Title>{video.name}</Title>
        </VideoItem>
      })}</VideoList>
  </VideoContent>
}
export default PreviewVideos