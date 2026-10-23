
"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import {
  Loader2,
  UserPlus,
  ArrowRight,
  CheckCircle2,
  ShieldCheck,
  UserRound,
  Mail,
  Phone,
} from "lucide-react";
import Image from "next/image";
import { registerUser } from "@/app/actions/auth";
import { robotoSlab, ubuntu } from "@/lib/fonts";

export default function RegisterPage() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
  });

  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const router = useRouter();

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]:
        name === "phone"
          ? value.replace(/\D/g, "").slice(0, 10)
          : value,
    }));

    if (error) setError("");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (loading) return;

    const name = formData.name.trim();
    const email = formData.email.trim().toLowerCase();
    const phone = formData.phone.trim();

    if (!name || !email || !phone) {
      setError("Please fill in all required fields.");
      return;
    }

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      setError("Please enter a valid email address.");
      return;
    }

    if (!/^\d{10}$/.test(phone)) {
      setError("Please enter a valid 10-digit phone number.");
      return;
    }

    setLoading(true);
    setError("");

    try {
      const data = new FormData();
      data.set("name", name);
      data.set("email", email);
      data.set("phone", phone);

      const res = await registerUser(data);

      if (res && res.success) {
        setIsSuccess(true);

        window.setTimeout(() => {
          router.push(
            "/login?message=" +
            encodeURIComponent(
              "Registration successful. Please check your email for your credentials."
            )
          );
        }, 3000);
      } else {
        setError(
          (res && res.error) ||
          "Registration failed. Please try again."
        );
      }
    } catch {
      setError(
        "Unable to connect to the server. Please try again."
      );
    } finally {
      setLoading(false);
    }
  };

  if (isSuccess) {
    return (
      <main
        className={`flex min-h-[100dvh] items-center justify-center bg-[#edf1f7] p-3 sm:p-6 ${ubuntu.className}`}
      >
        <section className="w-[90vw] max-w-[480px] rounded-3xl border border-slate-200 bg-white p-7 text-center shadow-xl sm:p-10">
          <div className="mx-auto mb-5 flex h-16 w-16 items-center justify-center rounded-2xl bg-emerald-50">
            <CheckCircle2 size={36} className="text-emerald-600" />
          </div>

          <p className="mb-2 text-xs font-bold uppercase tracking-[0.16em] text-emerald-700">
            Registration complete
          </p>

          <h1
            className={`${robotoSlab.className} text-3xl font-semibold text-slate-900`}
          >
            Request Sent!
          </h1>

          <p className="mt-3 text-sm leading-6 text-slate-500">
            Your registration was submitted successfully.
            Please check your email for your credentials.
          </p>

          <div className="mt-6 flex items-center justify-center gap-2 text-xs text-slate-400">
            <Loader2 size={14} className="animate-spin" />
            Redirecting to login...
          </div>
        </section>
      </main>
    );
  }

  return (
    <main
      className={`flex min-h-[100dvh] items-center justify-center bg-[#edf1f7] p-3 sm:p-6 ${ubuntu.className}`}
    >
      <section className="grid w-[90vw] max-w-[1000px] overflow-hidden rounded-3xl border border-white bg-white shadow-[0_18px_60px_rgba(15,35,65,0.14)] lg:h-[min(720px,calc(100dvh-48px))] lg:grid-cols-[0.9fr_1fr]">

        {/* PHOTO PANEL */}

        <aside className="relative flex min-h-[190px] flex-col justify-end overflow-hidden rounded-t-3xl bg-white p-4 text-white sm:min-h-[230px] lg:min-h-0 lg:rounded-none">
          {/* Inset image with padding on all sides */}
          <div className="absolute inset-0 bg-white p-4">
            <div className="relative h-full w-full overflow-hidden rounded-2xl">
              <Image
                src="/register.jpg"
                alt="Professionals collaborating in a modern workspace"
                fill
                priority
                sizes="(min-width: 1024px) 45vw, 90vw"
                className="object-cover"
              />
            </div>
          </div>

          {/* Gradient stays inside the image */}
          <div className="absolute inset-4 rounded-2xl bg-gradient-to-t from-[#071426]/95 via-[#071426]/45 to-[#071426]/15" />

          {/* Keep your existing branding/content here */}
          <div className="relative z-10">
            {/* Your existing text */}
          </div>
        </aside>

        {/* REGISTRATION FORM */}


        <section className="relative flex min-w-0 flex-col justify-center overflow-hidden bg-white px-5 py-7 sm:px-8 sm:py-9 lg:px-10 lg:py-6 xl:px-12">
          {/* Subtle background accent */}
          <div
            aria-hidden="true"
            className="pointer-events-none absolute -right-20 -top-24 h-56 w-56 rounded-full bg-blue-50/80 blur-3xl"
          />

          <div className="relative z-10 mx-auto w-full max-w-md">
            {/* Top navigation */}
            <div className="mb-7 flex items-center justify-between sm:mb-8">
              

            
            </div>

            {/* Heading */}
            <div className="mb-6 sm:mb-7">
              <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-blue-100 bg-blue-50/70 px-3 py-1.5">
                <span className="h-1.5 w-1.5 rounded-full bg-blue-600" />
                <span className="text-[10px] font-bold uppercase tracking-[0.16em] text-[#234d82]">
                  Get started
                </span>
              </div>

              <h1
                className={`${robotoSlab.className} text-3xl font-semibold tracking-tight text-slate-950 sm:text-[34px]`}
              >
                Create your account
              </h1>

              <p className="mt-2 max-w-sm text-sm leading-6 text-slate-500">
                Join Career Basket by entering your details below. It only takes a minute.
              </p>
            </div>

            {/* Error message */}
            {error && (
              <div
                role="alert"
                className="mb-5 flex items-start gap-2.5 rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm leading-5 text-red-700"
              >
                <span className="mt-0.5 font-bold">!</span>
                <p>{error}</p>
              </div>
            )}

            {/* Registration form */}
            <form onSubmit={handleSubmit} className="space-y-4">
              {/* Full name */}
              <div>
                <label
                  htmlFor="name"
                  className="mb-2 block text-xs font-semibold text-slate-700"
                >
                  Full name
                </label>

                <div className="group relative">
                  <UserRound
                    size={17}
                    className="pointer-events-none absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400 transition-colors group-focus-within:text-[#315e9c]"
                  />

                  <input
                    id="name"
                    name="name"
                    type="text"
                    autoComplete="name"
                    placeholder="Enter your full name"
                    value={formData.name}
                    onChange={handleChange}
                    maxLength={100}
                    required
                    className="h-12 w-full rounded-xl border border-slate-200 bg-slate-50/70 pl-10 pr-4 text-sm text-slate-900 outline-none transition-all placeholder:text-slate-400 hover:border-slate-300 focus:border-[#315e9c] focus:bg-white focus:ring-4 focus:ring-blue-500/10"
                  />
                </div>
              </div>

              {/* Email address */}
              <div>
                <label
                  htmlFor="email"
                  className="mb-2 block text-xs font-semibold text-slate-700"
                >
                  Email address
                </label>

                <div className="group relative">
                  <Mail
                    size={17}
                    className="pointer-events-none absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400 transition-colors group-focus-within:text-[#315e9c]"
                  />

                  <input
                    id="email"
                    name="email"
                    type="email"
                    autoComplete="email"
                    placeholder="you@example.com"
                    value={formData.email}
                    onChange={handleChange}
                    maxLength={254}
                    required
                    className="h-12 w-full rounded-xl border border-slate-200 bg-slate-50/70 pl-10 pr-4 text-sm text-slate-900 outline-none transition-all placeholder:text-slate-400 hover:border-slate-300 focus:border-[#315e9c] focus:bg-white focus:ring-4 focus:ring-blue-500/10"
                  />
                </div>
              </div>

              {/* Mobile number */}
              <div>
                <label
                  htmlFor="phone"
                  className="mb-2 block text-xs font-semibold text-slate-700"
                >
                  Mobile number
                </label>

                <div className="group relative">
                  <Phone
                    size={17}
                    className="pointer-events-none absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400 transition-colors group-focus-within:text-[#315e9c]"
                  />

                  <input
                    id="phone"
                    name="phone"
                    type="tel"
                    inputMode="numeric"
                    autoComplete="tel-national"
                    placeholder="10-digit mobile number"
                    value={formData.phone}
                    onChange={handleChange}
                    maxLength={10}
                    pattern="[0-9]{10}"
                    title="Enter a 10-digit phone number"
                    required
                    className="h-12 w-full rounded-xl border border-slate-200 bg-slate-50/70 pl-10 pr-4 text-sm text-slate-900 outline-none transition-all placeholder:text-slate-400 hover:border-slate-300 focus:border-[#315e9c] focus:bg-white focus:ring-4 focus:ring-blue-500/10"
                  />
                </div>

                <p className="mt-2 text-[11px] text-slate-400">
                  Use a valid 10-digit mobile number.
                </p>
              </div>

              {/* Submit button */}
              <button
                type="submit"
                disabled={loading}
                className="group flex min-h-12 w-full items-center justify-center gap-2 rounded-xl bg-[#102b4e] px-4 py-3 text-sm font-semibold text-white shadow-[0_5px_14px_rgba(16,43,78,0.16)] transition-all duration-200 hover:-translate-y-0.5 hover:bg-[#1c477b] hover:shadow-[0_8px_20px_rgba(16,43,78,0.22)] focus:outline-none focus:ring-4 focus:ring-blue-500/20 disabled:translate-y-0 disabled:cursor-not-allowed disabled:opacity-60"
              >
                {loading ? (
                  <>
                    <Loader2 size={17} className="animate-spin" />
                    Creating your account...
                  </>
                ) : (
                  <>
                    Create account
                    <ArrowRight
                      size={16}
                      className="transition-transform group-hover:translate-x-1"
                    />
                  </>
                )}
              </button>

              <p className="pt-1 text-center text-[11px] leading-5 text-slate-400">
                By registering, you confirm that your information is accurate.
              </p>
            </form>

            {/* Security footer */}
            <div className="mt-6 border-t border-slate-100 pt-4 sm:mt-7">
              <div className="flex items-start justify-center gap-2.5">
                <ShieldCheck
                  size={16}
                  className="mt-0.5 shrink-0 text-emerald-600"
                />
                <p className="max-w-sm text-center text-[11px] leading-5 text-slate-500">
                  Your information is used to process your DTS registration and is
                  handled according to the application's privacy practices.
                </p>
              </div>
            </div>
          </div>
        </section>
      </section>
    </main>
  );
}
