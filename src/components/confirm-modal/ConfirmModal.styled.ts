import { styled, SwipeableDrawer } from "@mui/material";
import { grey } from "@mui/material/colors";

const StyledBoxDrawer = styled("div")(() => ({
  backgroundColor: grey[800],
}));

const PullerDrawer = styled("div")(() => ({
  width: 30,
  height: "5px",
  backgroundColor: grey[900],
  borderRadius: 3,
  position: "absolute",
  top: 8,
  left: "calc(50% - 15px)",
}));

const RootDrawer = styled("div")(() => ({
  height: "100%",
  backgroundColor: "#ffffff",
}));

const SwipeableDrawerStyled = styled(SwipeableDrawer)(({ theme }) => {
  return {
    "&.MuiDrawer-root": {
      display: "flex",
      alignItems: "flex-end",
      maxWidth: "450px",
      margin: "0 auto",
      "& .MuiBackdrop-root": {
        maxWidth:"450px",
        margin: "0 auto",
      },
      "& .MuiDrawer-paper": {
        backgroundColor: "#ffffff",
        boxShadow: "none",
        borderRadius: "20px 20px 0 0",
        maxWidth:"450px",
        position: "relative !important",
        margin: "auto",
        marginBottom: 0,
      },
    },
  };
});

export { PullerDrawer, RootDrawer, StyledBoxDrawer, SwipeableDrawerStyled };
