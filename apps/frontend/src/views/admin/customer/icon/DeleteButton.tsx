import DeleteIcon from "@mui/icons-material/Delete";
import { IconButton } from "@mui/material";

const DeleteButton = () => {
  return (
    <IconButton
      style={{
        backgroundColor: "red",
        borderRadius: "60%",
        padding: "10px",
        height: "35px",
        marginTop: "9px",
      }}
    >
      <DeleteIcon style={{ color: "white" }} />
    </IconButton>
  );
};

export default DeleteButton;
