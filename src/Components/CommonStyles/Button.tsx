import { motion } from 'framer-motion';
import { ButtonColor, ButtonSize } from '../Helpers/Enums';

interface ButtonProps {
  onClick?: () => void;
  size?: ButtonSize;
  style?: string;
  children?: React.ReactNode | string;
  color?: ButtonColor;
  disabled?: boolean;
  link?: string;
}

const Button = ({
  onClick,
  size,
  style,
  children,
  color,
  disabled = false,
  link,
}: ButtonProps) => {
  const handleLink = () => {
    if (link) {
      window.open(link, '_blank');
    } else if (onClick) {
      onClick();
    }
  };
  return (
    <motion.div
      whileTap={{ scale: 0.9 }}
      whileHover={{ scale: 1.1, cursor: 'pointer' }}
      transition={{ duration: 0.5 }}
    >
      <button
        disabled={disabled}
        className={`${style} ${size} ${color}`}
        onClick={handleLink}
      >
        {children}
      </button>
    </motion.div>
  );
};

export default Button;
