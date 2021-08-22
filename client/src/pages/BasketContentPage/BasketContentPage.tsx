import contentPageImage from '../../assets/img/content-page.jpg';
import { MaxWidthContainer } from '../../components/common-styled-components/MaxWidthContainer';
import FirstScreenTemplate from '../../components/react-components/FirstScreenTemplate/FirstScreenTemplate';
import './basket-content-page.css';
import WineColors from './WineColors/WineColors';

export interface BasketContentPageProps {}

const BasketContentPage = (props: BasketContentPageProps) => {
  return (
    <FirstScreenTemplate bgImage={contentPageImage}>
      <MaxWidthContainer>
        <div className='content-page__body equal-to-header'>
          <WineColors />
        </div>
      </MaxWidthContainer>
    </FirstScreenTemplate>
  );
};

export default BasketContentPage;
