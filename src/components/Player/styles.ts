import styled from "styled-components";

export const Container = styled.div`
  width: 26.5rem;

  padding: 2.5rem 4rem;

  background: var(--purple-500);

  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;

  strong {
    font-family: Lexend, sans-serif;
    font-weight: 600;
  }

  footer {
    align-self: stretch;
  }

  .currentyEpisode {
    text-align: center;

    img {
      width: 100%;
      height: 21rem;
      border-radius: 1.5rem;
    }

    strong {
      display: block;
      margin-top: 1rem;
      font: 600 1.1rem Lexend, sans-serif;
    }

    span {
      display: block;
      margin-top: 1rem;
      opacity: 0.6;
    }
  }
`;

export const Header = styled.header`
  display: flex;
  align-items: center;
  gap: 1rem;

  margin-bottom: 1rem;
`;

export const EmptyPlayer = styled.div`
  width: 100%;
  height: 20rem;
  border: 1px dashed var(--purple-300);
  border-radius: 1.5rem;
  text-align: center;

  display: flex;
  align-items: center;

  padding: 4rem;
  background: linear-gradient(
    143.8deg,
    rgba(145, 100, 250, 0.8) 0%,
    rgba(0, 0, 0, 0) 100%
  );
`;

export const Footer = styled.footer`
  margin-bottom: 1rem;

  &.empty .progress {
    opacity: 0.6;
  }

  .progress {
    display: flex;
    align-items: center;
    gap: 0.5rem;
    font-size: 0.875rem;
    margin-top: 1.5rem;

    span {
      display: inline-block;
      width: 4rem;
      text-align: center;
    }

    .slider_progress {
      width: 100%;
      max-width: 150px;
    }

    .slider {
      flex: 1;
      .emptySlider {
        width: 100%;
        height: 4px;
        background: var(--purple-300);
        border-radius: 2px;
      }
    }
  }

  .actived {
    img {
      filter: invert(0.35) sepia(1) saturate(3) hue-rotate(100deg);
    }
  }

  .actived:hover {
    img {
      filter: brightness(0.9) invert(0.35) sepia(1) saturate(3)
        hue-rotate(100deg);
    }
  }

  .buttons {
    display: flex;
    align-items: center;
    justify-content: center;
    margin-top: 1.5rem;
    gap: 1.5rem;

    button {
      background: transparent;
      border: 0;
      font-size: 0;
      transition: filter 0.3s;

      &:hover:not(:disabled) {
        filter: brightness(0.8);
      }

      &:disabled {
        cursor: not-allowed;
        opacity: 0.6;
      }
    }

    .play-button {
      width: 4rem;
      height: 4rem;
      border-radius: 1rem;
      background: var(--purple-400);
    }
  }
`;
