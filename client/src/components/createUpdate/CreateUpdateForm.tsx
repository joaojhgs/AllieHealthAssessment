import { Alert, Box, Button, TextField } from "@mui/material";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import useAxios from "axios-hooks";
import { Controller, FieldValues, useForm } from "react-hook-form";
import { IUser } from "../../interfaces";
import dayjs from "dayjs";

type Props = {
  user?: IUser;
  onSubmit: (result?: IUser) => void;
};

const CreateUpdateForm = ({ onSubmit, user }: Props) => {
  const { register, handleSubmit, control } = useForm({
    defaultValues: {
      firstName: user?.first_name,
      lastName: user?.last_name,
      email: user?.email,
      birthDate: dayjs(user?.birth_date),
    },
  });
  const [{ loading: loadingCreate, error: errorCreate }, createPost] = useAxios(
    {
      url: `${process.env.REACT_APP_SERVER_BASE_URL}/users`,
      method: "POST",
    },
    { manual: true },
  );

  const [{ loading: loadingUpdate, error: errorUpdate }, updatePut] = useAxios(
    {
      url: `${process.env.REACT_APP_SERVER_BASE_URL}/users/${user?.id}`,
      method: "PUT",
    },
    { manual: true },
  );

  const onFormSubmit = async (data: FieldValues) => {
    if (user && user?.id) {
      onSubmit((await updatePut({ data })).data);
    } else {
      onSubmit((await createPost({ data })).data);
    }
  };

  return (
    <>
      <form onSubmit={handleSubmit(onFormSubmit)}>
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            gap: 1,
          }}
        >
          {(errorUpdate || errorCreate) && (
            <Alert severity="error">
              Sorry - there was an error creating the user
            </Alert>
          )}
          <TextField
            label="First Name"
            variant="outlined"
            {...register("firstName", { required: true })}
          />
          <TextField
            label="Last Name"
            variant="outlined"
            {...register("lastName", { required: true })}
          />
          <TextField
            label="Email"
            variant="outlined"
            {...register("email", { required: true })}
          />
          <Controller
            name="birthDate"
            control={control}
            render={({ field: { onChange, value, ...restField } }) => (
              <DatePicker
                label="Request Date"
                defaultValue={value}
                onChange={(event) => {
                  onChange(event);
                }}
                {...restField}
              />
            )}
          />
          <Button
            variant="contained"
            type="submit"
            disabled={loadingCreate || loadingUpdate}
          >
            Create User
          </Button>
        </Box>
      </form>
    </>
  );
};

export default CreateUpdateForm;
