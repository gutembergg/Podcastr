import { format, parseISO } from "date-fns";
import Link from "next/link";
import Image from "next/image";
import ptBr from "date-fns/locale/pt-BR";
import { GetStaticPaths, GetStaticProps } from "next";
import api from "../../services/api";
import { convertDurationToTimeString } from "../../utils/convertDurationToTimeString";

import ArrowLeft from "../../../public/arrow-left.svg";
import Play from "../../../public/play.svg";

import { Container, ThumbnailContainer, Header, Description } from "./styles";

interface IEpisode {
  id: string;
  title: string;
  members: string;
  published_at: string;
  thumbnail: string;
  description: string;
  file: {
    url: string;
    type: string;
    duration: number;
  };
  durationAsString: string;
  url: string;
  publishedAt: string;
}

interface EpisodesProps {
  episode: IEpisode;
}

export default function Episode({ episode }: EpisodesProps) {
  return (
    <Container>
      <ThumbnailContainer>
        <Link href="/" passHref>
          <button type="button">
            <Image src={ArrowLeft} alt="Voltar" />
          </button>
        </Link>
        <Image
          className="main-image"
          width={700}
          height={160}
          src={episode.thumbnail}
          alt={episode.thumbnail}
          objectFit="cover"
        />
        <button type="button">
          <Image src={Play} alt="Tocar" />
        </button>
      </ThumbnailContainer>

      <Header>
        <h1> {episode.title}</h1>
        <span>{episode.members}</span>
        <span>{episode.publishedAt}</span>
        <span>{episode.durationAsString}</span>
      </Header>

      <Description dangerouslySetInnerHTML={{ __html: episode.description }} />
    </Container>
  );
}

export const getStaticPaths: GetStaticPaths = async () => {
  return {
    paths: [],
    fallback: "blocking",
  };
};

export const getStaticProps: GetStaticProps = async (context) => {
  const slug = context.params?.slug;

  const { data } = await api.get(`episodes/${slug}`);

  const episode = {
    id: data.id,
    title: data.title,
    members: data.members,
    thumbnail: data.thumbnail,
    publishedAt: format(parseISO(data.published_at), "d, MMM yy", {
      locale: ptBr,
    }),
    duration: Number(data.file.duration),
    durationAsString: convertDurationToTimeString(Number(data.file.duration)),
    description: data.description,
    url: data.file.url,
  };

  return {
    props: {
      episode,
    },
    revalidate: 60 * 60 * 24, // one day
  };
};
