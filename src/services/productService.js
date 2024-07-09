import axios from "axios"

const BASE_URL= 'http://localhost:8080/products';

export const findAll = async () =>{
    try {
        const response = await axios.get(BASE_URL)
        
        return response

    } catch (error) {
        console.log(error)
    }
    return null;
}

export const findAllPages = async (page = 0) =>{
    try {
        console.log(`${BASE_URL}/page/${page}`)
        const response = await axios.get(`${BASE_URL}/page/${page}`)
        
        return response

    } catch (error) {
        console.log(error);
        throw error;
    }

}

export const save = async ({descripcion, cantidad}) =>{
    try {
        return  await axios.post(BASE_URL, {
            descripcion,
            cantidad,
        });
        
        

    } catch (error) {
        throw error;
    }
    
}

export const update = async ({id, descripcion, cantidad}) =>{
    try {
        return await axios.put(`${BASE_URL}/${id}`, {
            descripcion,
            cantidad,
        });
        
        

    } catch (error) {
        throw error;
    }
    
}

export const remove = async(id) =>{
    try {
        return await axios.delete(`${BASE_URL}/${id}`);
        
        

    } catch (error) {
        console.log(error)
    }
}