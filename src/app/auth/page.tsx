/* eslint-disable react/no-unescaped-entities */
import LoginForm from "@/components/auth/loginForm";
import RegisterForm from "@/components/auth/registerForm";

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