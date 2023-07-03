import {useState} from "react";

export const useFetching =(callback)=> {
    const [isLoading, setIsLoading] = useState(false)
    const [errors, setErrors] = useState('')

    const fetching = async ()=> {
        try {
            setIsLoading(true)
            await callback ()
        }

        catch (e){
            setErrors(e.message)
        } finally {
            setIsLoading(false)
        }
    }
    return [fetching, isLoading, errors ]
}