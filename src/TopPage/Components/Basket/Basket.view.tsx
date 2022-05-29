import {default as React} from "react";
import useStyle from "./Basket.css";
import {BasketItem} from "../../Context/TopPageContext";
import {Box, Button, Card, CardActions, CardContent, Typography} from "@material-ui/core";

interface Props {
  basketList: BasketItem[];
  totalPrice: number;
}

const View = (props: Props): JSX.Element => {
  const classes = useStyle();
  const {basketList, totalPrice} = props;
  
  return <Card>
    <CardContent className={classes.content}>
      <Typography gutterBottom variant="h5" component="div">
        Your Basket
      </Typography>
      
      
      {basketList.length === 0 ? <Typography variant="body2">"Your basket is empty..."</Typography>
        :
        <Box>
          {basketList.map((order, index) => {
            return <Box className={classes.basketItem} key={index}>
              <Typography variant="body2">{order.quantity} x {order.itemName} S${order.unitPrice.toFixed(2)}</Typography>
              {order.selectedOptions.length > 0 &&
                <Typography variant="body2">({order.selectedOptions.join(", ")})</Typography>
              }
            </Box>
          })}
          <Box className={classes.basketItem}>
            <Typography variant="body2">Total: S${totalPrice.toFixed(2)}</Typography>
          </Box>
        </Box>
      }
    </CardContent>
    
    <CardActions className={classes.action}>
      <Button variant="contained" disabled={basketList.length === 0} fullWidth>Checkout</Button>
    </CardActions>
  </Card>
}

export default View;
