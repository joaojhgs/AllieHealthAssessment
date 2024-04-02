import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { IUser } from "../../interfaces";

const TableHeaderCell = (props: Record<any, any>) => (
  <TableCell
    sx={{
      fontWeight: "bold",
    }}
    {...props}
  />
);

type Props = {
  users?: IUser[];
  setEditingUser: (user: IUser) => void;
};

const UsersTable = ({ users, setEditingUser }: Props) => (
  <TableContainer component={Paper}>
    <Table aria-label="simple table">
      <TableHead>
        <TableRow>
          <TableHeaderCell>Name</TableHeaderCell>
          <TableHeaderCell>Birth date</TableHeaderCell>
          <TableHeaderCell align="right">Email</TableHeaderCell>
        </TableRow>
      </TableHead>
      <TableBody>
        {users?.map((user) => (
          <TableRow
            key={user.id}
            sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
            onClick={() => setEditingUser(user)}
          >
            <TableCell component="th" scope="row">
              {`${user.first_name} ${user.last_name}`}
            </TableCell>
            <TableCell>
              {user.birth_date
                ? new Date(user.birth_date).toDateString()
                : null}
            </TableCell>
            <TableCell align="right">{user.email}</TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  </TableContainer>
);

export default UsersTable;
