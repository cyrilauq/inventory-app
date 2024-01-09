import { useStoreAuth } from "@/store/authStore";
import Link from "next/link";

const HeaderNav = () => {
    const { isAuth } = useStoreAuth();
    const liClasses = "mx-2";

    return(
        <ul className="self-start flex flex-row">
            <li className={liClasses}>
                <Link href="/">Home</Link>
            </li>
            <li className={liClasses}>
                <Link href="/contact">Contact</Link>
            </li>
            <li className={liClasses}>
                {isAuth && <Link href="/dashboard">Dashboard</Link>}
            </li>
        </ul>
    );
};

export default HeaderNav;