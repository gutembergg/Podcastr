import { useContext } from "react";
import { PlayContext } from "../components/context/PlayContext";

export default function usePlayer() {
  const playerState = useContext(PlayContext);

  return playerState;
}
