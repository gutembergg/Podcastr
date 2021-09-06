import { useCallback, useEffect, useRef, useState } from "react";
import Image from "next/image";
import { Container, Header, EmptyPlayer, Footer } from "./styles";
import Slider from "rc-slider";

import Playing from "../../../public/playing.svg";
import Shuffle from "../../../public/shuffle.svg";
import PlayPrevius from "../../../public/play-previous.svg";
import Play from "../../../public/play.svg";
import PlayNext from "../../../public/play-next.svg";
import Repeat from "../../../public/repeat.svg";
import usePlayer from "../../hooks/usePlayer";
import Pause from "../../../public/pause.svg";

import "rc-slider/assets/index.css";
import { convertDurationToTimeString } from "../../utils/convertDurationToTimeString";

export default function Player() {
  const audioRef = useRef<HTMLAudioElement>(null);

  const [progress, setProgress] = useState(0);

  const {
    episodesList,
    currentyEpisodeIndex,
    isPlaying,
    hasNext,
    hasPrevious,
    isLooping,
    isShuffling,
    togglePlayer,
    setPlayingState,
    playPrevious,
    playNext,
    toggleLoop,
    toggleShuffle,
  } = usePlayer();

  const episode = episodesList[currentyEpisodeIndex];

  useEffect(() => {
    if (!audioRef.current) {
      return;
    }

    if (isPlaying) {
      audioRef.current.play();
    } else {
      audioRef.current.pause();
    }
  }, [isPlaying]);

  const setUpProgressList = useCallback(() => {
    if (audioRef.current) {
      audioRef.current.currentTime = 0;
    }

    audioRef.current?.addEventListener("timeupdate", () => {
      if (audioRef.current?.currentTime) {
        setProgress(Math.floor(audioRef.current?.currentTime));
      }
    });

    return () => {
      audioRef.current?.removeEventListener("timeupdate", () => {
        if (audioRef.current?.currentTime) {
          setProgress(Math.floor(audioRef.current?.currentTime));
        }
      });
    };
  }, []);

  const handleSeek = useCallback((amount: number) => {
    if (audioRef.current) {
      audioRef.current.currentTime = amount;
      setProgress(amount);
    }
  }, []);

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
          <span>{convertDurationToTimeString(progress)}</span>
          {episode.id !== "" ? (
            <div className="slider_progress">
              <Slider
                max={episode.duration}
                value={progress}
                trackStyle={{ backgroundColor: "#04d361" }}
                railStyle={{ backgroundColor: "#9f75ff" }}
                handleStyle={{ borderColor: "#04d361", borderWidth: 4 }}
              />
            </div>
          ) : (
            <div className="slider">
              <div className="emptySlider" />
            </div>
          )}

          <span>{convertDurationToTimeString(episode?.duration ?? 0)}</span>
        </div>

        {episode.id !== "" && (
          <audio
            ref={audioRef}
            src={episode.url}
            autoPlay
            onPlay={() => setPlayingState(true)}
            onPause={() => setPlayingState(false)}
            loop={isLooping}
            onLoadedMetadata={setUpProgressList}
          />
        )}

        <div className="buttons">
          <button
            type="button"
            disabled={episode.id === "" || episodesList.length === 1}
            onClick={toggleShuffle}
            className={isShuffling ? "actived" : ""}
          >
            <Image src={Shuffle} alt="Embaralhar" />
          </button>
          <button
            type="button"
            disabled={episode.id === "" || !hasPrevious}
            onClick={playPrevious}
          >
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
          <button
            type="button"
            disabled={episode.id === "" || !hasNext}
            onClick={playNext}
          >
            <Image src={PlayNext} alt="Tocar proxima" />
          </button>
          <button
            type="button"
            onClick={toggleLoop}
            disabled={episode.id === ""}
            className={isLooping ? "actived" : ""}
          >
            <Image src={Repeat} alt="Repetir" />
          </button>
        </div>
      </Footer>
    </Container>
  );
}
