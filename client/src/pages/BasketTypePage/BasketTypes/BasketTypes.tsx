import { useMemo } from 'react';
import chocolateTypeImg from '../../../assets/img/chocolate-type.jpg';
import cheeseTypeImg from '../../../assets/img/type-cheese.png';
import classicTypeImg from '../../../assets/img/type-classic.png';
import './basket-types.css';
import BasketTypeItem from './BasketTypeItem/BasketTypeItem';
export interface BasketTypesProps {}

const BasketTypes = (props: BasketTypesProps) => {
  const basketTypesData = useMemo(
    () => [
      {
        bgImage: classicTypeImg,
        title: 'Classic Wine Set',
        description: 'Exclusive bottles assemblies',
      },
      {
        bgImage: cheeseTypeImg,
        title: 'Wine & Cheese',
        description: 'Magnificent flavour combinations',
      },
      {
        bgImage: chocolateTypeImg,
        title: 'Wine & Chocolate',
        description: 'The gates to gastronomic heaven',
      },
    ],
    []
  );

  return (
    <section className='equal-to-header  basket-type'>
      {basketTypesData.map(({ bgImage, title, description }, key) => (
        <BasketTypeItem
          key={key}
          bgImage={bgImage}
          title={title}
          subtitle={description}
        />
      ))}
    </section>
  );
};

export default BasketTypes;
