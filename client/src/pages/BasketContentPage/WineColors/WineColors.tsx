import SectionTitle from '../../../components/react-components/SectionTitle/SectionTitle';
import WineCarousel from './WineCarousel/WineCarousel';

export interface WineColorsProps {}

const WineColors = (props: WineColorsProps) => {
  return (
    <section className='wine-colors'>
      <div className='wine-colors__top'>
        <SectionTitle text='WINE CATEGORY' />
      </div>
      <div className='wine-colors__bottom'>
        <WineCarousel />
      </div>
    </section>
  );
};

export default WineColors;
