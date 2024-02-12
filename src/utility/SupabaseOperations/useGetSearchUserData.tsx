import Supabase from "../../config/Supabase"
import { useMutation, useQueryClient } from "react-query"

const getData = async(searchValue: string) => {

    return Supabase
        .from('dataform')
        .select()
        .or(`name.fts.${searchValue},email.fts.${searchValue}`)
}

const useGetSearchUserData = () => {

    const queryClient = useQueryClient()
    
    return useMutation(['search-user-data'], getData, {
        onError: (error) => {
            console.log(error)
        },

        onSettled: () => {
            queryClient.invalidateQueries('search-user-data')
        },
    })
}

export default useGetSearchUserData