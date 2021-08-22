import homeImage from '../../assets/img/hp-first-screen.webp';
import { MaxWidthContainer } from '../../components/common-styled-components/MaxWidthContainer';
import FirstScreenTemplate from '../../components/react-components/FirstScreenTemplate/FirstScreenTemplate';
import './home-page.css';
import OfferBlock from './OfferBlock/OfferBlock';

export interface HomePageProps {}

const HomePage = (props: HomePageProps) => {
  return (
    <FirstScreenTemplate bgImage={homeImage}>
      <MaxWidthContainer>
        <div className='homepage__offer-wrapper'>
          <OfferBlock />
        </div>
      </MaxWidthContainer>
    </FirstScreenTemplate>
  );
};

export default HomePage;
