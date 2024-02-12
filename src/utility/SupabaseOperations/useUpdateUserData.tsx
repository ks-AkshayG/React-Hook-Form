import Supabase from "../../config/Supabase"
import { useMutation, useQueryClient } from "react-query"

type UserDataTypes = {
    name: string;
    email: string;
    phone: string;
    state: string;
    city: string;
    address?: string | undefined;
    id: number
}

const getData = async({name, email, phone, state, city, address, id}: UserDataTypes) => {
    return Supabase
        .from('dataform')
        .update({name, email, phone, state, city, address})
        .eq('id', id)
}

const useUpdateUserData = () => {

    const queryClient = useQueryClient()

    return useMutation(['update-user-data'], getData, {
        onError: (error) => {
            console.log(error)
        },

        onSettled() {
            queryClient.invalidateQueries('get-all-user-data')
        },
    })
}

export default useUpdateUserData