import { useDispatch } from 'react-redux';
import { checkAuthorizationFun } from '../store/slices/autorizationSlice';

const useAuthorization = () => {
    const dispatch = useDispatch();

    const checkAuthorization = async (err) => {
        console.log('inside auth hook')
        if (err && err.response && err.response.status === 403) {
            await dispatch(checkAuthorizationFun(true));
        } else {
            await dispatch(checkAuthorizationFun(false));
        }
    };


    return {
        checkAuthorization
    };
};

export default useAuthorization;
