interface Props {
  name: string;
  size?: 10 | 15 | 20 | 25 | 30 | 50 | 100;
}

const Tooltip = ({
  name,
  size,
}: Props) => {
  return (
    <img
      src={get_image(`images/${name}.png`)}
      alt={name}
    />
  );
};

export default Tooltip;
