import { ButtonColor, ButtonSize } from '../Helpers/Enums';

interface ButtonProps {
  onClick: () => void;
  size?: ButtonSize;
  style?: string;
  children?: React.ReactNode | string;
  color?: ButtonColor;
  disabled?: boolean;
}

// BKMRK: Button styling and Enum is broken
const Button = ({
  onClick,
  size,
  style,
  children,
  color,
  disabled = false,
}: ButtonProps) => {
  return (
    <button
      disabled={disabled}
      className={`${style} ${size} ${color}`}
      onClick={onClick}
    >
      {children}
    </button>
  );
};

export default Button;
