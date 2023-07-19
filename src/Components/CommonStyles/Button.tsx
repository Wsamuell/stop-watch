import { ButtonColor, ButtonSize } from '../Helpers/Enums';

interface ButtonProps {
  onClick: () => void;
  size?: ButtonSize;
  style?: string;
  text: string;
  color?: ButtonColor;
}

// BKMRK: Button styling and Enum is broken
const Button = ({
  onClick,
  size = ButtonSize.Medium,
  style,
  text,
  color = ButtonColor.Primary,
}: ButtonProps) => {
  const sizeType = size ? `btn-${size}` : 'BKMRK-defaultbtnCOlor';
  return (
    <button className={`${style} ${sizeType} ${color}`} onClick={onClick}>
      {text}
    </button>
  );
};

export default Button;
