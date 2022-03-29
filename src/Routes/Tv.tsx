import { useQuery } from "react-query";
import styled from "styled-components";
import { getPopularTvs, IGetTvsResult } from "../api";
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

function Tv() {
  const popularTvs = useQuery<IGetTvsResult>(
    ["popularTvs", "popular"],
    getPopularTvs
  );

  const navigate = useNavigate();
  const location = useLocation();
  const state = location.state as ILocationType;
  const match = useMatch("/tvs/:id");

  const overlayClicked = () => {
    document.body.style.overflow = "scroll";
    navigate(-1);
  };
  let clickedTv;
  if (state !== null && match) {
    if (state.category === "popular") {
      clickedTv = popularTvs.data?.results.find(
        (tv) => String(tv.id) === match.params.id
      );
    }
  }

  return (
    <Wrapper>
      {popularTvs.isLoading ? (
        <Loader>Loading ... </Loader>
      ) : (
        <>
          <Banner data={popularTvs.data} />
          <Section title="Popular">
            <Slider data={popularTvs.data} category="popular" />
          </Section>
          <AnimatePresence>
            {match && (
              <>
                <Overlay overlayClicked={overlayClicked} />
                <DetailBox
                  match={match}
                  clickedItem={clickedTv}
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

export default Tv;
