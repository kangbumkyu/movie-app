import styled from "styled-components";
import { motion, useViewportScroll } from "framer-motion";
import { PathMatch } from "react-router-dom";
import { IMovie } from "../api";
import { getImagePath } from "../utils";

const Container = styled(motion.div)`
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

interface IMovieDetailBox {
  match: PathMatch;
  clickedMovie?: IMovie | null | undefined;
}

function MovieDetailBox({ match, clickedMovie }: IMovieDetailBox) {
  const { scrollY } = useViewportScroll();
  return (
    <Container style={{ top: scrollY }} layoutId={match.params.movieId}>
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
          <MovieDetailOverview>{clickedMovie.overview}</MovieDetailOverview>
        </>
      )}
    </Container>
  );
}

export default MovieDetailBox;
