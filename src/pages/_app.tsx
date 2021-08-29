import type { AppProps } from "next/app";
import Header from "../components/Header";
import Player from "../components/Player";
import GlobalStyles from "../styles/global";

import { Container } from "../styles/app.styles";

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <Container>
      <main>
        <Header />
        <Component {...pageProps} />
      </main>
      <Player />
      <GlobalStyles />
    </Container>
  );
}
export default MyApp;
