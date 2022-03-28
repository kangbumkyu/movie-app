import { useQuery } from "react-query";
import styled from "styled-components";
import { getMovies, getPopularMovies, IGetMoviesResult } from "../api";
import { AnimatePresence } from "framer-motion";
import { useNavigate, useMatch } from "react-router-dom";
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
  /* height: 150vh; */
`;

const Loader = styled.div`
  height: 20vh;
  display: flex;
  justify-content: center;
  align-items: center;
`;

function Home() {
  const nowPlaying = useQuery<IGetMoviesResult>(
    ["movies", "nowPlaying"],
    getMovies
  );

  // const popularMovies = useQuery<IGetMoviesResult>(
  //   ["popularMovies", "popular"],
  //   getPopularMovies
  // );

  const navigate = useNavigate();
  const match = useMatch("/movies/:id");

  const overlayClicked = () => navigate(-1);
  const clickedMovie =
    match &&
    nowPlaying.data?.results.find(
      (movie) => String(movie.id) === match.params.id
    );

  return (
    <Wrapper>
      {nowPlaying.isLoading ? (
        <Loader>Loading ... </Loader>
      ) : (
        <>
          <Banner data={nowPlaying.data} />
          <Section title="Now Playing">
            <Slider data={nowPlaying.data} />
          </Section>
          {/* <Section>
            <SectionTitle>Popular</SectionTitle>
            <Slider data={popularMovies.data} />
          </Section> */}
          <AnimatePresence>
            {match && (
              <>
                <Overlay overlayClicked={overlayClicked} />
                <DetailBox match={match} clickedItem={clickedMovie} />
              </>
            )}
          </AnimatePresence>
        </>
      )}
    </Wrapper>
  );
}

export default Home;
