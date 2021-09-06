import { createContext, ReactNode, useCallback, useState } from "react";

interface IChildren {
  children: ReactNode;
}

interface Episode {
  id: string;
  title: string;
  members: string;
  thumbnail: string;
  url: string;
  duration: number;
  file?: {
    url: string;
    type: string;
    duration?: number;
  };
  durationAsString?: string;
  publishedAt?: string;
}

interface PlayerContextData {
  episodesList: Episode[];
  currentyEpisodeIndex: number;
  isPlaying: boolean;
  hasNext: boolean;
  hasPrevious: boolean;
  isLooping: boolean;
  isShuffling: boolean;
  play: (episode: Episode) => void;
  togglePlayer: () => void;
  setPlayingState: (state: boolean) => void;
  playList: (list: Episode[], selectedIndex: number) => void;
  playNext: () => void;
  playPrevious: () => void;
  toggleLoop: () => void;
  toggleShuffle: () => void;
}

interface Episodes {
  episodes: Episode[];
}

export const PlayContext = createContext<PlayerContextData>(
  {} as PlayerContextData
);

export default function PlayProvider({ children }: IChildren) {
  const [episodesList, setEpisodesList] = useState([
    {
      id: "",
      title: "",
      members: "",
      thumbnail: "",
      url: "",
      duration: 0,
    },
  ]);
  const [currentyEpisodeIndex, setCurrentyEpisodeIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isLooping, setIsLooping] = useState(false);
  const [isShuffling, setIsShuffling] = useState(false);

  const play = useCallback((episode: Episode) => {
    setEpisodesList([episode]);
    setCurrentyEpisodeIndex(0);
    setIsPlaying(true);
  }, []);

  const togglePlayer = useCallback(() => {
    setIsPlaying(!isPlaying);
  }, [isPlaying]);

  const toggleLoop = useCallback(() => {
    setIsLooping(!isLooping);
  }, [isLooping]);

  const toggleShuffle = useCallback(() => {
    setIsShuffling(!isShuffling);
  }, [isShuffling]);

  const setPlayingState = useCallback((state: boolean) => {
    setIsPlaying(state);
  }, []);

  const playList = useCallback((list: Episode[], selectedIndex: number) => {
    setEpisodesList(list);
    setCurrentyEpisodeIndex(selectedIndex);
    setIsPlaying(true);
  }, []);

  const hasNext = currentyEpisodeIndex + 1 < episodesList.length;
  const hasPrevious = currentyEpisodeIndex > 0;

  const playNext = useCallback(() => {
    console.log("isShuffling", isShuffling);
    if (isShuffling) {
      const nextRandomEpisodeIndex = Math.floor(
        Math.random() * episodesList.length
      );

      setCurrentyEpisodeIndex(nextRandomEpisodeIndex);
    } else if (hasNext) {
      setCurrentyEpisodeIndex((prev) => prev + 1);
    }
  }, [hasNext, isShuffling, episodesList.length]);

  const playPrevious = useCallback(() => {
    if (hasPrevious) {
      setCurrentyEpisodeIndex((prev) => prev - 1);
    }
  }, [hasPrevious]);

  return (
    <PlayContext.Provider
      value={{
        episodesList,
        currentyEpisodeIndex,
        isPlaying,
        hasNext,
        hasPrevious,
        isLooping,
        isShuffling,
        play,
        togglePlayer,
        setPlayingState,
        playList,
        playNext,
        playPrevious,
        toggleLoop,
        toggleShuffle,
      }}
    >
      {children}
    </PlayContext.Provider>
  );
}
