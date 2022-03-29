import { useQuery } from "react-query";
import styled from "styled-components";
import { getMovies, getPopularMovies, IGetMoviesResult } from "../api";
import { AnimatePresence } from "framer-motion";
import { useNavigate, useMatch, useLocation } from "react-router-dom";
import Slider from "../Components/Slider";
import DetailBox from "../Components/DetailBox";
import Overlay from "../Components/Overlay";
import Banner from "../Components/Banner";
import Section from "../Components/Section";

const Wrapper = styled.div`
  background: black;
  display: flex;
  flex-direction: column;
  overflow-y: scroll;
  overflow-x: hidden;
  /* height: 150vh; */
`;

const Loader = styled.div`
  height: 20vh;
  display: flex;
  justify-content: center;
  align-items: center;
`;

interface ILocationType {
  category: string;
}

function Home() {
  const nowPlaying = useQuery<IGetMoviesResult>(
    ["movies", "nowPlaying"],
    getMovies
  );

  const popularMovies = useQuery<IGetMoviesResult>(
    ["popularMovies", "popular"],
    getPopularMovies
  );

  const navigate = useNavigate();
  const location = useLocation();
  const state = location.state as ILocationType;
  const match = useMatch("/movies/:id");

  const overlayClicked = () => {
    document.body.style.overflow = "scroll";
    navigate(-1);
  };

  let clickedMovie;
  if (state !== null && match) {
    if (state.category === "nowPlaying") {
      clickedMovie = nowPlaying.data?.results.find(
        (movie) => String(movie.id) === match.params.id
      );
    } else if (state.category === "popular") {
      clickedMovie = popularMovies.data?.results.find(
        (movie) => String(movie.id) === match.params.id
      );
    }
  }

  return (
    <Wrapper>
      {nowPlaying.isLoading ? (
        <Loader>Loading ... </Loader>
      ) : (
        <>
          <Banner data={nowPlaying.data} />
          <Section title="Now Playing">
            <Slider data={nowPlaying.data} category="nowPlaying" />
          </Section>
          <Section title="Popular">
            <Slider data={popularMovies.data} category="popular" />
          </Section>
          <AnimatePresence>
            {match && (
              <>
                <Overlay overlayClicked={overlayClicked} />
                <DetailBox
                  match={match}
                  clickedItem={clickedMovie}
                  category={state.category}
                />
              </>
            )}
          </AnimatePresence>
        </>
      )}
    </Wrapper>
  );
}

export default Home;
