import { css } from '../../styled-system/css';

const containerCss = css({
  minHeight: '100vh',
  padding: '0 0.5rem',
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'center',
  alignItems: 'center',
  height: '100vh',
});

const mainCss = css({
  padding: '5rem 0',
  flex: '1',
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'center',
  alignItems: 'center',
});

const titleCss = css({
  margin: 0,
  lineHeight: 1.15,
  fontSize: '4rem',
});

const descriptionCss = css({
  lineHeight: '1.5',
  fontSize: '1.5rem',
});

const gridCss = css({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  maxWidth: '800px',
  marginTop: '3rem',
});

const cardCss = css({
  margin: '1rem',
  padding: '1.5rem',
  textAlign: 'left',
  color: 'inherit',
  textDecoration: 'none',
  border: '1px solid #eaeaea',
  borderRadius: '10px',
  transition: 'color 0.15s ease, border-color 0.15s ease',
  _hover: {
    color: '#0070f3',
    borderColor: '#0070f3',
  },
  _focus: {
    color: '#0070f3',
    borderColor: '#0070f3',
  },
  _active: {
    color: '#0070f3',
    borderColor: '#0070f3',
  },
  '& h2': {
    margin: '0 0 1rem 0',
    fontSize: '1.5rem',
  },
  '& p': {
    margin: '0',
    fontSize: '1.25rem',
    lineHeight: '1.5',
  },
});

export { containerCss, mainCss, titleCss, descriptionCss, gridCss, cardCss };
