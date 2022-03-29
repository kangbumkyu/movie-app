import styled from "styled-components";
import { motion, useViewportScroll } from "framer-motion";
import { PathMatch } from "react-router-dom";
import { IMovie, ITv } from "../api";
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

const DetailCover = styled.div`
  width: 100%;
  height: 400px;
  background-size: cover;
  background-position: center center;
`;

const DetailTitle = styled.h3`
  color: ${(props) => props.theme.white.lighter};
  padding: 10px;
  font-size: 40px;
  font-weight: 400;
  position: relative;
  top: -60px;
`;

const DetailOverview = styled.p`
  color: ${(props) => props.theme.white.lighter};
  padding: 10px;
`;

interface IDetailBox {
  match: PathMatch;
  clickedItem?: IMovie | ITv | null | undefined;
  category: string;
}

function MovieDetailBox({ match, clickedItem, category }: IDetailBox) {
  const { scrollY } = useViewportScroll();
  return (
    <Container
      style={{ top: scrollY.get() + 100 }}
      layoutId={match.params.id + category}
    >
      {clickedItem && (
        <>
          <DetailCover
            style={{
              backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5)), url(${getImagePath(
                clickedItem.poster_path,
                "w500"
              )})`,
            }}
          />
          <DetailTitle>
            {"title" in clickedItem ? clickedItem.title : clickedItem.name}
          </DetailTitle>
          <DetailOverview>{clickedItem.overview}</DetailOverview>
        </>
      )}
    </Container>
  );
}

export default MovieDetailBox;
