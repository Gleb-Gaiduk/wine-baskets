import { MaxWidthContainer } from '../../common-styled-components/MaxWidthContainer';
import './first-screen-template.css';

export interface FirstScreenTemplateProps {
  children: React.ReactNode;
  bgImage: string;
}

const FirstScreenTemplate = ({
  bgImage,
  children,
}: FirstScreenTemplateProps) => {
  return (
    <div className='first-screen'>
      <section
        className='first-screen__body'
        style={{ backgroundImage: `url(${bgImage})` }}
      >
        <MaxWidthContainer>
          <div className='first-screen__container'>{children}</div>
        </MaxWidthContainer>
      </section>
    </div>
  );
};

export default FirstScreenTemplate;
