import * as React from "react";
import ImageList from "@mui/material/ImageList";
import ImageListItem from "@mui/material/ImageListItem";

export const Images = (props) => {
  return (
    <ImageList sx={{ width: 1000, height: 450 }} cols={props.cols || 1}>
      {props.roomImages.map((room, index) => (
        <ImageListItem key={index} cols={1} rows={1}>
          <img src={room} alt="room" loading="lazy" />
        </ImageListItem>
      ))}
    </ImageList>
  );
};
