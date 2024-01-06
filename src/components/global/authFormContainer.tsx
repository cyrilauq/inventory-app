import React, { ReactNode, useEffect, useRef } from 'react';
import CancelRoundedIcon from '@mui/icons-material/CancelRounded';

interface AuthFormContainerProps {
    children: ReactNode;
    onClosure(): void;
}

const AuthFormContainer: React.FC<AuthFormContainerProps> = (props: AuthFormContainerProps) => {
    const newRef = useRef<HTMLDivElement>(null);
    useEffect(() => {
        document.addEventListener("mousedown", handleOutsideClick);
        return () => {
            document.removeEventListener("mousedown", handleOutsideClick);
        };
    });

    const handleOutsideClick = (e: MouseEvent) => {
        if (newRef.current && !newRef.current.contains(e.target as Node)) {
            props.onClosure();
        }
    };
    
    return(
        <div className="fixed mx-auto top-56 backdrop-blur-md flex px-8" ref={newRef}>
            <CancelRoundedIcon className="absolute top-0 right-0" onClick={() => props.onClosure()} />
            {props.children}
        </div>
    );
};

export default AuthFormContainer;