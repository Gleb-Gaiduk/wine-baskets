import Carousel, { slidesToShowPlugin } from '@brainhubeu/react-carousel';
import '@brainhubeu/react-carousel/lib/style.css';
import champaignImg from '../../../../assets/img/type-champagnes.jpg';
import redImg from '../../../../assets/img/type-red-wine.jpeg';
import roseImg from '../../../../assets/img/type-rose-wine.jpeg';
import sparklingImg from '../../../../assets/img/type-sparkling-wine.jpg';
import whiteImg from '../../../../assets/img/type-white-wine.jpg';
import './wine-carousel.css';
import WineCarouselItem from './WineCarouselItem/WineCarouselItem';

export interface WineCarouselProps {}

const WineCarousel = (props: WineCarouselProps) => {
  const wineTypes = [
    { type: 'RED WINES', image: redImg },
    { type: 'WHITE WINES', image: whiteImg },
    { type: 'ROSE WINES', image: roseImg },
    { type: 'CHAMPAGNES', image: champaignImg },
    { type: 'SPARKLING', image: sparklingImg },
  ];

  return (
    <Carousel
      plugins={[
        'infinite',
        'arrows',
        {
          resolve: slidesToShowPlugin,
          options: {
            numberOfSlides: 5,
          },
        },
      ]}
    >
      {wineTypes.map((itemData, key) => (
        <WineCarouselItem itemData={itemData} key={key} />
      ))}
    </Carousel>
  );
};

export default WineCarousel;
