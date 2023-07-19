import React from 'react';

type Props = {
  children: number;
};

const TimerComponentBox = ({ children }: Props) => {
  return (
    <div className="h-40 w-40 items-center p-3 border rounded bg-white m-3 opacity-75 flex justify-center drop-shadow-md">
      {children}
    </div>
  );
};
export default TimerComponentBox;
