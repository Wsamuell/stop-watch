import React from 'react';
import FlexColumn from './FlexColumn';

type Props = {
  children: number;
  description: string;
};

const TimerComponentBox = ({ children, description }: Props) => {
  return (
    <FlexColumn styles="h-40 w-40 items-center p-3 border rounded bg-white m-3 opacity-75 flex justify-center drop-shadow-md">
      <div className="text-9xl">{children}</div>
      <div className="text-sm">{description}</div>
    </FlexColumn>
  );
};
export default TimerComponentBox;
