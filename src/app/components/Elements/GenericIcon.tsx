import { TbBrandVscode } from 'react-icons/tb';
import { AiOutlineGithub, AiOutlineSlack, AiFillChrome } from 'react-icons/ai';
import { css } from '../../../../styled-system/css';

type IconProps = {
  type: string;
  size: 'small' | 'medium' | 'large';
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

const GenericIcon = ({ type, size }: IconProps) => {
  const iconSize = () => {
    switch (size) {
      case 'small':
        return '1.5rem';
      case 'medium':
        return '2rem';
      case 'large':
        return '3rem';
      default:
        return '2rem';
    }
  };

  const iconCss = css({
    fontSize: iconSize(),
  });

  return <div className={iconCss}>{iconList[type]}</div>;
};

export default GenericIcon;
