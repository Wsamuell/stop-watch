import React from 'react';
import Input from '../CommonStyles/Input';
import FlexRow from '../CommonStyles/FlexRow';

type Props = {};

const Timer = ({}: Props) => {
  const [hours, setHours] = React.useState(0);
  const [minutes, setMinutes] = React.useState(0);
  const [seconds, setSeconds] = React.useState(0);
  return (
    <FlexRow>
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
  );
};

export default Timer;
