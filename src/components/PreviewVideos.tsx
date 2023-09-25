import { useEffect } from "react";
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
`
const VideoItem = styled.div`
  display: flex;
  max-width: 250px;
  cursor: pointer;
  &:hover{
    filter: brightness(40%);
    background-color: rgba(0,0,0,0.3);
  }
`

const Title = styled.div`
  display: flex;
  padding: 5px 5px;
  align-items: center;
  width: -webkit-fill-available;
  height: auto;
`

const PreviewVideos = ({ id }: { id: string }) => {
  const videoData = useSelector((state: any) => state.video.videoData);
  console.log(videoData);
  const dispatch = useDispatch();

  const arrayYouTubeVideos = videoData.filter((filterVideo: any) => filterVideo.hosting === "youtube");

  useEffect(() => {
    dispatch(fetchVideo(id) as unknown as AnyAction);
  }, [])

  return <VideoContent>
    <ReactPlayer controls url={arrayYouTubeVideos[0]} />
    <VideoList>
      {arrayYouTubeVideos.map((video: any) => {
        return <VideoItem>
          <ImageBox style={{ width: "120px", height: "90px" }}>
            <img src={video.image_url} alt={video.name} width={"120px"} />
          </ImageBox>
          <Title>{video.name}</Title>
        </VideoItem>
      })}</VideoList>
  </VideoContent>
}
export default PreviewVideos