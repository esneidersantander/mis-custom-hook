import { useEffect, useRef, useState } from 'react'

const initialState = {loading:true, error: null, data:null}

export const useFetch = (url) => {

    const isMounted = useRef(true)

    useEffect(() => {
        return () => {
            isMounted.current = false
        }
    }, [])

    const [state, setState] = useState(initialState)

    useEffect(() => {
        
        setState(initialState)
        fetch(url)
        .then(resp=> resp.json())
        .then(data=>{
                if (isMounted.current) {
                    setState({
                        error:null,
                        loading:false,
                        data
                    })
                }
            })
    }, [url])

    return state;
}
