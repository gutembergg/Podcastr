import styled from "styled-components";

export const Container = styled.div`
  height: calc(100vh - 6.5rem);
  padding: 0 4rem;

  h2 {
    margin-top: 1rem;
  }
`;

export const LatestEpisodesBlock = styled.section`
  display: flex;
  gap: 1rem;

  margin-top: 1.5rem;
`;

export const LatestEpisodes = styled.div`
  flex: 1;
  display: flex;
  align-items: center;
  max-width: 700px;

  background: #fff;
  border: 1px solid #fff;
  border-radius: 1.5rem;

  padding: 1rem;
  position: relative;

  .latest-episodes {
    img {
      width: 9rem;
      height: 7rem;
      border-radius: 1rem;
    }
  }

  .info {
    flex: 1;
    margin-left: 1rem;

    a {
      display: block;
      color: var(--gray-800);
      text-decoration: none;
      font-family: Lexend, sans-serif;
      font-weight: 600;
      line-height: 1.4rem;

      &:hover {
        text-decoration: underline;
      }
    }

    p {
      font-style: 0.875rem;
      margin-top: 0.5rem;
      max-width: 70%;
      //white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
    }
    span {
      display: inline-block;
      margin-top: 0.5rem;
      font-size: 0%.875rem;

      &:last-child {
        margin-left: 0.5rem;
        padding-left: 0.5rem;
        position: relative;

        &::before {
          content: "";
          width: 4px;
          height: 4px;
          border-radius: 2px;
          background: #ddd;
          position: absolute;
          left: 0;
          top: 50%;

          transform: translate(-50%, -50%);
        }
      }
    }
  }
  button {
    position: absolute;
    right: 2rem;
    bottom: 2rem;
    background: var(--white);
    border: 1px solid var(--gray-100);
    border-radius: 0.5rem;

    font-size: 0;

    img {
      width: 1.7rem;
      height: 1.7rem;
    }

    &:hover {
      filter: brightness(0.8);
    }
  }
`;

export const AllEpidodes = styled.section``;
