import DeleteIcon from "@mui/icons-material/DeleteForeverTwoTone";
import { Box, IconButton, TextField, Typography } from "@mui/material";
import * as React from "react";
const BlockChainNodeItem = () => {
  return (
    <Box boxShadow={3} border={1} borderColor="#CDCDCD" overflow="hidden">
      <Box sx={{ bgcolor: "#2A3D4C", color: "#DFDFDF", display: "flex" }}>
        <IconButton aria-label="delete" size="small">
          <DeleteIcon fontSize="inherit" color="error" />
        </IconButton>
        <Typography
          variant="body2"
          sx={{
            textAlign: "left",
            lineHeight: 2.2,
            fontWeight: 400,
            px: 0,
          }}
        >
          Node 1
        </Typography>
      </Box>
      <Box m={1}>
        <TextField
          variant="standard"
          helperText="A unqiue ID"
          label="Blockchain Node's ID"
          placeholder="Blockchain Node's ID"
          fullWidth
        />
      </Box>
    </Box>
  );
};

export default BlockChainNodeItem;
