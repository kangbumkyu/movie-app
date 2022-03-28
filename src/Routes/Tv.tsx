import { useQuery } from "react-query";
import styled from "styled-components";
import { getPopularTvs, IGetTvsResult } from "../api";
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

function Tv() {
  const popularTvs = useQuery<IGetTvsResult>(
    ["popularTvs", "popular"],
    getPopularTvs
  );

  const navigate = useNavigate();
  const match = useMatch("/tvs/:id");

  const overlayClicked = () => navigate(-1);
  const clickedTv =
    match &&
    popularTvs.data?.results.find((tv) => String(tv.id) === match.params.id);

  return (
    <Wrapper>
      {popularTvs.isLoading ? (
        <Loader>Loading ... </Loader>
      ) : (
        <>
          <Banner data={popularTvs.data} />
          <Section title="Now Playing">
            <Slider data={popularTvs.data} />
          </Section>
          {/* <Section>
            <SectionTitle>Popular</SectionTitle>
            <Slider data={popularMovies.data} />
          </Section> */}
          <AnimatePresence>
            {match && (
              <>
                <Overlay overlayClicked={overlayClicked} />
                <DetailBox match={match} clickedItem={clickedTv} />
              </>
            )}
          </AnimatePresence>
        </>
      )}
    </Wrapper>
  );
}

export default Tv;
