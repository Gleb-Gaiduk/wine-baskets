import PlusIcon from '../../../../../components/icon-components/PlusIcon';
import ZoomInOutImage from '../../../../../components/react-components/ZoomInOutImage/ZoomInOutImage';
import './wine-carousel-item.css';

export interface WineCarouselItemProps {
  itemData: { image: string; type: string };
}

const WineCarouselItem = ({ itemData }: WineCarouselItemProps) => {
  return (
    <div className='wine-carousel-item'>
      <ZoomInOutImage
        bgImage={itemData.image}
        containerClassName='wine-carousel-item__img-wrapper'
        imageClassName='wine-carousel-item__image'
      >
        <div className='wine-carousel-item__inter-layer'>
          <span className='wine-carousel-item__add-btn'>
            <PlusIcon size='40' color='#fff' />
          </span>
        </div>
      </ZoomInOutImage>

      <h3 className='wine-carousel-item__title'>{itemData.type}</h3>
    </div>
  );
};

export default WineCarouselItem;
