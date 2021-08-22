import React, { memo } from 'react';
import { useHistory } from 'react-router';
import ZoomInOutImage from '../../../../components/react-components/ZoomInOutImage/ZoomInOutImage';
import { BASKET_CONTENT_ROUTE } from '../../../../routes/routesConstants';
import './basket-type-item.css';

export interface BasketTypeItemProps {
  bgImage: string;
  title: string;
  subtitle: string;
}

const BasketTypeItem = memo(
  ({ bgImage, title, subtitle }: BasketTypeItemProps) => {
    const urlPath = useHistory();

    const onSelectClick = (): void => {
      urlPath.push(BASKET_CONTENT_ROUTE);
    };

    return (
      <ZoomInOutImage bgImage={bgImage} containerClassName='type-item'>
        <div className='type-item__container'>
          <div className='type-item__body'>
            <p className='type-item__subtitle'>{subtitle}</p>
            <h2
              className='type-item__title'
              onClick={() => console.log('click')}
            >
              {title}
            </h2>
            <button
              className='type-item__button hvr-underline-from-center'
              onClick={onSelectClick}
            >
              Select
            </button>
          </div>
        </div>
      </ZoomInOutImage>
    );
  }
);

export default BasketTypeItem;
