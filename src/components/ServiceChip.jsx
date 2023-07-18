import { Chip } from "@mui/material";
import PetsIcon from "@mui/icons-material/Pets";

export const ServiceChip = (props) => {
  return <Chip label={props.label} icon={<PetsIcon />} color="primary" variant="outlined"></Chip>;
};
