import Supabase from "../../config/Supabase"
import { useQuery } from "react-query"

type queryFnProp = {
    queryKey: Array<string | number>
}

type GetDataType = {
    id: number;
    created_at: string;
    name: string;
    email: string;
    phone: string;
    state: string;
    city: string;
    address: string;
  };

const getData = async({ queryKey }: queryFnProp) => {

    const id = queryKey[1]

    const response = await Supabase
    .from('dataform')
    .select()
    .eq('id', id)
    .single()

    const data: GetDataType = response.data

    // console.log(response.data)

    return data
    
}

const useGetSingleUserData = (id: number) => {
    return useQuery(['get-user-data', id], getData, {
        keepPreviousData: true
    })
}

export default useGetSingleUserData
