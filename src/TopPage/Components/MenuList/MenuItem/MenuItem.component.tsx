import {default as React, useState} from "react";
import {BasketItem, MenuItem} from "../../../Context/TopPageContext";
import View from "./MenuItem.view";

interface Props {
  menuItem: MenuItem;
  handleAddToOrder: (item: BasketItem) => void;
}
const MenuItemComponent = (props: Props): JSX.Element => {
  const { menuItem, handleAddToOrder } = props;
  
  //states
  const [open, setOpen] = useState(false);
  const [qty, setQty] = useState(1);
  const [selectedOptions, setSelectedOptions] = useState({});
  const [invalidOption, setInvalidOption] = useState([] as string[]);
  // console.log(selectedOptions)
  
  //functions
  const isChecked = (value: string): boolean => {
    let isChecked = false;
    Object.values(selectedOptions).forEach(valueArr => {
      const arr = valueArr as string[];
      if(arr.includes(value)){
        isChecked = true;
      }
    });
    return isChecked;
  }
  
  const onChangeQty = (value: string): void => {
    setQty(Number(value));
  }
  
  const onChangeOption = (optionId: string, value: string, unChecked?: boolean): void => {
    const options = menuItem.options;
    const option = options.find(opt => opt.optionId === optionId);
    if(option){
      if(option.selectUpTo === 1){
        // input from radio button
        const newOptions = {
          ...selectedOptions,
          [optionId]: [value],
        }
        setSelectedOptions(newOptions);
      }else{
        // input from checkbox
        if(Object.hasOwn(selectedOptions, optionId)){
          // this option has been selected: update the object value
          for (const [k, v] of Object.entries(selectedOptions)) {
            const arr = v as string[];
            if(k === optionId){
              if(arr.includes(value) && unChecked){
                // remove this value from current option
                arr.splice(arr.indexOf(value), 1);
              }else if(!arr.includes(value) && !unChecked){
                // add value to the current option array
                arr.push(value);
              }
              const newOptions = {
                ...selectedOptions,
                [optionId]: arr,
              }
              setSelectedOptions(newOptions);
              break;
            }
          }
        }else{
          // first time selecting this option: add new key-value pair
          const newOptions = {
            ...selectedOptions,
            [optionId]: [value],
          }
          setSelectedOptions(newOptions);
        }
      }
    }
  }
  
  const handleClickOpen = (): void => {
    setOpen(true);
  };
  
  const handleClose = (): void => {
    setOpen(false);
    setInvalidOption([]);
    setQty(1);
    setSelectedOptions({});
  };
  
  const handleAdd = (): void => {
    let options: string[] = [];
    let invalidOptions: string[] = [];
    
    // check if any mandatory input is missing
    menuItem.options.forEach(opt => {
      if(opt.isRequired){
        if(!Object.keys(selectedOptions).includes(opt.optionId)){
          // this option is required, but user hasn't selected
          invalidOptions.push(opt.optionId);
        }
      }
    });
    for (const [k, v] of Object.entries(selectedOptions)) {
      const currentOption = menuItem.options.find(opt => opt.optionId === k);
      const arr = v as string[];
      if(currentOption && currentOption.isRequired && arr.length === 0){
        // this option is required, but user has unchecked all options
        invalidOptions.push(k);
      }
      options = options.concat(arr);
    }
    
    
    if(invalidOptions.length === 0){
      const basketItem: BasketItem = {
        itemId: menuItem.itemId,
        itemName: menuItem.itemName,
        unitPrice: menuItem.unitPrice,
        selectedOptions: options,
        quantity: qty
      };
  
      handleAddToOrder(basketItem);
      handleClose();
    }else{
      setInvalidOption(invalidOptions);
    }
  }
  
  return <View
    menuItem={menuItem}
    open={open}
    qty={qty}
    onChangeQty={onChangeQty}
    onChangeOption={onChangeOption}
    handleAddToOrder={handleAdd}
    handleClickOpen={handleClickOpen}
    handleClose={handleClose}
    isChecked={isChecked}
    invalidOption={invalidOption}
  />
}

export default MenuItemComponent;