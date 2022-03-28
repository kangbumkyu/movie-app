import { useQuery } from "react-query";
import styled from "styled-components";
import { getMovies, IGetMoviesResult } from "../api";
import { getImagePath } from "../utils";
import { AnimatePresence } from "framer-motion";
import { useNavigate, useMatch } from "react-router-dom";
import Slider from "../Components/Slider";
import MovieDetailBox from "../Components/MovieDetailBox";
import Overlay from "../Components/Overlay";

const Wrapper = styled.div`
  background: black;
  display: flex;
  flex-direction: column;
  overflow-y: scroll;
  /* height: 150vh; */
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

function Home() {
  const { data, isLoading } = useQuery<IGetMoviesResult>(
    ["movies", "nowPlaying"],
    getMovies
  );

  const navigate = useNavigate();
  const match = useMatch("/movies/:movieId");

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
          <Banner bgImage={getImagePath(data?.results[0].backdrop_path || "")}>
            <Title>{data?.results[0].title}</Title>
            <Overview>{data?.results[0].overview}</Overview>
          </Banner>
          <Slider data={data} />
          <AnimatePresence>
            {match && (
              <>
                <Overlay overlayClicked={overlayClicked} />
                <MovieDetailBox match={match} clickedMovie={clickedMovie} />
              </>
            )}
          </AnimatePresence>
        </>
      )}
    </Wrapper>
  );
}

export default Home;
