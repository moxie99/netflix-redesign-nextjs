import React from "react";
import { BellIcon, SearchIcon } from "@heroicons/react/outline";
import Link from "next/link";

const Header = () => {
  const [isScrolled, setIsScrolled] = React.useState(false);

  React.useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 0) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);
  return (
    <header className={`${isScrolled && "bg-transparent"}`}>
      <div className="flex items-center space-x-3 md:space-x-10">
        <img
          src="https://cdn.dribbble.com/users/9378043/screenshots/16832559/netflix__1__4x.png"
          width={100}
          height={100}
          className="object-contain cursor-pointer"
        />
        <ul className="hidden space-x-4 md:flex">
          <li className="headerLink">Home</li>
          <li className="headerLink">TV Shows</li>
          <li className="headerLink">Movies</li>
          <li className="headerLink">New and Popular</li>
          <li className="headerLink">Favourite List</li>
        </ul>
      </div>

      <div className="flex items-center space-x-4 text-sm font-light">
        <SearchIcon className="hidden w-8 h-8 sm:inline" />
        <p className="hidden lg:inline">Kids</p>
        <BellIcon className="w-8 h-8" />

        <Link href="/account">
          <img
            src="https://ih1.redbubble.net/image.618427277.3222/flat,800x800,075,f.u2.jpg"
            alt="account"
            className="w-8 h-8 rounded cursor-pointer"
          />
        </Link>
      </div>
    </header>
  );
};

export default Header;
