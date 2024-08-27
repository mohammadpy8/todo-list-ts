import type { ThemeOptions } from "@mui/material";

const components: ThemeOptions["components"] = {
  MuiButton: {
    variants: [
      {
        props: { variant: "secondary" },
        style: {
          backgroundColor: "#7a17ff",
          color: "#FFFFFF",
          textTransform: "unset",
          transition: "all 0.2s linear",
          padding: "10px",
          fontSize: "15px",
          borderRadius: "12px",
          "&:hover": {
            backgroundColor: "#7a17ff",
            opacity: 0.85
          }
        }
      },
      {
        props: { variant: "error" },
        style: {
          backgroundColor: "#00cf00",
          color: "#FFFFFF",
          textTransform: "unset",
          transition: "all 0.2s linear",
          padding: "5px",
          fontSize: "15px",
          borderRadius: "12px",
          "&:hover": {
            backgroundColor: "#00cf00",
            opacity: 0.85
          },
          "&.Mui-disabled": {
            backgroundColor: "#e7e7e7 !important",
            color: "#b9b9b9"
          }
        }
      }
    ]
  },

  MuiChip: {
    variants: [
      {
        props: { variant: "done" },
        style: {
          border: "2px solid #22C55E",
          backgroundColor: "#ECFCCB",
          color: "#22C55E"
        }
      },
      {
        props: { variant: "notDone" },
        style: {
          border: "2px solid #FDA222",
          backgroundColor: "#FFF8EB",
          color: "#F77F09"
        }
      }
    ]
  }
};

export { components };
