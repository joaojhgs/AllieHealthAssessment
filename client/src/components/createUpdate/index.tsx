import { Box, Modal } from "@mui/material";
import CreateUpdateForm from "./CreateUpdateForm";
import { IUser } from "../../interfaces";

type Props = {
  openWithUser: boolean | IUser;
  handleClose: (result: IUser) => void;
};

const CreateUpdateUserModal = ({ openWithUser, handleClose }: Props) => {
  return (
    <Modal open={!!openWithUser} onClose={handleClose}>
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
        <CreateUpdateForm
          onSubmit={handleClose}
          user={typeof openWithUser === "boolean" ? undefined : openWithUser}
        />
      </Box>
    </Modal>
  );
};

export default CreateUpdateUserModal;
