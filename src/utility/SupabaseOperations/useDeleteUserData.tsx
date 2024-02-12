import Supabase from "../../config/Supabase"
import { useMutation, useQueryClient } from "react-query"

const deleteData = async(id: number) => {
    return Supabase
    .from('dataform')
    .delete()
    .eq('id', id)
}

const useDeleteUserData = () => {

    const queryClient = useQueryClient()

    return useMutation(['delete-user-data'], deleteData, {

        onError: (error) => {
            console.log(error)
        },

        onSettled: () => {
            queryClient.invalidateQueries('get-all-user-data')
        },
    })
}

export default useDeleteUserData
