import React from "react";
import toast from "react-hot-toast";
import { useSelector } from "react-redux";

const Profile = () => {
  const { userInfo } = useSelector((state) => state.auth);
  console.log(userInfo?.user);
  return (
    <div className="container mx-auto">
      {!userInfo?.user?.isVerified && (
        <div className="alert alert-error">
          <svg
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
          </svg>
          <span>Please Verify Your Email.</span>
        </div>
      )}

      <h1 className="text-4xl font-bold my-6">Profile</h1>
      <h1>{userInfo?.user?.name}</h1>
      <h1>{userInfo?.user?.email}</h1>
      <h1>{userInfo?.user?.createdAt}</h1>
    </div>
  );
};

export default Profile;
