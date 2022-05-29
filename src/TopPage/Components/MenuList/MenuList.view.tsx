import {default as React} from "react";
import useStyle from "./MenuList.css";
import {BasketItem, MenuItem} from "../../Context/TopPageContext";
import { Grid } from "@material-ui/core";
import MenuItemComponent from "./MenuItem";

interface Props {
  menuList: MenuItem[];
  handleAddToOrder: (item: BasketItem) => void;
}

const View = (props: Props): JSX.Element => {
  const { menuList, handleAddToOrder } = props;
  const classes = useStyle();
  
  return (
    <Grid className={classes.container} container spacing={2}>
      {menuList.map((item, index) => {
        return (
          <Grid item xs={6} md={4} key={`item-${index}`}>
            <MenuItemComponent menuItem={item} handleAddToOrder={handleAddToOrder} />
          </Grid>
        )
      })}
    </Grid>
  )
  
}
export default View;
