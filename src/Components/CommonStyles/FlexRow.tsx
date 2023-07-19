import { ReactNode } from 'react';

type Props = {
  children: ReactNode;
  styles?: string;
};

const FlexRow = ({ children, styles }: Props) => {
  return <div className={`flex flex-row ${styles} `}>{children}</div>;
};

export default FlexRow;
