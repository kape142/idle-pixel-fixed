
interface Props {
  name: string
  size?: 10 | 15 | 20 | 25 | 30 | 50 | 100
}

const IPimg = ({name, size}: Props) => {
  return (
    <img src={get_image(`images/${name}.png`)} alt={name} className={size ? `w${size}` : undefined} />
  );
};

export default IPimg;
