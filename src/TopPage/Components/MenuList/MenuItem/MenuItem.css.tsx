import {makeStyles} from "@material-ui/core/styles";

const useStyle = makeStyles({
  content: {
    height: "144px",
    backgroundColor: "#f6f1f1",
  },
  action: {
    padding: "20px",
    backgroundColor: "#f6f1f1",
  
    "& button": {
      backgroundColor: "#e45c54",
      color: "#ffffff"
    }
  },
  dialogAction: {
    padding: "15px",
    "& button": {
      marginLeft: "10px",
      marginRight: "10px"
    },
    "& button.cancel-btn": {
      backgroundColor: "#cbc7d0"
    },
    "& button.add-btn": {
      backgroundColor: "#e45c54",
      color: "#ffffff"
    }
  },
  qtySelector: {
    marginTop: "20px",
    marginBottom: "20px"
  },
  itemOption: {
    marginTop: "20px",
    marginBottom: "20px"
  }
});

export default useStyle;
