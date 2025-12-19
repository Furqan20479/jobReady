import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCartShopping, faUser } from "@fortawesome/free-solid-svg-icons";
import { Link } from "react-router-dom";

export default function Header() {
  return (
    <>
      <header className="w-full h-auto bg-blue-600 flex justify-between">
        {/* Logo */}
        <div className="w-1/5  text-white text-[20px] ml-10">
          <Link to="/">Shahzaib's Collection</Link>
        </div>

        {/* Navigation */}

        <nav className="w-1/2 ">
          <ul className="h-auto w-full flex justify-evenly">
            <li>
              <Link to="/" className="text-[20px] text-white">
                Home
              </Link>
            </li>

            <li>
              <Link to="/shop" className="text-[20px] text-white">
                Shop
              </Link>
            </li>

            <li>
              <Link to="/collection" className="text-[20px] text-white">
                Collection
              </Link>
            </li>

            <li>
              <Link to="/cart" className="text-[20px] text-white">
                Cart
              </Link>
            </li>

            <li>
              <Link to="/contact" className="text-[20px] text-white">
                Contact
              </Link>
            </li>
          </ul>
        </nav>

        {/* Icons Right Side */}
        <div className="w-1/5  flex justify-end items-center mr-10">
          <Link to="/cart">
            <FontAwesomeIcon
              icon={faCartShopping}
              className="text-white p-1.5"
            />
          </Link>

          <Link to="/login" className="text-[20px] text-white">
            <FontAwesomeIcon icon={faUser} className="text-white text-[16px]" />
          </Link>
        </div>
      </header>
    </>
  );
}
