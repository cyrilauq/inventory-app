import { useRouter } from 'next/navigation';
import React, { ReactNode, useRef } from 'react';
import Error from '@/components/error/Error';

const PrivateRoute = (props: { isAuth: Boolean, children: ReactNode }) => {
    const router = useRouter();

    if(!props.isAuth) {
        return <div className="max-h-[50%]"><Error statusCode={401} message="You're not authorize to see the page" /></div>
    }

    return(
        <>{props.children}</>
    );
};

export default PrivateRoute;