import { Alert, Box, Button, TextField } from "@mui/material";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import useAxios from "axios-hooks";
import { Controller, FieldValues, useForm } from "react-hook-form";
import { IUser } from "../../interfaces";

type Props = {
  onSubmit: (result: IUser) => void;
};

const CreateForm = ({ onSubmit }: Props) => {
  const { register, handleSubmit, control } = useForm();
  const [{ loading, error }, executePost] = useAxios(
    {
      url: `${process.env.REACT_APP_SERVER_BASE_URL}/users`,
      method: "POST",
    },
    { manual: true },
  );

  const onFormSubmit = async (data: FieldValues) => {
    onSubmit((await executePost({ data })).data);
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
          {error && (
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
            render={({ field: { onChange, ...restField } }) => (
              <DatePicker
                label="Request Date"
                onChange={(event) => {
                  onChange(event);
                }}
                {...restField}
              />
            )}
          />
          <Button variant="contained" type="submit" disabled={loading}>
            Create User
          </Button>
        </Box>
      </form>
    </>
  );
};

export default CreateForm;
