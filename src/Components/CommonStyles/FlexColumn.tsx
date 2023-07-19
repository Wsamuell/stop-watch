import { ReactNode } from 'react';

type Props = {
  children: ReactNode;
  styles?: string;
};

const FlexColumn = ({ children, styles }: Props) => {
  return <div className={`flex flex-col ${styles} `}>{children}</div>;
};

export default FlexColumn;
