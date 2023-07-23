import { Direction } from '../Helpers/Enums';

type Props = {
  size: number | string;
  direction?: Direction;
};

const Spacer = ({ size, direction = Direction.Vertical }: Props) => {
  const spacerStyle: React.CSSProperties = {
    [direction === Direction.Vertical ? 'height' : 'width']: size,
  };

  return <div style={spacerStyle} />;
};

export default Spacer;
