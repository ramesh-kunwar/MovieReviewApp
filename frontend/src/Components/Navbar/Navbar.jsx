import React from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { logout } from "../../store/authSlice";
const Navbar = () => {
  const { userInfo } = useSelector((state) => state.auth);

  return (
    <div className="container mx-auto">
      <div className="navbar bg-base-100">
        <div className="flex-1">
          <Link to={"/"} className="btn btn-ghost normal-case text-xl">
            MR
          </Link>
        </div>
        <div className="flex-none gap-2">
          <div className="form-control">
            <input
              type="text"
              placeholder="Search"
              className="input input-bordered w-24 md:w-auto"
            />
          </div>
          <div className="dropdown dropdown-end">
            {userInfo?.user ? (
              <label tabIndex={0} className="btn btn-ghost btn-circle avatar">
                <div className="w-10 rounded-full">
                  <img src="https://t4.ftcdn.net/jpg/04/83/90/95/360_F_483909569_OI4LKNeFgHwvvVju60fejLd9gj43dIcd.jpg" />
                </div>
              </label>
            ) : (
              <label tabIndex={0} className="">
                <Link
                  onClick={() => logout()}
                  // to={"/login"}
                  className="btn btn-ghost normal-case text-xl"
                >
                  Login
                </Link>
              </label>
            )}

            <ul
              tabIndex={0}
              className="mt-3 z-[1] p-2 shadow menu menu-sm dropdown-content bg-base-100 rounded-box w-52"
            >
              <li>
                <Link to={"/profile"} className="justify-between">
                  Profile
                </Link>
              </li>

              <li>
                <Link to={"/logout"}>Logout</Link>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
