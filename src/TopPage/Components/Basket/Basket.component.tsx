import {default as React, useContext} from "react";
import {TopPageContext} from "../../Context/TopPageContext";
import View from "./Basket.view";

const BasketComponent = (): JSX.Element => {
  //state
  const {state} = useContext(TopPageContext);
  
  let totalPrice = 0;
  state.basketList.forEach(order => {
    totalPrice += order.quantity * order.unitPrice;
  })
  
  return <View
    basketList={state.basketList}
    totalPrice={totalPrice}
  />
}

export default BasketComponent;