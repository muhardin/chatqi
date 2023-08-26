import Link from "next/link";
import { buttonVariants } from "./ui/button";
import { HandMetal } from "lucide-react";

const Navbar = () => {
    return (
        <div className="bg-zinc-100 py-2 border-0 border-s-zinc-200 fixed w-full z-10 top-0">
            <div className="container flex items-center justify-between">
                <Link href='/'><HandMetal/></Link>
                <Link href='/sign-in' className={buttonVariants()}>Sign In</Link>
            </div>
        </div>
    )
}
export default Navbar;