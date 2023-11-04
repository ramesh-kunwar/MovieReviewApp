import React from "react";

import { Link } from "react-router-dom";
import { useProfileQuery } from "../../store/userApiSlice";

const Profile = () => {
  const user = useProfileQuery();
  const userDetails = user.data?.user;

  return (
    <div className="container mx-auto">
      {!userDetails?.isVerified && (
        <div className="alert alert-error text-white">
          {/* <svg
            xmlns="http://www.w3.org/2000/svg"
            className="stroke-current shrink-0 h-6 w-6"
            fill="none"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z"
            />
          </svg> */}
          <span>
            Please Verify Your Email.{" "}
            <Link
              to={"/emailVerification"}
              className="underline text-blue-600 font-light"
            >
              {" "}
              Verify
            </Link>
          </span>
        </div>
      )}

      <h1 className="text-4xl font-bold my-6">Profile</h1>
      <h1> Name: {userDetails?.name}</h1>
      <h1> Email: {userDetails?.email}</h1>
    </div>
  );
};

export default Profile;
