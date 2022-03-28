import styled from "styled-components";
import { motion } from "framer-motion";
import { getImagePath } from "../utils";
import { useNavigate } from "react-router-dom";
import { IMovie, ITv } from "../api";

const Box = styled(motion.div)<{ image: string }>`
  background-color: white;
  height: 150px;
  background-image: url(${(props) => props.image});
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
  data: IMovie | ITv;
}

function ThumbnailBox({ data }: IThumbnailBoxProps) {
  const isMovie = "title" in data ? true : false;
  const navigate = useNavigate();
  const onBoxClicked = (id: number) => {
    navigate(`/${isMovie ? "movies" : "tvs"}/${id}`);
  };
  return (
    <Box
      key={data?.id}
      layoutId={data?.id + ""}
      image={getImagePath(data?.poster_path || "", "w200")}
      variants={scaleVariants}
      transition={{ type: "tween" }}
      whileHover="hover"
      initial="normal"
      onClick={() => onBoxClicked(data?.id || 0)}
    >
      <Info variants={infoVariants}>
        {"title" in data ? data.title : data.name}
      </Info>
    </Box>
  );
}

export default ThumbnailBox;
