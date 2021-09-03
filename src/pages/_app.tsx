import type { AppProps } from "next/app";
import Header from "../components/Header";
import Player from "../components/Player";
import GlobalStyles from "../styles/global";

import { Container } from "../styles/app.styles";
import PlayProvider from "../components/context/PlayContext";

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <PlayProvider>
      <Container>
        <main>
          <Header />
          <Component {...pageProps} />
        </main>
        <Player />
        <GlobalStyles />
      </Container>
    </PlayProvider>
  );
}
export default MyApp;
