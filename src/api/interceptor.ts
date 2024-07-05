import axios from 'axios';
import { toast } from 'react-toastify';

export default function interceptorSetup() {
    axios.interceptors.request.use(
        (config) => config,
        (error) => error
    );
    axios.interceptors.response.use(
        (response) => response,
        (error) => {
            toast.error(error?.response?.data?.error || error?.response?.data?.message || "Something went wrong");
            return {};
        }
    );
}