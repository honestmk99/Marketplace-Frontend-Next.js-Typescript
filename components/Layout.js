import { useState, useEffect } from "react";
import Link from "next/link";
import UserIcon from "./ui/user";
import ShoppingCartIcon from "./ui/shoppingcart";
import FavoriteIcon from "./ui/favorite";
import { useRouter } from "next/router";

function Layout({ children }) {
  const [session, setSession] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [cartOpen, setCartOpen] = useState(false);
  const handleMenu = () => setMenuOpen(!menuOpen);
  const handleOpen = () => setCartOpen(!cartOpen);
  const [haveProducts, setHaveProducts] = useState(false);
  const [cartItems, setCartItems] = useState([]);

  const router = useRouter();
  return (
    <div className="">
      <header>
        <div className="container mx-auto px-6 py-3">
          <div className="flex items-center justify-between">
            <div className="w-full text-red-700 md:text-left text-2xl font-semibold">
              Rabbit Mart - SE GIU
            </div>
            <div className="flex items-center justify-end w-full lg:w-2/5 lg:justify-around">
              <button className="text-gray-600">
                <UserIcon />
              </button>
              <button
                className="text-gray-600 ml-4 lg:ml-0"
                // onClick={getFavoriteListHandler}
                onClick={(e) => e.preventDefault()}
              >
                <FavoriteIcon />
              </button>
              {/* shopping cart icon */}
              <button
                // onClick={getShoppingCartHandler}
                onClick={(e) => e.preventDefault()}
                className="text-gray-600 focus:outline-none mx-4 sm:mx-0"
              >
                <ShoppingCartIcon />
              </button>
            </div>
          </div>
          <nav
            className={`${menuOpen ? "" : "hidden"
              } sm:flex sm:justify-center sm:items-center mt-4 `}
          >
            <div className="flex flex-col sm:flex-row">
              <Link href="/">
                <button className="border font-mono p-2 w-1/3 bg-lime-300 border-black shadow-offset-black lg:w-24 lg:mr-8">
                  Home
                </button>
              </Link>
            </div>
            <div className="flex flex-col sm:flex-row">
              <Link href="/orders">
                <button className="border font-mono p-2 w-1/3 bg-lime-300 border-black shadow-offset-black lg:w-24 lg:mr-8">
                  Orders
                </button>
              </Link>
            </div>
            <div className="flex flex-col sm:flex-row">
              <Link href="/shipments">
                <button className="border font-mono p-2 w-1/3 bg-lime-300 border-black shadow-offset-black lg:w-24 lg:mr-8">
                  Shipments
                </button>
              </Link>
            </div>
          </nav>
        </div>
      </header>
      <main className="my-8">{children}</main>
      <footer className="text-center">Copyright 2022 Powered by World</footer>
    </div>
  );
}

export default Layout;
