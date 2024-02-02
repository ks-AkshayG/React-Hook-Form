import Supabase from "../config/Supabase";

type formDataTypes = {
    name: string
    email: string
    phone: string
    state: string
    city: string
    address?: string
}

export const createUserData = async ({name, email, phone, state, city, address}: formDataTypes) => {
    const supares = await Supabase
      .from("dataform")
      .insert([{ name, email, phone, state, city, address }]);

    // console.log(supares);

    return supares
};

export const updateUserData = async({name, email, phone, state, city, address}: formDataTypes, id: number) => {
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