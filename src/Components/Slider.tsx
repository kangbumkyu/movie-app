import styled from "styled-components";
import { motion, AnimatePresence } from "framer-motion";
import { IGetMoviesResult, IGetTvsResult } from "../api";
import { useState } from "react";
import ThumbnailBox from "./ThumbnailBox";

const OFFSET = 6;
const Container = styled.div`
  position: relative;
`;

const Row = styled(motion.div)`
  display: grid;
  padding: 0 55px;
  grid-template-columns: repeat(6, 1fr);
  grid-gap: 5px;
  position: absolute;
  width: 100%;
`;

const Button = styled(motion.div)`
  width: 50px;
  height: 150px;
  position: absolute;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: rgba(0, 0, 0, 0.8);
  cursor: pointer;
`;

const LeftButton = styled(Button)`
  top: 0;
  left: 0;
`;
const RightButton = styled(Button)`
  top: 0;
  right: 0;
`;

const rowVariants = {
  enter: (direction: number) => ({
    x: direction > 0 ? window.outerWidth + 10 : -window.outerWidth - 10,
  }),
  visible: {
    x: 0,
  },
  exit: (direction: number) => ({
    x: direction > 0 ? -window.outerWidth - 10 : window.outerWidth + 10,
  }),
};

interface ISliderProps {
  data?: IGetMoviesResult | IGetTvsResult;
}

function Slider({ data }: ISliderProps) {
  const [index, setIndex] = useState(0);
  const [leaving, setLeaving] = useState(false);
  const [direction, setDirection] = useState<number>(0);

  const increaseIndex = () => {
    if (data) {
      if (leaving) return;
      toggleLeaving();
      setDirection(1);
      const totalPage = Math.ceil((data.results.length - 1) / OFFSET);
      setIndex((prev) => (prev + 1) % totalPage);
    }
  };
  const decreaseIndex = () => {
    if (data) {
      if (leaving) return;
      toggleLeaving();
      setDirection(-1);
      const totalPage = Math.ceil((data.results.length - 1) / OFFSET);
      setIndex((prev) => (prev - 1 < 0 ? totalPage - 1 : prev - 1));
    }
  };
  const toggleLeaving = () => setLeaving((prev) => !prev);

  return (
    <Container>
      <AnimatePresence
        initial={false}
        custom={direction}
        onExitComplete={toggleLeaving}
      >
        <Row
          key={index}
          custom={direction}
          variants={rowVariants}
          initial="enter"
          animate="visible"
          exit="exit"
          transition={{ type: "tween", duration: 0.8 }}
        >
          {data?.results
            .slice(1)
            .slice(OFFSET * index, OFFSET * index + OFFSET)
            .map((item) => (
              <ThumbnailBox key={item.id} data={item}></ThumbnailBox>
            ))}
        </Row>
      </AnimatePresence>
      <LeftButton onClick={decreaseIndex}>&larr;</LeftButton>
      <RightButton onClick={increaseIndex}>&rarr;</RightButton>
    </Container>
  );
}

export default Slider;
