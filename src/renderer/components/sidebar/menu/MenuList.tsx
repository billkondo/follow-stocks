import menuItems from './menu_items';
import NavGroup from './NavGroup';

const MenuList = () => {
  return (
    <>
      {menuItems.map((menuItem) => (
        <NavGroup key={menuItem.id} item={menuItem} />
      ))}
    </>
  );
};

export default MenuList;
