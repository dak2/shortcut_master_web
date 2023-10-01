import Link from 'next/link';
import { css } from '../../../../styled-system/css';
import { flex } from '../../../../styled-system/patterns';
import LogoutButton from 'app/components/Button/LogoutButton';

const headerCss = flex({
  justifyContent: 'space-between',
  borderBottom: 'solid 1px #d9d9d9',
  boxShadow: '0px 8px 5px -5px #d9d9d9',
});

const textCss = css({
  fontSize: '1.2rem',
  fontWeight: 'bold',
});

const textContainerCss = css({
  margin: '1% 1% 1% 3%',
});

const buttonContainerCss = css({
  margin: '1% 3% 1% 1%',
});

export const Header = () => {
  return (
    <header className={headerCss}>
      <div className={textContainerCss}>
        <Link href="/">
          <p className={textCss}>ショートカットマスター</p>
        </Link>
      </div>
      <div className={buttonContainerCss}>
        <LogoutButton />
      </div>
    </header>
  );
};
