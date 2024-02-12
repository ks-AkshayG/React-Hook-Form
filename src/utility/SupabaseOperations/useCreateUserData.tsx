import Supabase from "../../config/Supabase"
import { useMutation, useQueryClient } from "react-query"
import { UserDataTypes } from "../UserDataOperations"

const getData = async({name, email, phone, state, city, address}: UserDataTypes) => {
    return Supabase
        .from('dataform')
        .insert([{ name, email, phone, state, city, address }]);
}

const useCreateUserData = () => {

    const queryClient = useQueryClient()

    return useMutation(['create-user-data'], getData, {
        onError: (error) => {
            console.log(error)
        },

        onSettled: () => {
            queryClient.invalidateQueries('get-all-user-data')
        },
    })
}

export default useCreateUserData