import { useRouter } from 'next/navigation';
import React, { ReactNode, useRef } from 'react';
import Error from '@/components/error/Error';
import { useStoreAuth } from '@/store/authStore';

const AdminRoute = (props: {children: ReactNode }) => {
    const { user, isAuth } = useStoreAuth();
    const router = useRouter();

    if(!isAuth || !user?.isAdmin) {
        return <div className="max-h-[50%]"><Error statusCode={403} message="You're not authorize to see the page" /></div>
    }

    return(
        <>{props.children}</>
    );
};

export default AdminRoute;