import styled from "styled-components";
import { shade } from "polished";

export const Container = styled.div`
  width: 26.5rem;

  padding: 3rem 4rem;

  height: 100vh;
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
    &.empty {
      opacity: 0.5;
    }
  }
`;

export const Header = styled.header`
  display: flex;
  align-items: center;
  gap: 1rem;
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
  .progress {
    display: flex;
    align-items: center;
    gap: 0.5rem;
    font-size: 0.875rem;

    span {
      display: inline-block;
      width: 4rem;
      text-align: center;
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

  .buttons {
    display: flex;
    align-items: center;
    justify-content: center;
    margin-top: 2.5rem;
    gap: 1.5rem;

    button {
      background: transparent;
      border: 0;
      font-size: 0;

      &:hover {
        background: ${shade(0.2, "#9164FA")};
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
