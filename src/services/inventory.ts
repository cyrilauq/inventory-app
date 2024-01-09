import { useStoreAuth } from '../store/authStore';

const getInventories = () => {
    const token =useStoreAuth.getState().tokens[0];
}