import { PuffLoader } from 'react-spinners';

const Loader = () => {
  return (
    <div
      className="
      h-full
      flex
      flex-col
      justify-center
      items-center
    "
    >
      <PuffLoader size={100} color="red" />
    </div>
  );
};

export default Loader;
