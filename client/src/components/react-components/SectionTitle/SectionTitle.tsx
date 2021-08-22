import OrnamentIcon from '../../icon-components/OrnamentIcon';
import './section-title.css';

export interface SectionTitleProps {
  text: string;
}

const SectionTitle = ({ text }: SectionTitleProps) => {
  return (
    <div className='section-title'>
      <h2 className='section-title__text'>{text}</h2>
      <OrnamentIcon />
    </div>
  );
};

export default SectionTitle;
