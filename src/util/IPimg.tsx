import { PropsWithHTMLElementAttributes } from "./domTypes";
import { classNames } from "./styling";

interface Props {
  name: string;
  size?: 10 | 15 | 20 | 25 | 30 | 50 | 100;
}

const IPimg = ({
  name,
  size,
  className,
  ...rest
}: PropsWithHTMLElementAttributes<Props>) => {
  return (
    <img
      src={get_image(`images/${name}.png`)}
      alt={name}
      className={classNames({ [`w${size}`]: !!size }, className)}
      {...rest}
    />
  );
};

export default IPimg;
