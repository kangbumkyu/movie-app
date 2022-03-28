import styled from "styled-components";
import { motion } from "framer-motion";
import React from "react";

interface IOverlayProps {
  overlayClicked: React.MouseEventHandler;
}

const Container = styled(motion.div)`
  width: 100%;
  height: 100%;
  position: fixed;
  top: 0;
  background-color: rgba(0, 0, 0, 0.8);
  opacity: 0;
`;

function Overlay({ overlayClicked }: IOverlayProps) {
  return (
    <Container
      onClick={overlayClicked}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    ></Container>
  );
}

export default Overlay;
