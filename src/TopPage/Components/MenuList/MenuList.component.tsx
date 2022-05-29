import {default as React} from "react";
import {BasketItem, MenuItem} from "../../Context/TopPageContext";
import View from "./MenuList.view";

interface Props {
  menuList: MenuItem[];
  handleAddToOrder: (item: BasketItem) => void;
}

const MenuListComponent = (props: Props): JSX.Element => {
  
  
  return <View
    menuList={props.menuList}
    handleAddToOrder={props.handleAddToOrder}
  />
}

export default MenuListComponent;