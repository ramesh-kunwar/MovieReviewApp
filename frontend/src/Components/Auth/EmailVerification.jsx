import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import {
  useResendEmailVerificationTokenMutation,
  useVerifyEmailMutation,
} from "../../store/userApiSlice";
import { toast } from "react-hot-toast";
const EmailVerification = () => {
  const [otp, setOtp] = useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { userInfo } = useSelector((state) => state.auth);

  const [verifyEmail, { isLoading, error, isSuccess }] =
    useVerifyEmailMutation();

  const [resendVerification] = useResendEmailVerificationTokenMutation();

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await verifyEmail({ otp }).unwrap();
      toast.success("Email Verified Successfully");
      navigate("/");
    } catch (error) {
      console.log(error);
      toast.error(error?.data?.message || error?.error);
    }
  };

  const handleResendVerification = async () => {
    console.log("resend");

    try {
      await resendVerification().unwrap();
      toast.success("Verification Code Sent Successfully");
    } catch (error) {
      console.log(error);
      toast.error(error?.data?.message || error?.error);
    }
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
            OPT has been sent to your email {userInfo?.user?.email}
          </p>
          <input
            onChange={(e) => setOtp(e.target.value)}
            value={otp}
            type="text"
            placeholder="Type here"
            className="input input-bordered w-full my-6"
          />
          <input
            type="submit"
            value={"Submit"}
            className="btn btn-md btn-primary w-full text-white"
          />
          <button
            onClick={handleResendVerification}
            type="button"
            className="btn btn-sm text-xs text-gray-500 my-2 normal-case"
          >
            Resend Verification Code
          </button>
        </div>
      </form>
    </div>
  );
};

export default EmailVerification;
