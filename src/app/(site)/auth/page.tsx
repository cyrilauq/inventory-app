/* eslint-disable react/no-unescaped-entities */
import LoginForm from "@/app/_components/auth/loginForm";
import RegisterForm from "@/app/_components/auth/registerForm";
import RootLayout from "../layout";

const Auth = () => {
    return(
        <div className="w-fit">
            <h2>Auth page</h2>
            <LoginForm></LoginForm>
            <p>Or if you don't have an account yet</p>
            <RegisterForm></RegisterForm>
        </div>
    );
};

export default Auth;