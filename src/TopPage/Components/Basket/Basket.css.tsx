import {makeStyles} from "@material-ui/core/styles";

const useStyle = makeStyles({
  content: {
    backgroundColor: "#f6f1f1",
    textAlign: "center",
  },
  action: {
    padding: "20px",
    backgroundColor: "#f6f1f1",
    
    "& button": {
      marginTop: "10px",
      backgroundColor: "#e45c54",
      color: "#ffffff"
    }
  },
  basketItem: {
    marginTop: "35px",
    marginBottom: "15px",
  }
});

export default useStyle;
