import Image from "next/image";
import { Container, Header, EmptyPlayer, Footer } from "./styles";

import Playing from "../../../public/playing.svg";
import Shuffle from "../../../public/shuffle.svg";
import PlayPrevius from "../../../public/play-previous.svg";
import Play from "../../../public/play.svg";
import PlayNext from "../../../public/play-next.svg";
import Repeat from "../../../public/repeat.svg";

export default function Player() {
  return (
    <Container>
      <Header>
        <Image src={Playing} alt="tocando agora" />
        <strong>Tocando agora</strong>
      </Header>

      <EmptyPlayer>
        <strong>Selecione um podcast para ouvir</strong>
      </EmptyPlayer>

      <Footer className="empty">
        <div className="progress">
          <span>00:00</span>
          <div className="slider">
            <div className="emptySlider" />
          </div>
          <span>00:00</span>
        </div>

        <div className="buttons">
          <button type="button">
            <Image src={Shuffle} alt="Embaralhar" />
          </button>
          <button type="button">
            <Image src={PlayPrevius} alt="Tocar anterior" />
          </button>
          <button type="button" className="play-button">
            <Image src={Play} alt="Tocar" />
          </button>
          <button type="button">
            <Image src={PlayNext} alt="Tocar proxima" />
          </button>
          <button type="button">
            <Image src={Repeat} alt="Repetir" />
          </button>
        </div>
      </Footer>
    </Container>
  );
}
