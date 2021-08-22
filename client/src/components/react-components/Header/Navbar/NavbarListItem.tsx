export interface NavbarListItemProps {
  itemText: string;
  itemHref: string;
}

const NavbarListItem = ({ itemText, itemHref }: NavbarListItemProps) => {
  return (
    <li>
      <a href={itemHref}>{itemText}</a>
    </li>
  );
};

export default NavbarListItem;
