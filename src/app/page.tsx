import GoogleLoginProvider from 'app/providers/GoogleLoginProvider';
import { css } from '../../styled-system/css';
import { containerCss, mainCss, titleCss, descriptionCss, gridCss, cardCss } from 'styles/HomeStyle';

export default function Home() {
  return (
    <div className={containerCss}>
      <main className={mainCss}>
        <h1 className={titleCss}>shortcut master</h1>

        <p className={descriptionCss}>ショートカットをマスターしよう</p>

        <div className={gridCss}>
          <a href="https://nextjs.org/docs" className={cardCss}>
            <h2>Shortcut master ? &rarr;</h2>
            <p>このアプリについての説明</p>
          </a>

          <a href="https://github.com/vercel/next.js/tree/master/examples" className={cardCss}>
            <h2>Examples &rarr;</h2>
            <p>実際の使い方を見てみる</p>
          </a>
        </div>

        <GoogleLoginProvider />
      </main>
    </div>
  );
}
