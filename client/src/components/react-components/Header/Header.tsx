import { Link } from 'react-router-dom';
import { MaxWidthContainer } from '../../common-styled-components/MaxWidthContainer';
import GrapeIcon from '../../icon-components/GrapeIcon';
import './header.css';
import UserInteraction from './UserInteraction/UserInteraction';

export interface HeaderProps {}

const Header = (props: HeaderProps) => {
  return (
    <header className='app-header'>
      <div className='header__wrapper'>
        <MaxWidthContainer>
          <div className='app-header__container'>
            <Link to='/'>
              <div className='app-header__logo'>
                <span className='app-header__logo-text app-header__logo-text--position--left'>
                  Wine
                </span>
                <GrapeIcon width='75' height='60' />
                <span className='app-header__logo-text'>Baskets</span>
              </div>
            </Link>
            {/* <div>
          <Navbar />
        </div> */}
            <div>
              <UserInteraction />
            </div>
          </div>
        </MaxWidthContainer>
      </div>
    </header>
  );
};

export default Header;
