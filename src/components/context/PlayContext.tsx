import { createContext, ReactNode, useState } from "react";

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
}

interface PlayerContextData {
  episodesList: Episode[];
  currentyEpisodeIndex: number;
  isPlaying: boolean;
  play: (episode: Episode) => void;
  togglePlayer: () => void;
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

  const play = (episode: Episode) => {
    setEpisodesList([episode]);
    setCurrentyEpisodeIndex(0);
    setIsPlaying(true);
  };

  const togglePlayer = () => {
    setIsPlaying(!isPlaying);
  };

  return (
    <PlayContext.Provider
      value={{
        episodesList,
        currentyEpisodeIndex,
        play,
        isPlaying,
        togglePlayer,
      }}
    >
      {children}
    </PlayContext.Provider>
  );
}
