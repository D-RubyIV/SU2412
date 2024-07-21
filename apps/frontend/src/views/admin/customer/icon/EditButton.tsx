import EditIcon from "@mui/icons-material/Edit";
import { IconButton } from "@mui/material";

const EditButton = () => {
  return (
    <IconButton
      style={{
        backgroundColor: "#FFCC00",
        borderRadius: "60%",
        padding: "10px",
        height: "35px",
        marginTop: "9px",
      }}
    >
      <EditIcon style={{ color: "white" }} />
    </IconButton>
  );
};

export default EditButton;
