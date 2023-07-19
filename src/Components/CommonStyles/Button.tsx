import { ButtonColor, ButtonSize } from '../Helpers/Enums';

interface ButtonProps {
  onClick: () => void;
  size?: ButtonSize;
  style?: string;
  children?: React.ReactNode | string;
  color?: ButtonColor;
}

// BKMRK: Button styling and Enum is broken
const Button = ({
  onClick,
  size = ButtonSize.Medium,
  style,
  children,
  color = ButtonColor.Primary,
}: ButtonProps) => {
  return (
    <button className={`${style} ${size} ${color}`} onClick={onClick}>
      {children}
    </button>
  );
};

export default Button;
