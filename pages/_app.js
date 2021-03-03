// pages/_app.js
import "mvp.css/mvp.css";

export default function App({ Component, pageProps }) {
  return (
    <main>
      <Component {...pageProps} />
    </main>
  );
}
