import Image from "next/image";
import Logo from "../../../public/logo.svg";

import { Container } from "./styles";

export default function Header() {
  return (
    <Container>
      <Image src={Logo} alt="img" />
    </Container>
  );
}
