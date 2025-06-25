import Link from "next/link";
import { Button } from "../ui/button";

function Header() {
  return (
    <header className="border-b border-gray-200 shadow-sm">
      <div className=" mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center">
            <Link href="/" className="flex items-center">
              <img
                src="/light-it-logo.svg"
                alt="Light IT Logo"
                className="h-15 w-auto"
              />
            </Link>
          </div>

          <Link href="/dashboard" className="cursor-pointer">
            <Button>Dashboard</Button>
          </Link>
        </div>
      </div>
    </header>
  );
}

export default Header;
