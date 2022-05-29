import {default as React} from "react";
import {MenuItem} from "../../../Context/TopPageContext";
import {
  Box,
  Button,
  Card,
  CardActions,
  CardContent,
  CardMedia, Checkbox, Dialog, DialogActions,
  DialogContent, DialogContentText,
  DialogTitle, FormControl, FormControlLabel, FormGroup, FormHelperText, FormLabel, InputLabel,
  MenuItem as MuiMenuItem, Radio, RadioGroup,
  Select,
  Typography
} from "@material-ui/core";
import useStyle from "./MenuItem.css";

interface Props {
  menuItem: MenuItem;
  handleAddToOrder: () => void;
  open: boolean;
  qty: number;
  onChangeQty: (value: string) => void;
  onChangeOption: (optionId: string, value: string, unChecked?: boolean) => void;
  handleClickOpen: () => void;
  handleClose: () => void;
  isChecked: (value: string) => boolean;
  invalidOption: string[];
}
const View = (props: Props): JSX.Element => {
  
  const classes = useStyle();
  const {
    menuItem,
    open,
    qty,
    onChangeQty,
    onChangeOption,
    handleAddToOrder,
    handleClickOpen,
    handleClose,
    isChecked,
    invalidOption
  } = props;
  
  return <>
    <Card>
      <CardMedia
        component="img"
        height="140"
        image={menuItem.imagePath}
        alt={menuItem.itemName}
      />
    
      <CardContent className={classes.content}>
        <Typography gutterBottom variant="h5" component="div">
          {menuItem.itemName}
        </Typography>
        <Typography variant="body2">
          {menuItem.description}
        </Typography>
      </CardContent>
      <CardActions className={classes.action}>
        <Button
          variant="contained"
          onClick={handleClickOpen}
          fullWidth
        >
          Add to Order
        </Button>
      </CardActions>
    </Card>
  
  
    <Dialog
      open={open}
      keepMounted
      onClose={handleClose}
      scroll="paper"
      aria-labelledby="menu-item-dialog"
      aria-describedby="menu-item-dialog"
    >
      <img src={menuItem.imagePath} alt={menuItem.itemName}/>
      <DialogTitle>{menuItem.itemName}</DialogTitle>
      
      <DialogContent>
        <DialogContentText id="menu-item-dialog-description">
          {menuItem.description}
        </DialogContentText>
        
        {/* Dropdown list to select Qty*/}
        <Box className={classes.qtySelector}>
          <FormControl fullWidth>
            <InputLabel id="select-qty-label">Quantity</InputLabel>
            <Select
              labelId="select-qty-label"
              id="select-qty"
              value={qty}
              label="Quantity"
              onChange={(e) => {
                onChangeQty(e.target.value as string);
              }}
            >
              {Array.from({length: 10}, (_, i) => i + 1).map((i, index) => {
                return <MuiMenuItem value={i} key={index}>{i}</MuiMenuItem>
              })}
            
            </Select>
          </FormControl>
        </Box>
        
        {/* List of options: display nothing is current item doesn't have option */}
        {menuItem.options.map((item, index) => {
          return <Box key={`option-${item.optionId}`} className={classes.itemOption}>
            
            {item.selectUpTo === 1 ?
              <FormControl error={invalidOption.includes(item.optionId)}>
                {/* Radio Button */}
                <FormLabel id={`option-${item.optionId}-${index+1}`}>{item.title} ({item.isRequired?"Required":"Optional"})</FormLabel>
                <FormHelperText>Select up to {item.selectUpTo} item</FormHelperText>
                <RadioGroup
                  aria-labelledby="radio-btn-option-label"
                  name="radio-buttons-group"
                  onChange={(e) => {
                    onChangeOption(item.optionId, e.target.value as string);
                  }}
                >
                  {item.value.map((v, i) => {
                    return <FormControlLabel
                      checked={isChecked(v)}
                      value={v} control={<Radio />} label={v} key={i} />
                  })}
                </RadioGroup>
                {invalidOption.includes(item.optionId) &&
                  <FormHelperText>Please select an option</FormHelperText>
                }
              </FormControl>
            :
              <FormControl component="fieldset" variant="standard" error={invalidOption.includes(item.optionId)}>
                {/* Checkbox */}
                <FormLabel component="legend">{item.title} ({item.isRequired?"Required":"Optional"})</FormLabel>
                <FormHelperText>Select up to {item.selectUpTo} items</FormHelperText>
  
                <FormGroup>
                  {item.value.map((v, i) => {
                    return <FormControlLabel
                      control={
                        <Checkbox
                          value={v}
                          checked={isChecked(v)}
                          onChange={(e) => {
                            onChangeOption(item.optionId, e.target.value as string, !e.target.checked);
                          }}
                        />
                      }
                      label={v}
                      key={i}
                    />
                  })}
                 
                </FormGroup>
                {invalidOption.includes(item.optionId) &&
                  <FormHelperText>Please select an option</FormHelperText>
                }
              </FormControl>
            }
          </Box>
          
        })}
      </DialogContent>
      <DialogActions className={classes.dialogAction}>
        <Button variant="contained" className="cancel-btn" onClick={handleClose} fullWidth>Cancel</Button>
        <Button variant="contained" className="add-btn" onClick={handleAddToOrder} fullWidth>Add to Order</Button>
      </DialogActions>
    </Dialog>
  </>
  
}

export default View;
