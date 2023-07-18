import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import { IconButton, CardActionArea, CardActions } from "@mui/material";
import FavoriteIcon from "@mui/icons-material/Favorite";
import Rating from "@mui/material/Rating";
import { LazyLoadImage } from "react-lazy-load-image-component";
import "react-lazy-load-image-component/src/effects/blur.css";

import { useState } from "react";
import { useAppBarStore } from "../store/store";

export const HotelCard = ({
  id,
  name,
  city,
  imgUrl,
  description,
  stars,
  minPrice,
  openHotelPage,
}) => {
  const [like, setLike] = useState(false);
  const favoriteBadgeCount = useAppBarStore((state) => state.favoriteBadgeCount);
  const setFavoriteBadgeCount = useAppBarStore(
    (state) => state.setFavoriteBadgeCount
  );
  const handleLikeClick = () => {
    setLike(!like);
    if (!like) {
      setFavoriteBadgeCount(favoriteBadgeCount + 1);
    } else {
      setFavoriteBadgeCount(favoriteBadgeCount - 1)
    }
  };

  return (
    <Card elevation={12}>
      <CardActionArea
        onClick={() => {
          openHotelPage(id);
        }}
      >
        <LazyLoadImage
          src={imgUrl}
          alt="hotel photo"
          effect="blur"
          style={{
            width: "100%",
            height: "56.25%",
            borderRadius: "4px 4px 0 0",
            boxShadow: "rgba(0, 0, 0, 0.1) 0px 4px 12px",
          }}
        />

        <CardContent>
          <Typography gutterBottom variant="h5" component="div">
            {name}
          </Typography>

          <Typography gutterBottom variant="body2" component="div">
            {description}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            {city}
          </Typography>
          <Rating value={stars} readOnly sx={{ pt: 1 }}></Rating>
          <Typography variant="h6" color="text.secondary" sx={{ pt: 1 }}>
            {`Цена за ночь от: ${minPrice} руб.`}
          </Typography>
        </CardContent>
      </CardActionArea>
      <CardActions>
        <IconButton
          size="large"
          aria-label="add to favorite"
          aria-haspopup="true"
          // color="inherit"
          color={like ? "error" : "inherit"}
          onClick={handleLikeClick}
        >
          <FavoriteIcon />
        </IconButton>
        <Typography variant="body2" color={like ? "secondary" : "inherit"}>
          {like ? "Добавлено в избранное" : "Добавить в избранное"}
        </Typography>
      </CardActions>
    </Card>
  );
};
