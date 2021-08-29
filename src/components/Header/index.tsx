import Image from "next/image";
import { format } from "date-fns";
import ptBr from "date-fns/locale/pt-BR";
import Logo from "../../../public/logo.svg";

import { Container } from "./styles";

export default function Header() {
  const currentyDate = format(new Date(), "EEEEEE, d MMM", {
    locale: ptBr,
  });
  return (
    <Container>
      <Image src={Logo} width={146} height={38} alt="img" />

      <p>O melhor para você ouvir sempre</p>

      <span>{currentyDate}</span>
    </Container>
  );
}
