import { motion } from 'framer-motion';
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
    <motion.div
      whileTap={{ scale: 0.9 }}
      whileHover={{ scale: 1.1, cursor: 'pointer' }}
      transition={{ duration: 0.5 }}
    >
      <button
        disabled={disabled}
        className={`${style} ${size} ${color}`}
        onClick={onClick}
      >
        {children}
      </button>
    </motion.div>
  );
};

export default Button;
