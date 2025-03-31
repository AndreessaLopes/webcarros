import { Link } from "react-router-dom";
import logoImg from "../../assets/logo.png";
import { FiUser, FiLogIn } from "react-icons/fi";
export default function Header() {
  const signed = false;
  const loadingAuth = false;

  return (
    <div className="w-full flex items-center h-16  bg-white drop-shadow mb-4 ">
      <header className="flex w-full max-w-7xl justify-between items-center px-4 mx-auto">
        <Link to="/">
          <img src={logoImg} alt="Logo do site" />
        </Link>
        {!loadingAuth && signed && (
          <Link to="/dashboard">
            <div className="border-2 rounded-full p-1 border-gray-900">
              <FiUser size={24} color="#000"></FiUser>
            </div>
          </Link>
        )}
        {!loadingAuth && !signed && (
          <Link to="/login" className="flex items-center gap-2">
            <FiLogIn size={24} color="#000"></FiLogIn>
          </Link>
        )}
      </header>
    </div>
  );
}
