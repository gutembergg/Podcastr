import { GetStaticProps } from "next";
import api from "../services/api";

interface Episode {
  id: string;
  title: string;
  members: string;
  published_at: string;
  thumbnail: string;
}

interface Episodes {
  episodes: Episode[];
}

export default function Home({ episodes }: Episodes) {
  return <div>{JSON.stringify(episodes)}</div>;
}

export const getStaticProps: GetStaticProps = async (contex) => {
  const response = await api.get("episodes");
  const episodes = await response.data;

  return {
    props: {
      episodes,
    },
    revalidate: 60 * 60 * 24, // one day
  };
};
