import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "./ui/button";
import { Trash2 } from "lucide-react";
import { useDispatch } from "react-redux";
import UpdateUser from "./ui/UpdateUser";
import { handleDeleteUser, handleUpdateUser } from "@/utils/userActions";

function UserTable({ users }) {
  const dispatch = useDispatch();

  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>Avatar</TableHead>
          <TableHead>First Name</TableHead>
          <TableHead>Last Name</TableHead>
          <TableHead>Email</TableHead>
          <TableHead>Admin Action</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {users?.map((user) => (
          <TableRow key={user.id}>
            <TableCell>
              <Avatar>
                <AvatarImage src={user.avatar} />
                <AvatarFallback>CN</AvatarFallback>
              </Avatar>
            </TableCell>
            <TableCell className="font-medium">{user.first_name}</TableCell>
            <TableCell className="font-medium">{user.last_name}</TableCell>
            <TableCell>{user.email}</TableCell>
            <TableCell>
              <div className="flex gap-4 items-center">
                <Button
                  className="bg-red-500 cursor-pointer hover:bg-red-500"
                  onClick={() => handleDeleteUser(dispatch, user.id)}
                >
                  <Trash2 />
                </Button>
                <UpdateUser
                  user={user}
                  handleUpdateUser={(id, data) =>
                    handleUpdateUser(dispatch, id, data)
                  }
                />
              </div>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}

export default UserTable;
