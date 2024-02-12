import Supabase from "../../config/Supabase"
import { useQuery } from "react-query"

const getData = async() => {
    return Supabase
        .from('dataform')
        .select()
        .order('created_at', {ascending: false})
}

const useGetAllUserData = () => {
    return useQuery(['get-all-user-data'], getData, {
        keepPreviousData: true
    })
}

export default useGetAllUserData