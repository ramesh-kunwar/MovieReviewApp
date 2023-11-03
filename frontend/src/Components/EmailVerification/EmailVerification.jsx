import React, { useState } from "react";
import { Link } from "react-router-dom";

const EmailVerification = () => {
  const [otp, setOtp] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("submitted");
    console.log(otp);
  };
  return (
    <div className="flex h-screen justify-center align-middle items-center bg-slate-50">
      <form onSubmit={handleSubmit} action="">
        <div className="max-w-6xl  px-4 py-8 rounded-xl bg-white">
          <h1 className="text-2xl font-bold text-center mb-10">
            OTP Verification
          </h1>

          {/* <label htmlFor="email" className="text-gray-600">
          Email
        </label> */}
          <p className="text-gray-600">
            OPT has been sent to your email abc@gmail.com
          </p>
          <input
            onChange={(e) => setOtp(e.target.value)}
            type="text"
            placeholder="Type here"
            className="input input-bordered w-full my-6"
          />
          <input
            type="submit"
            value={"Submit"}
            className="btn btn-md btn-primary w-full text-white"
          />
        </div>
      </form>
    </div>
  );
};

export default EmailVerification;
