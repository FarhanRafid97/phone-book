import { Loader } from 'lucide-react';

const Spinner: React.FC<{ size?: number; color?: string }> = ({
  size = 40,
  color = 'white',
}) => {
  return <Loader className="spinner" size={size} color={color} />;
};

export default Spinner;
