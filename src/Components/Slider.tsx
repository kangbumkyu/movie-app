import styled from "styled-components";
import { motion, AnimatePresence } from "framer-motion";
import { IGetMoviesResult } from "../api";
import { useState } from "react";
import ThumbnailBox from "./ThumbnailBox";

const OFFSET = 6;
const Container = styled.div`
  position: relative;
  top: -100px;
`;

const Row = styled(motion.div)`
  display: grid;
  grid-template-columns: repeat(6, 1fr);
  grid-gap: 5px;
  position: absolute;
  width: 100%;
`;

const rowVariants = {
  hidden: {
    x: window.outerWidth + 10,
  },
  visible: {
    x: 0,
  },
  exit: {
    x: -window.outerWidth - 10,
  },
};

interface ISliderProps {
  data?: IGetMoviesResult;
}

function Slider({ data }: ISliderProps) {
  const [index, setIndex] = useState(0);
  const [leaving, setLeaving] = useState(false);

  const increaseIndex = () => {
    if (data) {
      if (leaving) return;
      toggleLeaving();
      const totalPage = Math.ceil((data.results.length - 1) / OFFSET);
      setIndex((prev) => (prev + 1) % totalPage);
    }
  };
  const toggleLeaving = () => setLeaving((prev) => !prev);

  return (
    <Container>
      <AnimatePresence initial={false} onExitComplete={toggleLeaving}>
        <Row
          key={index}
          variants={rowVariants}
          initial="hidden"
          animate="visible"
          exit="exit"
          transition={{ type: "tween", duration: 0.8 }}
        >
          {data?.results
            .slice(1)
            .slice(OFFSET * index, OFFSET * index + OFFSET)
            .map((movie) => (
              <ThumbnailBox key={movie.id} movie={movie}></ThumbnailBox>
            ))}
        </Row>
      </AnimatePresence>
    </Container>
  );
}

export default Slider;
