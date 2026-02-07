import { useState } from "react";
import { useForm } from "react-hook-form";
import { useHistory, useLocation, Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import { toast } from "react-toastify";
import { loginThunk } from "../store/client/clientThunks";
import api from "../api/axiosInstance";

const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export default function LoginPage() {
  const history = useHistory();
  const location = useLocation();
  const dispatch = useDispatch();

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showResend, setShowResend] = useState(false);
  const [failedEmail, setFailedEmail] = useState("");
  const [resendLoading, setResendLoading] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({ mode: "onBlur" });

  const onSubmit = async (formData) => {
    setIsSubmitting(true);
    try {
      await dispatch(
        loginThunk({
          email: formData.email,
          password: formData.password,
          rememberMe: formData.rememberMe,
        }),
      );

      const backTo = location.state?.from?.pathname || "/";
      history.push(backTo);
    } catch (error) {
      const msg =
        error?.response?.data?.message ||
        "Login failed. Please check your credentials.";
      toast.error(msg);
      // If account not activated, offer resend
      if (
        /\bnot activated\b/i.test(msg) ||
        /activate your account/i.test(msg)
      ) {
        setShowResend(true);
        setFailedEmail(formData.email);
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleResend = async () => {
    if (!failedEmail) return;
    setResendLoading(true);
    try {
      await api.post("/resend-activation", { email: failedEmail });
      toast.success(
        "Activation email resent. Check your inbox and spam folder.",
      );
      setShowResend(false);
    } catch (err) {
      const m = err?.response?.data?.message || "Resend failed";
      toast.error(m);
    } finally {
      setResendLoading(false);
    }
  };

  return (
    <div className="w-full bg-white">
      <div className="w-full max-w-lg mx-auto px-4 py-10">
        <h1 className="text-[28px] font-bold text-[#252B42]">Login</h1>
        <p className="mt-2 text-[14px] text-[#737373]">
          Welcome back. Please sign in.
        </p>

        <form className="mt-8 space-y-5" onSubmit={handleSubmit(onSubmit)}>
          <div>
            <label className="text-[14px] font-semibold text-[#252B42]">
              Email
            </label>
            <input
              type="email"
              className="mt-2 w-full h-[44px] border border-[#E6E6E6] px-3 text-[14px] rounded"
              {...register("email", {
                required: "Email is required",
                pattern: {
                  value: emailPattern,
                  message: "Please enter a valid email",
                },
              })}
            />
            {errors.email && (
              <p className="mt-1 text-[12px] text-red-500">
                {errors.email.message}
              </p>
            )}
          </div>

          <div>
            <label className="text-[14px] font-semibold text-[#252B42]">
              Password
            </label>
            <input
              type="password"
              className="mt-2 w-full h-[44px] border border-[#E6E6E6] px-3 text-[14px] rounded"
              {...register("password", { required: "Password is required" })}
            />
            {errors.password && (
              <p className="mt-1 text-[12px] text-red-500">
                {errors.password.message}
              </p>
            )}
          </div>

          {/* Remember me */}
          <label className="flex items-center gap-2 text-[13px] text-[#737373]">
            <input type="checkbox" {...register("rememberMe")} />
            Remember me
          </label>

          <button
            type="submit"
            disabled={isSubmitting}
            className={`w-full h-[44px] rounded-[5px] text-white text-[14px] font-semibold ${
              isSubmitting ? "bg-[#B5B5B5]" : "bg-[#23A6F0]"
            }`}
          >
            {isSubmitting ? (
              <span className="flex items-center justify-center gap-2">
                <span className="h-4 w-4 animate-spin rounded-full border-2 border-white border-t-transparent" />
                Signing in...
              </span>
            ) : (
              "Login"
            )}
          </button>

          <p className="text-[13px] text-[#737373]">
            Don&apos;t have an account?{" "}
            <Link to="/signup" className="text-[#23A6F0] font-semibold">
              Register
            </Link>
          </p>
          {showResend && (
            <div className="mt-2">
              <p className="text-sm text-yellow-700 mb-2">
                Your account is not activated. Didn't receive the email?
              </p>
              <button
                type="button"
                onClick={handleResend}
                disabled={resendLoading}
                className={`h-[36px] px-4 rounded text-white font-semibold ${
                  resendLoading ? "bg-[#B5B5B5]" : "bg-[#23A6F0]"
                }`}
              >
                {resendLoading ? "Sending..." : "Resend activation email"}
              </button>
            </div>
          )}
        </form>
      </div>
    </div>
  );
}
