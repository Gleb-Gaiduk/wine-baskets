import NavbarListItem from './NavbarListItem';

export interface NavbarProps {}

const Navbar = (props: NavbarProps) => {
  return (
    <nav className='navbar'>
      <ul className='navbar__list'>
        <NavbarListItem itemText={'Home'} itemHref={'/'} />
      </ul>
    </nav>
  );
};

export default Navbar;
