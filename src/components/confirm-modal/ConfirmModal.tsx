"use client";

import { Global } from "@emotion/react";
import { Box, CssBaseline, IconButton } from "@mui/material";
import { IoCloseOutline } from "react-icons/io5";
import type { IConfirmModal } from "./ConfirmModal.type";
import { FC } from "react";
import { RootDrawer, StyledBoxDrawer, SwipeableDrawerStyled } from "./ConfirmModal.styled";

const ConfirmModal: FC<IConfirmModal> = ({
  open,
  children,
  onClose,
  title,
  window = undefined
}) => {
  const container = window !== undefined ? () => window().document.body : undefined;

  return (
    <RootDrawer>
      <CssBaseline />
      <Global
        styles={{
          ".MuiDrawer-root > .MuiPaper-root": {
            maxHeight: "calc(100vh - 100px)",
            overflow: "hidden"
          }
        }}
      />
      <SwipeableDrawerStyled
        container={container}
        anchor="bottom"
        open={open}
        onClose={onClose}
        onOpen={onClose}
        disableSwipeToOpen={false}
        ModalProps={{
          keepMounted: true
        }}
      >
        <StyledBoxDrawer
          sx={{
            position: "absolute",
            bgcolor: "#ffffff",
            top: 0,
            borderTopLeftRadius: 8,
            borderTopRightRadius: 8,
            visibility: "visible",
            right: 0,
            left: 0
          }}
        >
          <Box
            display="flex"
            alignItems="center"
            justifyContent="space-between"
            mx="0.5rem"
            mt="0.5rem"
          >
            <Box>{title}</Box>
            <Box>
              <IconButton onClick={onClose}>
                <IoCloseOutline size="1.75rem" />
              </IconButton>
            </Box>
          </Box>
        </StyledBoxDrawer>
        <Box
          overflow="hidden"
          mt="50px"
          mb="25px"
          sx={{
            overflow: "hidden",
            overflowY: "scroll",
            "&::-webkit-scrollbar": {
              width: "4px"
            },
            "&::-webkit-scrollbar-thumb": {
              backgroundColor: "#0000001f !important"
            }
          }}
        >
          {children}
        </Box>
      </SwipeableDrawerStyled>
    </RootDrawer>
  );
};

export default ConfirmModal;
