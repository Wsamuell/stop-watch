let intervalId;

onmessage = (message) => {
  let data = message.data;

  switch (data.command) {
    case 'Running':
      intervalId = setInterval(() => {
        postMessage({ command: 'tick' });
      }, 1000);
      break;

    case 'Paused':
      clearInterval(intervalId);
      break;

    case 'Select':
      clearInterval(intervalId);
      break;
  }
};
