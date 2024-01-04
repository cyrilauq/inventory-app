import AuthNav from "./authNav";

const Header = () => {
    return(
        <header className="w-[100%] flex justify-center items-center text-center min-h-24">
            <h1 className="text-2xl font-bold">Inventory manager</h1>
            <AuthNav />
        </header>
    )
};

export default Header;