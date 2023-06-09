import { useEffect, useState } from "react";
import { axiosPrivate } from "../api/axios";

export const useFetch = (url) => {

    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(false);

    useEffect(() => {
        const fetchData = async () => {
            setLoading(true);
            try {
                const res = await axiosPrivate.get(url);
                setData(res.data.data);
            } catch (error) {
                setError(error);
            }
            setLoading(false);
        };
        fetchData();
    }, []);

    const reFetch = async () => {
        setLoading(true);
        try {
            const res = await axiosPrivate.get(url);
            setData(res.data);
        } catch (error) {
            setError(error);
        }
        setLoading(false);
    };
    return { data, loading, error, reFetch };
};