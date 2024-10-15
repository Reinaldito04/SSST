import React from "react";
import styled, { keyframes } from "styled-components";

// Animaciones de keyframes
const circleOuter135 = keyframes`
  0% {
    stroke-dashoffset: 25;
  }
  25% {
    stroke-dashoffset: 0;
  }
  65% {
    stroke-dashoffset: 301;
  }
  80% {
    stroke-dashoffset: 276;
  }
  100% {
    stroke-dashoffset: 276;
  }
`;

const circleMiddle6123 = keyframes`
  0% {
    stroke-dashoffset: 17;
  }
  25% {
    stroke-dashoffset: 0;
  }
  65% {
    stroke-dashoffset: 204;
  }
  80% {
    stroke-dashoffset: 187;
  }
  100% {
    stroke-dashoffset: 187;
  }
`;

const circleInner162 = keyframes`
  0% {
    stroke-dashoffset: 9;
  }
  25% {
    stroke-dashoffset: 0;
  }
  65% {
    stroke-dashoffset: 106;
  }
  80% {
    stroke-dashoffset: 97;
  }
  100% {
    stroke-dashoffset: 97;
  }
`;

const textAnimation76 = keyframes`
  0% {
    clip-path: inset(0 100% 0 0);
  }
  50% {
    clip-path: inset(0);
  }
  100% {
    clip-path: inset(0 0 0 100%);
  }
`;

// Styled Components
const LoaderContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
 
`;


const WifiLoader = styled.div`
  --background: #62abff;
  --front-color: #ed1140;
  --front-color-in: #1135d4;
  --back-color: #9511ed;
  --text-color: #ed1140;
  width: 64px;
  height: 64px;
  border-radius: 50px;
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;

  svg {
    position: absolute;
    display: flex;
    justify-content: center;
    align-items: center;
  }

  svg circle {
    position: absolute;
    fill: none;
    stroke-width: 6px;
    stroke-linecap: round;
    stroke-linejoin: round;
    transform: rotate(-100deg);
    transform-origin: center;
  }

  .circle-outer {
    height: 86px;
    width: 86px;
    circle {
      stroke-dasharray: 62.75 188.25;
    }

    .back {
      stroke: var(--back-color);
      animation: ${circleOuter135} 1.8s ease infinite 0.3s;
    }

    .front {
      stroke: var(--front-color);
      animation: ${circleOuter135} 1.8s ease infinite 0.15s;
    }
  }

  .circle-middle {
    height: 60px;
    width: 60px;
    circle {
      stroke: var(--front-color-in);
      stroke-dasharray: 42.5 127.5;
    }

    .back {
      animation: ${circleMiddle6123} 1.8s ease infinite 0.25s;
    }

    .front {
      animation: ${circleMiddle6123} 1.8s ease infinite 0.1s;
    }
  }

  .text {
    position: absolute;
    bottom: -40px;
    display: flex;
    justify-content: center;
    align-items: center;
    text-transform: lowercase;
    font-weight: 500;
    font-size: 14px;
    letter-spacing: 0.2px;

    &::before,
    &::after {
      content: attr(data-text);
    }

    &::before {
      color: var(--text-color);
    }

    &::after {
      color: var(--front-color-in);
      animation: ${textAnimation76} 3.6s ease infinite;
      position: absolute;
      left: 0;
    }
  }
`;

// Componente principal
function Loading() {
  return (
    <LoaderContainer>
    <WifiLoader id="wifi-loader">
      <svg viewBox="0 0 86 86" className="circle-outer">
        <circle r="40" cy="43" cx="43" className="back"></circle>
        <circle r="40" cy="43" cx="43" className="front"></circle>
        <circle r="40" cy="43" cx="43" className="new"></circle>
      </svg>
      <svg viewBox="0 0 60 60" className="circle-middle">
        <circle r="27" cy="30" cx="30" className="back"></circle>
        <circle r="27" cy="30" cx="30" className="front"></circle>
      </svg>

      <div data-text="Loading..." className="text"></div>
    </WifiLoader>
  </LoaderContainer>
  );
}

export default Loading;
