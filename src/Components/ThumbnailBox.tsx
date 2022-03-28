import styled from "styled-components";
import { motion } from "framer-motion";
import { getImagePath } from "../utils";
import { useNavigate } from "react-router-dom";
import { IMovie } from "../api";
import React from "react";

const Box = styled(motion.div)<{ posterImage: string }>`
  background-color: white;
  height: 150px;
  background-image: url(${(props) => props.posterImage});
  background-size: cover;
  background-position: center;
  &:first-child {
    transform-origin: center left;
  }
  &:last-child {
    transform-origin: center right;
  }
  cursor: pointer;
`;

const Info = styled(motion.div)`
  padding: 20px;
  background-color: ${(props) => props.theme.black.lighter};
  opacity: 0;
  position: absolute;
  width: 100%;
  bottom: 0;
`;

const scaleVariants = {
  normal: {
    scale: 1,
  },
  hover: {
    scale: 1.5,
    y: -50,
    transition: {
      delay: 0.5,
      duration: 0.3,
      type: "tween",
    },
  },
};

const infoVariants = {
  hover: {
    opacity: 1,
    transition: {
      delay: 0.5,
      duration: 0.3,
    },
  },
};

interface IThumbnailBoxProps {
  movie: IMovie;
}

function ThumbnailBox({ movie }: IThumbnailBoxProps) {
  const navigate = useNavigate();
  const onBoxClicked = (movieId: number) => {
    navigate(`/movies/${movieId}`);
  };
  return (
    <Box
      key={movie.id}
      layoutId={movie.id + ""}
      posterImage={getImagePath(movie.poster_path, "w200")}
      variants={scaleVariants}
      transition={{ type: "tween" }}
      whileHover="hover"
      initial="normal"
      onClick={() => onBoxClicked(movie.id)}
    >
      <Info variants={infoVariants}>{movie.title}</Info>
    </Box>
  );
}

export default ThumbnailBox;
