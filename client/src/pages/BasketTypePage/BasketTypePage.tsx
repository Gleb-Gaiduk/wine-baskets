import typePageImage from '../../assets/img/basket-type-page.jpg';
import BasketTypes from './BasketTypes/BasketTypes';
import FirstScreenTemplate from '../../components/react-components/FirstScreenTemplate/FirstScreenTemplate';
import './basket-type-page.css';

export interface BasketTypePageProps {}

const BasketTypePage = (props: BasketTypePageProps) => {
  return (
    <FirstScreenTemplate bgImage={typePageImage}>
      <div className='type-page__body'>
        <BasketTypes />
      </div>
    </FirstScreenTemplate>
  );
};

export default BasketTypePage;
