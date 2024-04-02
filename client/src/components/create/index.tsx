import { Box, Modal } from "@mui/material";
import React from "react";
import CreateForm from "./CreateForm";
import { IUser } from "../../interfaces";

type Props = {
  open: boolean;
  handleClose: (result: IUser) => void;
};

const CreateUserModal = ({ open, handleClose }: Props) => {
  return (
    <Modal open={open} onClose={handleClose}>
      <Box
        sx={{
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          width: 400,
          bgcolor: "background.paper",
          boxShadow: 24,
          p: 4,
        }}
      >
        <CreateForm onSubmit={handleClose} />
      </Box>
    </Modal>
  );
};

export default CreateUserModal;
