import Image from "next/image";
import { Container, Header, EmptyPlayer, Footer } from "./styles";
import Slider, { Range } from "rc-slider";

import Playing from "../../../public/playing.svg";
import Shuffle from "../../../public/shuffle.svg";
import PlayPrevius from "../../../public/play-previous.svg";
import Play from "../../../public/play.svg";
import PlayNext from "../../../public/play-next.svg";
import Repeat from "../../../public/repeat.svg";
import usePlayer from "../../hooks/usePlayer";
import Pause from "../../../public/pause.svg";

import "rc-slider/assets/index.css";

export default function Player() {
  const { episodesList, currentyEpisodeIndex, isPlaying, togglePlayer } =
    usePlayer();

  const episode = episodesList[currentyEpisodeIndex];
  return (
    <Container>
      <Header>
        <Image src={Playing} alt="tocando agora" />
        <strong>Tocando agora</strong>
      </Header>

      {episode.id !== "" ? (
        <div className="currentyEpisode">
          <Image
            width={592}
            height={592}
            src={episode.thumbnail}
            alt="Foto"
            objectFit="cover"
          />
          <strong>{episode.title}</strong>
          <span>{episode.members}</span>
        </div>
      ) : (
        <EmptyPlayer>
          <strong>Selecione um podcast para ouvir</strong>
        </EmptyPlayer>
      )}

      <Footer className={episode.id === "" ? "empty" : ""}>
        <div className="progress">
          <span>00:00</span>
          {episode.id !== "" ? (
            <>
              <Slider
                trackStyle={{ backgroundColor: "#04d361" }}
                railStyle={{ backgroundColor: "#9f75ff" }}
                handleStyle={{ borderColor: "#04d361", borderWidth: 4 }}
              />
            </>
          ) : (
            <div className="slider">
              <div className="emptySlider" />
            </div>
          )}

          <span>00:00</span>
        </div>

        {episode.id !== "" && <audio src={episode.url} autoPlay />}

        <div className="buttons">
          <button
            type="button"
            disabled={episode.id === ""}
            onClick={() => console.log("1111111111")}
          >
            <Image src={Shuffle} alt="Embaralhar" />
          </button>
          <button type="button" disabled={episode.id === ""}>
            <Image src={PlayPrevius} alt="Tocar anterior" />
          </button>

          <button
            type="button"
            disabled={episode.id === ""}
            className="play-button"
            onClick={togglePlayer}
          >
            <Image src={isPlaying ? Pause : Play} alt="Tocar/pause" />
          </button>
          <button type="button" disabled={episode.id === ""}>
            <Image src={PlayNext} alt="Tocar proxima" />
          </button>
          <button type="button" disabled={episode.id === ""}>
            <Image src={Repeat} alt="Repetir" />
          </button>
        </div>
      </Footer>
    </Container>
  );
}
