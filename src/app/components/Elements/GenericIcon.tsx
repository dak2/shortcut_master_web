import { TbBrandVscode } from 'react-icons/tb';
import { AiOutlineGithub, AiOutlineSlack, AiFillChrome } from 'react-icons/ai';
import { cva } from '../../../../styled-system/css';

type IconProps = {
  type: string;
  size: 'small' | 'medium' | 'large' | 'xlarge';
};

type IconList = {
  [key: string]: JSX.Element;
};

const iconList: IconList = {
  slack: <AiOutlineSlack />,
  vscode: <TbBrandVscode />,
  github: <AiOutlineGithub />,
  chrome: <AiFillChrome />,
};

const iconSizeRecipe = cva({
  base: { fontSize: '2rem' },
  variants: {
    size: {
      small: { fontSize: '1.5rem' },
      medium: { fontSize: '2rem' },
      large: { fontSize: '3rem' },
      xlarge: { fontSize: '5rem' },
    },
  },
});

const GenericIcon = ({ type, size }: IconProps) => {
  return <div className={iconSizeRecipe({ size })}>{iconList[type]}</div>;
};

export default GenericIcon;
