import { IUser } from "@/types/user";
import Supabase from "@config/Supabase";
import { useMutation, useQueryClient } from "react-query";

const getUserData = async (id: number) => {
  const response = await Supabase.from("dataform")
    .select()
    .eq("id", id)
    .single();

  return response.data as IUser;
};

const mutateUpdate = (id: number) => {
  const queryClient = useQueryClient();

  return useMutation(getUserData, {
    mutationKey: ["get-user-data", id],
    onError: (error) => {
      console.log(error);
    },
    onSettled() {
      queryClient.invalidateQueries("get-all-user-data");
    },
  });
};

export default mutateUpdate;
