import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Trash2 } from "lucide-react";
import { useDispatch } from "react-redux";
import { deleteUser, updateUser } from "@/features/userSlice";
import toast from "react-hot-toast";
import UpdateUser from "@/components/ui/UpdateUser";

function UserCard({ users }) {
  const dispatch = useDispatch();

  console.log(users)

  const handleDelete = (id) => {
    dispatch(deleteUser(id))
      .unwrap()
      .then(() => {
        toast.success("User deleted successfully");
      })
      .catch((err) => {
        toast.error(err.message);
      });
  };

  const handleUpdate = (id, updatedUserData) => {
    dispatch(updateUser({ id, data: updatedUserData }))
      .unwrap()
      .then(() => {
        toast.success("User updated successfully");
      })
      .catch((err) => {
        toast.error(err.message);
      });
  };

  return (
    <div className="space-y-6">

      {users?.data?.map((user) => (
        <Card key={user.id} className="p-4 shadow-lg flex justify-between items-center rounded-lg">
          <CardHeader className="flex items-center gap-4">
            <Avatar className="w-16 h-16">
              <AvatarImage src={user.avatar} />
              <AvatarFallback>
                {user.first_name[0]}
                {user.last_name[0]}
              </AvatarFallback>
            </Avatar>
            <div>
              <CardTitle>
                {user.first_name} {user.last_name}
              </CardTitle>
              <p className="text-gray-500">{user.email}</p>
            </div>
          </CardHeader>

          <CardContent className="flex flex-col justify-between space-y-3 items-center">

            <Button
              className="bg-red-500 hover:bg-red-500"
              onClick={() => handleDelete(user.id)}
            >
              <Trash2 />
            </Button>

            <UpdateUser user={user} handleUpdateUser={handleUpdate} />
          </CardContent>
        </Card>
      ))}
    </div>
  );
}

export default UserCard;
