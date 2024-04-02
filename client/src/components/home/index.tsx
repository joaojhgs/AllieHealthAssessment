import { Box, Button, CircularProgress } from "@mui/material";
import useAxios from "axios-hooks";
import { useEffect, useState } from "react";
import UsersTable from "./UsersTable";
import MessageContainer from "./MessageContainer";
import CreateUpdateUserModal from "../createUpdate";
import UploadInput from "./UploadInput";
import { IUser } from "../../interfaces";

const Home = () => {
  const [isCreateUserOpen, setIsCreateUserOpen] = useState<IUser | boolean>(
    false,
  );
  const [usersData, setUsersData] = useState<IUser[]>();

  const [{ data, loading, error }, refetch] = useAxios(
    `${process.env.REACT_APP_SERVER_BASE_URL}/users`,
  );

  const onSubmitModal = (result?: IUser) => {
    setIsCreateUserOpen(!isCreateUserOpen);
    if (result)
      setUsersData((users) => {
        if (!users) return [result];

        const index = users?.findIndex((user) => user.id === result.id);
        if (index >= 0) {
          users[index] = result;
          return users;
        }
        return [...users, result];
      });
  };

  useEffect(() => {
    if (data) {
      setUsersData(data.users);
    }
  }, [data]);

  if (loading || !usersData) {
    return (
      <MessageContainer>
        <CircularProgress />
      </MessageContainer>
    );
  }

  if (error) {
    return (
      <MessageContainer>
        <Box>Error loading users</Box>
        <Button variant="contained" onClick={() => refetch()}>
          Retry
        </Button>
      </MessageContainer>
    );
  }

  return (
    <>
      <Box
        sx={{
          display: "flex",
          justifyContent: "right",
          gap: 1,
          marginBottom: 3,
        }}
      >
        <UploadInput />
        <Button variant="contained" onClick={() => setIsCreateUserOpen(true)}>
          Create User
        </Button>
      </Box>
      <UsersTable users={usersData} setEditingUser={setIsCreateUserOpen} />
      <CreateUpdateUserModal
        openWithUser={isCreateUserOpen}
        handleSubmit={onSubmitModal}
        handleClose={() => {
          setIsCreateUserOpen(!isCreateUserOpen);
        }}
      />
    </>
  );
};

export default Home;
