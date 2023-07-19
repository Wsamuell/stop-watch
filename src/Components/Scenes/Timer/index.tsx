import React, { useEffect } from 'react';
import Input from '../../CommonStyles/Input';
import FlexRow from '../../CommonStyles/FlexRow';
import FlexColumn from '../../CommonStyles/FlexColumn';
import Button from '../../CommonStyles/Button';

type Props = {};

const Timer = ({}: Props) => {
  const [hours, setHours] = React.useState(0);
  const [minutes, setMinutes] = React.useState(0);
  const [seconds, setSeconds] = React.useState(0);

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value;
    const regex = /^[0-9]{0,2}$/; // Regular expression to allow only up to two digits

    if (regex.test(value)) {
      // Update the state or perform other actions with the valid input
    }
  };
  // useEffect(() => {
  //   const updateTimer = () => {
  //     if (hours === 0 && minutes === 0 && seconds === 0) {
  //       clearInterval(intervalId);
  //       // Timer finished, do something here if needed
  //     } else {
  //       if (seconds === 0) {
  //         if (minutes === 0) {
  //           setHours((prev) => prev - 1);
  //           setMinutes(59);
  //         } else {
  //           setMinutes((prev) => prev - 1);
  //         }
  //         setSeconds(59);
  //       } else {
  //         setSeconds((prev) => prev - 1);
  //       }
  //     }
  //   };
  //   const intervalId = setInterval(updateTimer, 1000);

  //   // Cleanup the interval when the component is unmounted
  //   return () => clearInterval(intervalId);
  // }, [hours, minutes, seconds]);
  return (
    <FlexColumn styles="p-3">
      <FlexRow styles="justify-center">
        <Input
          childText="Hours"
          value={hours}
          onChange={(event) => setHours(Number(event.target.value))}
          placeholder="00"
        />
        <Input
          childText="Minutes"
          value={minutes}
          onChange={(event) => setMinutes(Number(event.target.value))}
          placeholder="00"
        />
        <Input
          childText="Seconds"
          value={seconds}
          onChange={(event) => setSeconds(Number(event.target.value))}
          placeholder="00"
        />
      </FlexRow>
      <FlexRow>
        <Button onClick={() => console.log('Cancel...')} children="Cancel" />
        <Button onClick={() => console.log('starting...')} children="Start" />
      </FlexRow>
    </FlexColumn>
  );
};

export default Timer;
