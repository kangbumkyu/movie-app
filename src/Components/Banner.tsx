import styled from "styled-components";
import { IGetMoviesResult, IGetTvsResult } from "../api";
import { getImagePath } from "../utils";

const Container = styled.div<{ bgImage: string }>`
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

interface IBannerProps {
  data: IGetMoviesResult | IGetTvsResult | undefined;
}

function Banner({ data }: IBannerProps) {
  return (
    <Container bgImage={getImagePath(data?.results[0].backdrop_path || "")}>
      <Title>
        {data && "title" in data.results[0]
          ? data.results[0].title
          : data && "name" in data.results[0] && data.results[0].name}
      </Title>
      <Overview>{data?.results[0].overview}</Overview>
    </Container>
  );
}

export default Banner;
