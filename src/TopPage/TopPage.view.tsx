import {default as React} from "react";
import useStyle from "./TopPage.css";
import {Box, Container, Grid} from "@material-ui/core";
import {BasketItem, MenuItem} from "./Context/TopPageContext";
import MenuListComponent from "./Components/MenuList";
import BasketComponent from "./Components/Basket";

interface Props {
  menuList: MenuItem[];
  handleAddToOrder: (item: BasketItem) => void;
}

const View = (props: Props): JSX.Element => {
  
  const { menuList, handleAddToOrder } = props;
  const classes = useStyle();
  
  return (
    <>
      <Container maxWidth="lg">
        <Box className={classes.wrapper}>
          <Grid container spacing={2}>
            <Grid item md={8} xs={7}>
              <h1>Restaurant App</h1>
              <p>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aliquam vestibulum nulla vitae nisl imperdiet, sit amet dignissim augue tristique.
              </p>
              <p>
                In hac habitasse platea dictumst. Suspendisse et malesuada dui. Sed rhoncus gravida metus et bibendum. Nam porta nisl et nunc placerat interdum. Orci varius natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Donec molestie placerat interdum. Morbi quis sagittis est. Proin sed luctus nulla, ut tincidunt nisi.
              </p>
              
              <Box className={classes.menuList}>
                <MenuListComponent menuList={menuList} handleAddToOrder={handleAddToOrder}/>
              </Box>
              
              
            </Grid>
            <Grid item md={4} xs={5}>
              <Box className={classes.basket}>
                <BasketComponent />
              </Box>
              
            </Grid>

          </Grid>
        </Box>
      </Container>
    </>
  );
}

export default View;
