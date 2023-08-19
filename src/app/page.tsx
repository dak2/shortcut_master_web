import GoogleLoginProvider from 'providers/GoogleLoginProvider';
import styles from 'styles/Home.module.css';

export default function Home() {
  return (
    <div className={styles.container}>
      <main className={styles.main}>
        <h1 className={styles.title}>shortcut master</h1>

        <p className={styles.description}>ショートカットをマスターしよう</p>

        <div className={styles.grid}>
          <a href="https://nextjs.org/docs" className={styles.card}>
            <h2>Shortcut master ? &rarr;</h2>
            <p>このアプリについての説明</p>
          </a>

          <a href="https://github.com/vercel/next.js/tree/master/examples" className={styles.card}>
            <h2>Examples &rarr;</h2>
            <p>実際の使い方を見てみる</p>
          </a>
        </div>

        <GoogleLoginProvider />
      </main>

      <footer className={styles.footer}>
        <a
          href="https://vercel.com?utm_source=create-next-app&utm_medium=default-template&utm_campaign=create-next-app"
          target="_blank"
          rel="noopener noreferrer"
        >
          Created by dak2
        </a>
      </footer>
    </div>
  );
}