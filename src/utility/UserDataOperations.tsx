import Supabase from "../config/Supabase";

export type UserDataTypes = {
    name: string
    email: string
    phone: string
    state: string
    city: string
    address?: string
}

export const createUserData = async ({name, email, phone, state, city, address}: UserDataTypes) => {
    const supares = await Supabase
      .from("dataform")
      .insert([{ name, email, phone, state, city, address }]);

    // console.log(supares);

    return supares
};

export const updateUserData = async({name, email, phone, state, city, address}: UserDataTypes, id: number) => {
    const supares = await Supabase
        .from('dataform')
        .update({name, email, phone, state, city, address})
        .eq('id', id)

    return supares
}

export const getAllUserData = async() => {
    const supares = await Supabase
        .from('dataform')
        .select()
        .order('created_at', {ascending: false})

    return supares
}

export const getSingleUserData = async (id: number) => {
    const supares = await Supabase
        .from('dataform')
        .select()
        .eq('id', id)
        .single()

    return supares
}

export const deleteUserData = async (id: number) => {
    const supares = await Supabase
        .from('dataform')
        .delete()
        .eq('id', id)

    return supares
}

export const getSearchedUserData = async (value: string) => {
    const supares = await Supabase
        .from('dataform')
        .select()
        .or(`name.fts.${value},email.fts.${value}`)

    return supares
}