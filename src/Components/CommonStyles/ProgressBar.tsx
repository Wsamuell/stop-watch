import FlexColumn from './FlexColumn';

type Props = {
  progress: number;
};

function ProgressBar({ progress }: Props) {
  return (
    <FlexColumn styles="items-center p-3">
      <div className="w-full bg-gray-200 rounded-md shadow-md">
        <div
          className="bg-blue-600 text-xs text-blue-700 text-end leading-none rounded-md h-1"
          style={{ width: `${progress}%` }}
        ></div>
      </div>
    </FlexColumn>
  );
}

export default ProgressBar;
