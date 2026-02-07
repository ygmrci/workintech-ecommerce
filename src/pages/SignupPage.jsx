import { useEffect, useMemo, useState } from "react";
import { useForm } from "react-hook-form";
import { useHistory } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { fetchRolesThunk } from "../store/client/clientThunks";
import { toast } from "react-toastify";
import api from "../api/axiosInstance";

const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const passwordPattern =
  /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[^A-Za-z0-9]).{8,}$/;
const trPhonePattern = /^(\+90|0)?5\d{9}$/;
const taxNoPattern = /^T\d{4}V\d{6}$/;
const ibanPattern = /^TR\d{24}$/;

export default function SignupPage() {
  const history = useHistory();
  const dispatch = useDispatch();
  const roles = useSelector((state) => state.client.roles);

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState("");

  const {
    register,
    handleSubmit,
    watch,
    setValue,
    formState: { errors },
  } = useForm({
    defaultValues: {
      role_id: "",
    },
  });

  const roleId = watch("role_id");
  const storeRoleId = useMemo(
    () => roles.find((role) => role.code === "store")?.id,
    [roles],
  );
  const isStoreSelected =
    roleId && storeRoleId && String(roleId) === String(storeRoleId);

  // useEffect(() => {
  //   dispatch(fetchRolesIfNeeded());
  // }, [dispatch]);
  useEffect(() => {
    dispatch(fetchRolesThunk());
  }, [dispatch]);

  useEffect(() => {
    const customerRole = roles.find((role) => role.code === "customer");
    if (customerRole) setValue("role_id", String(customerRole.id));
  }, [roles, setValue]);

  const onSubmit = async (formData) => {
    setSubmitError("");
    setIsSubmitting(true);

    const payload = {
      name: formData.name,
      email: formData.email,
      password: formData.password,
      role_id: Number(formData.role_id),
    };

    if (isStoreSelected) {
      payload.store = {
        name: formData.storeName,
        phone: formData.storePhone,
        tax_no: formData.storeTaxNo,
        bank_account: formData.storeBankAccount,
      };
    }

    try {
      await api.post("/signup", payload);
      toast.success(
        "You need to click link in email to activate your account!",
      );
      history.push("/login");
    } catch (error) {
      const message =
        error?.response?.data?.message ||
        "Kayıt başarısız. Lütfen bilgileri kontrol edin.";
      setSubmitError(message);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="w-full bg-white">
      <div className="w-full max-w-lg mx-auto px-4 py-10">
        <h1 className="text-[28px] font-bold text-[#252B42]">Sign Up</h1>
        <p className="mt-2 text-[14px] text-[#737373]">
          Create your account below.
        </p>

        <form className="mt-8 space-y-5" onSubmit={handleSubmit(onSubmit)}>
          <div>
            <label className="text-[14px] font-semibold text-[#252B42]">
              Name
            </label>
            <input
              type="text"
              className="mt-2 w-full h-[44px] border border-[#E6E6E6] px-3 text-[14px] rounded"
              {...register("name", {
                required: "Name is required",
                minLength: {
                  value: 3,
                  message: "Name must be at least 3 characters",
                },
              })}
            />
            {errors.name && (
              <p className="mt-1 text-[12px] text-red-500">
                {errors.name.message}
              </p>
            )}
          </div>

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
              {...register("password", {
                required: "Password is required",
                pattern: {
                  value: passwordPattern,
                  message: "Min 8 chars, include upper, lower, number, special",
                },
              })}
            />
            {errors.password && (
              <p className="mt-1 text-[12px] text-red-500">
                {errors.password.message}
              </p>
            )}
          </div>

          <div>
            <label className="text-[14px] font-semibold text-[#252B42]">
              Confirm Password
            </label>
            <input
              type="password"
              className="mt-2 w-full h-[44px] border border-[#E6E6E6] px-3 text-[14px] rounded"
              {...register("passwordConfirm", {
                required: "Please confirm your password",
                validate: (value) =>
                  value === watch("password") || "Passwords do not match",
              })}
            />
            {errors.passwordConfirm && (
              <p className="mt-1 text-[12px] text-red-500">
                {errors.passwordConfirm.message}
              </p>
            )}
          </div>

          <div>
            <label className="text-[14px] font-semibold text-[#252B42]">
              Role
            </label>
            <select
              className="mt-2 w-full h-[44px] border border-[#E6E6E6] px-3 text-[14px] rounded bg-white"
              {...register("role_id", { required: "Role is required" })}
            >
              <option value="">Select a role</option>
              {roles.map((role) => (
                <option key={role.id} value={role.id}>
                  {role.name}
                </option>
              ))}
            </select>
            {errors.role_id && (
              <p className="mt-1 text-[12px] text-red-500">
                {errors.role_id.message}
              </p>
            )}
          </div>

          {isStoreSelected && (
            <div className="space-y-5 rounded border border-[#E6E6E6] p-4">
              <div>
                <label className="text-[14px] font-semibold text-[#252B42]">
                  Store Name
                </label>
                <input
                  type="text"
                  className="mt-2 w-full h-[44px] border border-[#E6E6E6] px-3 text-[14px] rounded"
                  {...register("storeName", {
                    required: isStoreSelected
                      ? "Store name is required"
                      : false,
                    minLength: {
                      value: 3,
                      message: "Store name must be at least 3 characters",
                    },
                  })}
                />
                {errors.storeName && (
                  <p className="mt-1 text-[12px] text-red-500">
                    {errors.storeName.message}
                  </p>
                )}
              </div>

              <div>
                <label className="text-[14px] font-semibold text-[#252B42]">
                  Store Phone
                </label>
                <input
                  type="tel"
                  className="mt-2 w-full h-[44px] border border-[#E6E6E6] px-3 text-[14px] rounded"
                  {...register("storePhone", {
                    required: isStoreSelected
                      ? "Store phone is required"
                      : false,
                    pattern: {
                      value: trPhonePattern,
                      message: "Geçerli bir Türkiye telefonu girin",
                    },
                  })}
                />
                {errors.storePhone && (
                  <p className="mt-1 text-[12px] text-red-500">
                    {errors.storePhone.message}
                  </p>
                )}
              </div>

              <div>
                <label className="text-[14px] font-semibold text-[#252B42]">
                  Store Tax ID
                </label>
                <input
                  type="text"
                  className="mt-2 w-full h-[44px] border border-[#E6E6E6] px-3 text-[14px] rounded"
                  {...register("storeTaxNo", {
                    required: isStoreSelected ? "Tax ID is required" : false,
                    pattern: {
                      value: taxNoPattern,
                      message: "TXXXXVXXXXXX formatında olmalı",
                    },
                  })}
                />
                {errors.storeTaxNo && (
                  <p className="mt-1 text-[12px] text-red-500">
                    {errors.storeTaxNo.message}
                  </p>
                )}
              </div>

              <div>
                <label className="text-[14px] font-semibold text-[#252B42]">
                  Store Bank Account (IBAN)
                </label>
                <input
                  type="text"
                  className="mt-2 w-full h-[44px] border border-[#E6E6E6] px-3 text-[14px] rounded"
                  {...register("storeBankAccount", {
                    required: isStoreSelected ? "IBAN is required" : false,
                    pattern: {
                      value: ibanPattern,
                      message: "Geçerli bir TR IBAN girin",
                    },
                  })}
                />
                {errors.storeBankAccount && (
                  <p className="mt-1 text-[12px] text-red-500">
                    {errors.storeBankAccount.message}
                  </p>
                )}
              </div>
            </div>
          )}

          {submitError && (
            <p className="text-[13px] text-red-500">{submitError}</p>
          )}

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
                Submitting...
              </span>
            ) : (
              "Sign Up"
            )}
          </button>
        </form>
      </div>
    </div>
  );
}
