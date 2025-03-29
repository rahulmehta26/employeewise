import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Trash2 } from "lucide-react";
import { useDispatch } from "react-redux";
import UpdateUser from "@/components/ui/UpdateUser";
import { handleDeleteUser, handleUpdateUser } from "@/utils/userActions";

function UserCard({ users }) {
  const dispatch = useDispatch();

  return (
    <div className="space-y-6">
      {users?.map((user) => (
        <Card
          key={user.id}
          className="p-4 shadow-lg flex justify-between items-center rounded-lg"
        >
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
          </CardContent>
        </Card>
      ))}
    </div>
  );
}

export default UserCard;
