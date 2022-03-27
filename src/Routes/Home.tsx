import { useQuery } from "react-query";
import styled from "styled-components";
import { getMovies, IGetMoviesResult } from "../api";
import { getImagePath } from "../utils";
import { motion, AnimatePresence, useViewportScroll } from "framer-motion";
import { useState } from "react";
import { useNavigate, useMatch } from "react-router-dom";

const Wrapper = styled.div`
  background: black;
  display: flex;
  flex-direction: column;
  overflow-y: scroll;
  height: 150vh;
`;

const Loader = styled.div`
  height: 20vh;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const Banner = styled.div<{ bgImage: string }>`
  height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  padding: 60px;
  background-image: linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5)),
    url(${(props) => props.bgImage});
  background-size: cover;
`;
const Title = styled.h2`
  font-size: 64px;
  margin-bottom: 20px;
`;
const Overview = styled.p`
  width: 50%;
`;

const Slider = styled.div`
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

const MovieDetailBox = styled(motion.div)`
  position: absolute;
  border-radius: 15px;
  overflow: hidden;
  width: 40vw;
  left: 0;
  right: 0;
  margin: 0 auto;
  background-color: ${(props) => props.theme.black.lighter};
`;

const MovieDetailCover = styled.div`
  width: 100%;
  height: 400px;
  background-size: cover;
  background-position: center center;
`;

const MovieDetailTitle = styled.h3`
  color: ${(props) => props.theme.white.lighter};
  padding: 10px;
  font-size: 40px;
  font-weight: 400;
  position: relative;
  top: -60px;
`;

const MovieDetailOverview = styled.p`
  color: ${(props) => props.theme.white.lighter};
  padding: 10px;
`;

const Overlay = styled(motion.div)`
  width: 100%;
  height: 100%;
  position: fixed;
  top: 0;
  background-color: rgba(0, 0, 0, 0.8);
  opacity: 0;
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

function Home() {
  const OFFSET = 6;
  const { data, isLoading } = useQuery<IGetMoviesResult>(
    ["movies", "nowPlaying"],
    getMovies
  );
  const [index, setIndex] = useState(0);
  const [leaving, setLeaving] = useState(false);
  const { scrollY } = useViewportScroll();
  const navigate = useNavigate();
  const match = useMatch("/movies/:movieId");

  const increaseIndex = () => {
    if (data) {
      if (leaving) return;
      toggleLeaving();
      const totalPage = Math.ceil((data.results.length - 1) / OFFSET);
      setIndex((prev) => (prev + 1) % totalPage);
    }
  };
  const toggleLeaving = () => setLeaving((prev) => !prev);
  const onBoxClicked = (movieId: number) => {
    navigate(`/movies/${movieId}`);
  };
  const overlayClicked = () => navigate(-1);
  const clickedMovie =
    match &&
    data?.results.find((movie) => String(movie.id) === match.params.movieId);

  return (
    <Wrapper>
      {isLoading ? (
        <Loader>Loading ... </Loader>
      ) : (
        <>
          <Banner
            onClick={increaseIndex}
            bgImage={getImagePath(data?.results[0].backdrop_path || "")}
          >
            <Title>{data?.results[0].title}</Title>
            <Overview>{data?.results[0].overview}</Overview>
          </Banner>
          <Slider>
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
                  ))}
              </Row>
            </AnimatePresence>
          </Slider>
          <AnimatePresence>
            {match && (
              <>
                <Overlay
                  onClick={overlayClicked}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                ></Overlay>
                <MovieDetailBox
                  style={{ top: scrollY }}
                  layoutId={match.params.movieId}
                >
                  {clickedMovie && (
                    <>
                      <MovieDetailCover
                        style={{
                          backgroundImage: `url(${getImagePath(
                            clickedMovie.poster_path,
                            "w500"
                          )})`,
                        }}
                      />
                      <MovieDetailTitle>{clickedMovie.title}</MovieDetailTitle>
                      <MovieDetailOverview>
                        {clickedMovie.overview}
                      </MovieDetailOverview>
                    </>
                  )}
                </MovieDetailBox>
              </>
            )}
          </AnimatePresence>
        </>
      )}
    </Wrapper>
  );
}

export default Home;
