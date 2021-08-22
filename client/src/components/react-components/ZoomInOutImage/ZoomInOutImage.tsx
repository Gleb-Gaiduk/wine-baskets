import { useRef } from 'react';
import './zoom-in-out-image.css';

export interface ZoomInOutImageProps {
  children: React.ReactNode;
  bgImage: string;
  containerClassName: string;
  imageClassName?: string;
}

const ZoomInOutImage = ({
  children,
  bgImage,
  containerClassName,
  imageClassName,
}: ZoomInOutImageProps) => {
  const imageHolderRef = useRef<HTMLImageElement>(null);

  const onImgContainerHover = (): void => {
    if (imageHolderRef.current) {
      imageHolderRef.current.style.transform = 'scale(1.2)';
    }
  };

  const onImgContainerOut = (): void => {
    if (imageHolderRef.current) {
      imageHolderRef.current.style.transform = 'scale(1)';
    }
  };

  return (
    <div
      className={`${containerClassName} zoom-img`}
      onMouseOver={onImgContainerHover}
      onMouseOut={onImgContainerOut}
    >
      <img
        className={`${imageClassName} zoom-img__container`}
        ref={imageHolderRef}
        alt=''
        style={{ backgroundImage: `url(${bgImage})` }}
      />
      {children}
    </div>
  );
};

export default ZoomInOutImage;
