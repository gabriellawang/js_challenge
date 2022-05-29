import {default as React, useContext} from "react";
import View from "./TopPage.view";
import {BasketItem, MenuItem, TopPageContext} from "./Context/TopPageContext";

const TopPageComponent = (): JSX.Element => {
  //constant
  const menuList: MenuItem[] = [
    {
      itemId: 1,
      itemName: "Double Cheeseburger",
      description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
      imagePath: "/image/double-cheeseburger.jpeg",
      unitPrice: 18.9,
      options: [
        {
          optionId: "1001",
          title: "Choice of cheese",
          isRequired: false,
          value: ["Extra cheese", "Less cheese"],
          selectUpTo: 1,
        }
      ],
    },
    {
      itemId: 2,
      itemName: "Chicken Burger",
      description: "Nam porta nisl et nunc placerat interdum. Lorem ipsum dolor sit amet, consectetur adipiscing.",
      imagePath: "/image/chicken-burger.jpeg",
      unitPrice: 16.9,
      options: [],
    },
    {
      itemId: 3,
      itemName: "French Fries",
      description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
      imagePath: "/image/french-fries.jpeg",
      unitPrice: 4.9,
      options: [
        {
          optionId: "3001",
          title: "Choice of sauce",
          isRequired: true,
          value: ["Ketchup", "Chilli", "Mayonnaise"],
          selectUpTo: 2
        },
        {
          optionId: "3002",
          title: "Choice of size",
          isRequired: true,
          value: ["Small", "Median", "Large"],
          selectUpTo: 1
        }
      ],
    },
    {
      itemId: 4,
      itemName: "Onion Rings",
      description: "Sed rhoncus gravida metus et bibendum. Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
      imagePath: "/image/onion-rings.jpeg",
      unitPrice: 5.5,
      options: [
        {
          optionId: "4001",
          title: "Choice of sauce",
          isRequired: true,
          value: ["Ketchup", "Chilli", "Mayonnaise"],
          selectUpTo: 2
        }
      ],
    },
    {
      itemId: 5,
      itemName: "Fried Chicken",
      description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nam porta nisl et nunc. ",
      imagePath: "/image/fried-chicken.jpeg",
      unitPrice: 13.9,
      options: [],
    },
    {
      itemId: 6,
      itemName: "Diet Coke",
      description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
      imagePath: "/image/diet-coke.jpeg",
      unitPrice: 3.2,
      options: [
        {
          optionId: "5001",
          title: "Choice of ice",
          isRequired: true,
          value: ["No ice", "Less ice", "Normal ice"],
          selectUpTo: 1
        }
      ],
    },
    {
      itemId: 6,
      itemName: "Ice Cream",
      description: "Sed rhoncus gravida metus et bibendum. ",
      imagePath: "/image/ice-cream.jpeg",
      unitPrice: 4.2,
      options: [
        {
          optionId: "6001",
          title: "Choice of flavour",
          isRequired: true,
          value: ["Vanilla", "Chocolate", "Mint", "Strawberry"],
          selectUpTo: 1
        },
        {
          optionId: "6002",
          title: "Choice of container",
          isRequired: true,
          value: ["Cone", "Cup"],
          selectUpTo: 1
        }
      ],
    }
  ];
  
  
  //state
  const {state, dispatch} = useContext(TopPageContext);
  
  
  
  //function
  const handleAddToOrder = (item: BasketItem): void => {
    const basketList = state.basketList;
    if(state.basketList.length === 0){
      basketList.push(item);
    }else{
      let added = false;
      state.basketList.forEach((basketItem, index) => {
        if(item.itemId === basketItem.itemId && item.selectedOptions.sort().toString() === basketItem.selectedOptions.sort().toString()){
          // the exact same item has been added to the basket: update quantity
          const newBasketItem = {
            ...basketItem,
            quantity: basketItem.quantity + item.quantity
          }
          basketList[index] = newBasketItem;
          added = true;
        }
      });
      if(!added){
        // new item: add item to the list
        basketList.push(item);
      }
    }
    
    dispatch.updateBasket(basketList);
  }
  
  return <View
    menuList={menuList}
    handleAddToOrder={handleAddToOrder}
  />
  
}

export default TopPageComponent;