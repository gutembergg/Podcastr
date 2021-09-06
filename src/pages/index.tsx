import { GetStaticProps } from "next";
import Image from "next/image";
import Link from "next/link";
import { format, parseISO } from "date-fns";
import ptBr from "date-fns/locale/pt-BR";
import api from "../services/api";
import { convertDurationToTimeString } from "../utils/convertDurationToTimeString";

import PlayGreen from "../../public/play-green.svg";

import {
  Container,
  LatestEpisodesBlock,
  LatestEpisodes,
  AllEpidodes,
} from "../styles/home";
import { useEffect, useRef, useState } from "react";
import usePlayer from "../hooks/usePlayer";

interface Episode {
  id: string;
  title: string;
  members: string;
  published_at: string;
  thumbnail: string;
  description: string;
  duration: number;
  file: {
    url: string;
    type: string;
    duration: number;
  };
  durationAsString: string;
  url: string;
  publishedAt: string;
}

interface Episodes {
  latestEpidodes: Episode[];
  allEpisodes: Episode[];
}

export default function Home({ latestEpidodes, allEpisodes }: Episodes) {
  const tableRef = useRef<HTMLTableSectionElement>(null);
  const { play, playList } = usePlayer();

  const _episodesList = [...latestEpidodes, ...allEpisodes];

  const [maxIndexEpisodes, setMaxIndexEpisodes] = useState(5);

  const allEpisodesFetched = allEpisodes.slice(0, maxIndexEpisodes);

  const fetchByScroll = () => {
    setMaxIndexEpisodes((prev) => prev + 5);
  };

  const getScroll = (e: any) => {
    const scrollTop = e.target.scrollTop;
    const scrollHeigth = e.target.scrollHeight;
    const clientheight = e.target.clientHeight;
    if (scrollTop + clientheight >= scrollHeigth - 10) {
      fetchByScroll();
    }
  };

  useEffect(() => {
    tableRef.current?.addEventListener("scroll", getScroll);

    const unsubscrib = tableRef.current;

    return () => {
      unsubscrib?.removeEventListener;
    };
  }, [tableRef.current?.scrollTop]);

  return (
    <Container>
      <h2>Últimos lançamentos</h2>

      <LatestEpisodesBlock>
        {latestEpidodes.map((episode, index) => {
          return (
            <LatestEpisodes key={episode.id} className="episodes">
              <div className="latest-episodes">
                <Image
                  width={192}
                  height={192}
                  src={episode.thumbnail}
                  alt={episode.title}
                  objectFit="cover"
                />
              </div>
              <div className="info">
                <Link href={`/episode/${episode.id}`}>
                  <a>{episode.title}</a>
                </Link>
                <p>
                  {episode.members.length > 30 &&
                    `${episode.members.slice(0, 23)}...`}
                </p>
                <span>{episode.publishedAt}</span>
                <span>{episode.durationAsString}</span>
              </div>
              <button
                type="button"
                onClick={() => playList(_episodesList, index)}
              >
                <Image width={20} height={20} src={PlayGreen} alt="Tocar" />
              </button>
            </LatestEpisodes>
          );
        })}
      </LatestEpisodesBlock>

      <AllEpidodes>
        <h2>Todos os episódios</h2>

        <table cellSpacing={0}>
          <thead>
            <tr>
              <th></th>
              <th>Podcast</th>
              <th>Integrantes</th>
              <th>Data</th>
              <th>Duração</th>
              <th></th>
            </tr>
          </thead>
          <tbody ref={tableRef} id="scrollArea" className="table-scroll">
            {allEpisodesFetched.map((episode, index) => {
              return (
                <tr key={episode.id}>
                  <td>
                    <Image
                      width={120}
                      height={120}
                      src={episode.thumbnail}
                      alt={episode.title}
                      objectFit="cover"
                    />
                  </td>
                  <td>
                    <Link href={`/episode/${episode.id}`}>
                      <a>{episode.title}</a>
                    </Link>
                  </td>
                  <td>{episode.members}</td>
                  <td className="publish">{episode.publishedAt}</td>
                  <td>{episode.durationAsString}</td>
                  <td>
                    <button
                      type="button"
                      onClick={() =>
                        playList(_episodesList, index + latestEpidodes.length)
                      }
                    >
                      <Image src={PlayGreen} alt="Tocar" />
                    </button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </AllEpidodes>
    </Container>
  );
}

export const getStaticProps: GetStaticProps = async (contex) => {
  const { data } = await api.get("episodes", {
    params: {
      _limit: 12,
      _sort: "published_at",
      _order: "desc",
    },
  });
  const episodes = data.map((episode: Episode) => {
    return {
      id: episode.id,
      title: episode.title,
      members: episode.members,
      thumbnail: episode.thumbnail,
      publishedAt: format(parseISO(episode.published_at), "d, MMM yy", {
        locale: ptBr,
      }),
      duration: Number(episode.file.duration),
      durationAsString: convertDurationToTimeString(
        Number(episode.file.duration)
      ),
      description: episode.description,
      url: episode.file.url,
    };
  });

  const latestEpidodes = episodes.slice(0, 2);
  const allEpisodes = episodes.slice(2, episodes.length);

  return {
    props: {
      latestEpidodes,
      allEpisodes,
    },
    revalidate: 60 * 60 * 24, // one day
  };
};
