import React from "react";
import styled from "styled-components";

const Container = styled.div`
  width: 100%;
  height: 150px;
  position: relative;
  top: -100px;
  padding: 0 10px;
  /* margin-bottom: 100px; */
`;

const Title = styled.h1`
  font-size: 24px;
  font-weight: 400;
  margin-bottom: 10px;
`;

interface ISectionProps {
  title: String;
  children: React.ReactNode;
}

function Section({ children, title }: ISectionProps) {
  return (
    <Container>
      <Title>{title}</Title>
      {children}
    </Container>
  );
}

export default Section;
