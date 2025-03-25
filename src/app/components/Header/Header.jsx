import { Home, List, MessageCircle } from "lucide-react";
import Image from "next/image";
import Loggin_bottom from "./Loggin_bottom";
import Link from "next/link";
import AuthContextProvider from "@/app/lib/contexts/AunthContext";
export default function Header() {
  return (
    <nav className="flex justify-between  items-center px-7 py-3 border-b">
      <Link href="/">
        <h1 className="font-bold ">Khanakorn Blogs</h1>
      </Link>
      <ul className="flex gap-6 items-center">
        <Link href="/">
          <li className="flex items-center gap-2">
            <Home />
            Home
          </li>
        </Link>
        <Link href="/categories">
          <li className="flex items-center gap-2">Categories</li>
        </Link>
        <Link href="/">
          <li className="flex items-center gap-2">
            <MessageCircle />
            Contact Us
          </li>
        </Link>
        <li>
          <AuthContextProvider>
            <Loggin_bottom />
          </AuthContextProvider>
        </li>
      </ul>
    </nav>
  );
}
