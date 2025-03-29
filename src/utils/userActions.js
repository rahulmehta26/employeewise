import { toast } from "react-hot-toast";
import { deleteUser, updateUser } from "@/features/userSlice";

export const handleDeleteUser = async (dispatch, id) => {
  try {
    await dispatch(deleteUser(id)).unwrap();
    toast.success("User deleted successfully");
  } catch (err) {
    toast.error(err.message);
  }
};

export const handleUpdateUser = async (dispatch, id, updatedUserData) => {
  try {
    await dispatch(updateUser({ id, data: updatedUserData })).unwrap();
    toast.success("User updated successfully");
  } catch (err) {
    toast.error(err.message);
  }
};
