import { useHistory } from 'react-router-dom';
import Button from '../../../components/react-components/Button/Button';
import { BASKET_TYPE_ROUTE } from '../../../routes/routesConstants';
import './OfferBlock.css';

export interface OfferBlockProps {}

const OfferBlock = (props: OfferBlockProps) => {
  const urlPath = useHistory();

  const onCreateBasketClick = () => {
    urlPath.push(BASKET_TYPE_ROUTE);
  };

  return (
    <article className='offer-block equal-to-header'>
      <div className='offer-block__container'>
        <p className='offer-block__text'>
          Create an amazing <br />
        </p>
        <h1 className='offer-block__title'> Wine Gift Basket </h1>
        <br />
        <p className='offer-block__text'>and order with a free delivery now</p>
        <div className='offer-block__btn-wrapper'>
          <Button
            onButtonClick={onCreateBasketClick}
            text='Create wine basket'
          />
        </div>
      </div>
    </article>
  );
};

export default OfferBlock;
