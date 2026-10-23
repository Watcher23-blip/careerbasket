"use client";

import { useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import Link from "next/link";
import {
  Loader2,
  Eye,
  EyeOff,
  ArrowRight,
  ShieldCheck,
  FileText,
  Database,
} from "lucide-react";

import { loginUser } from "@/app/actions/auth";
import { ubuntu, robotoSlab } from "@/lib/fonts";

export default function LoginForm() {
  const router = useRouter();
  const searchParams = useSearchParams();

  const [loginId, setLoginId] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const message = searchParams.get("message");

  async function handleSubmit(e) {
    e.preventDefault();
    setError("");

    if (!loginId.trim() || !password) {
      setError("Please enter your login ID and password.");
      return;
    }

    setLoading(true);

    try {
      const formData = new FormData();
      formData.set("loginId", loginId.trim());
      formData.set("password", password);

      const res = await loginUser(formData);

      if (res?.success) {
        router.push(res.role === "admin" ? "/admin" : "/user");
        router.refresh();
        return;
      }

      setError(res?.message || "Unable to sign in. Please try again.");
    } catch {
      setError(
        "Unable to connect. Please check your connection and try again."
      );
    } finally {
      setLoading(false);
    }
  }

  return (
    <main
      className={`flex min-h-[100dvh] w-full items-center justify-center bg-[#f3f5f9] p-0 text-slate-900 sm:p-4 lg:p-6 ${ubuntu.className}`}
    >
      <section className="flex min-h-0 w-[90vw] max-w-[1100px] flex-col overflow-hidden rounded-2xl border border-gray-200/80 bg-white shadow-[0_16px_50px_rgba(25,45,80,0.10)] sm:grid sm:min-h-[560px] sm:grid-cols-2 lg:h-[min(82dvh,680px)] lg:min-h-[600px]">
        {/* LOGIN FORM — TOP ON MOBILE, RIGHT ON DESKTOP */}
        <div className="order-1 flex flex-col justify-center bg-white px-[10px] py-6 sm:order-2 sm:min-h-0 sm:px-8 sm:py-10 lg:m-2 lg:px-10">
          <div className="mx-auto px-4 flex w-full max-w-[390px] flex-col">
            {/* Logo */}
            <Link
              href="/"
              className="mb-7 inline-flex w-fit items-center gap-3 sm:mb-10"
            >
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#173b70] text-sm font-bold text-white shadow-sm">
                CB
              </div>

              <div>
                <p
                  className={`${robotoSlab.className} text-[17px] font-semibold tracking-tight text-slate-900`}
                >
                  Career Basket
                </p>
                <p className="text-[11px] tracking-wide text-slate-500">
                  WORKSPACE
                </p>
              </div>
            </Link>

            {/* Welcome text */}
            <div className="mb-6">
              <p className="mb-3 text-xs font-semibold uppercase tracking-[0.18em] text-[#315e9c]">
                Welcome back
              </p>

              

              <p className="mt-3 max-w-sm text-sm leading-6 text-slate-500">
                Access your dashboard and continue managing your work.
              </p>
            </div>

            {/* Success message */}
            {message && (
              <div className="mb-4 rounded-xl border border-blue-100 bg-blue-50 px-4 py-3 text-sm leading-5 text-blue-800">
                {message}
              </div>
            )}

            {/* Error message */}
            {error && (
              <div
                role="alert"
                className="mb-4 rounded-xl border border-red-100 bg-red-50 px-4 py-3 text-sm leading-5 text-red-700"
              >
                {error}
              </div>
            )}

            {/* Login form */}
            <form onSubmit={handleSubmit} className="space-y-4 sm:space-y-5">
              <div>
              

                <input
                  id="loginId"
                  name="loginId"
                  type="text"
                  autoComplete="username"
                  value={loginId}
                  onChange={(e) => setLoginId(e.target.value)}
                  placeholder="Enter your login ID"
                  required
                  className="h-12 w-full rounded-xl border border-slate-200 bg-white px-4 text-sm text-slate-900 outline-none transition placeholder:text-slate-400 hover:border-slate-300 focus:border-[#315e9c] focus:ring-4 focus:ring-blue-50"
                />
              </div>

              <div>
              

                <div className="relative">
                  <input
                    id="password"
                    name="password"
                    type={showPassword ? "text" : "password"}
                    autoComplete="current-password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="Enter your password"
                    required
                    className="h-12 w-full rounded-xl border border-slate-200 bg-white px-4 pr-12 text-sm text-slate-900 outline-none transition placeholder:text-slate-400 hover:border-slate-300 focus:border-[#315e9c] focus:ring-4 focus:ring-blue-50"
                  />

                  <button
                    type="button"
                    onClick={() => setShowPassword((prev) => !prev)}
                    aria-label={showPassword ? "Hide password" : "Show password"}
                    className="absolute inset-y-0 right-0 flex w-12 items-center justify-center text-slate-400 transition hover:text-slate-700"
                  >
                    {showPassword ? (
                      <EyeOff size={18} />
                    ) : (
                      <Eye size={18} />
                    )}
                  </button>
                </div>
              </div>

              <button
                type="submit"
                disabled={loading}
                className="group flex h-12 w-full items-center justify-center gap-2 rounded-xl bg-[#173b70] px-4 text-sm font-medium text-white transition hover:bg-[#214d89] focus:outline-none focus:ring-4 focus:ring-blue-100 disabled:cursor-not-allowed disabled:opacity-70"
              >
                {loading ? (
                  <>
                    <Loader2 size={17} className="animate-spin" />
                    Signing in...
                  </>
                ) : (
                  <>
                    Sign in to Dashboard
                    <ArrowRight
                      size={17}
                      className="transition-transform group-hover:translate-x-1"
                    />
                  </>
                )}
              </button>
            </form>

            {/* Security note */}
            <div className="mt-6 flex items-center justify-center gap-2 text-xs text-slate-500 sm:mt-7">
              <ShieldCheck size={15} className="text-emerald-600" />
              Secure access to your workspace
            </div>

            {/* Copyright */}
            <div className="mt-6 border-t border-slate-100 pt-4 text-center text-xs text-slate-400 sm:mt-7 sm:pt-5">
              © 2026 Career Basket. All rights reserved.
            </div>
          </div>
        </div>

        {/* IMAGE PANEL — BOTTOM ON MOBILE, LEFT ON DESKTOP */}
        <div className="relative order-2 mx-0 mb-0 flex min-h-[36dvh] flex-col justify-between overflow-hidden rounded-xl bg-[#14294b] px-[10px] py-6 text-white sm:order-1 sm:m-2 sm:min-h-0 sm:px-6 sm:py-7 md:px-8 md:py-8">
          {/* Background image and overlay */}
          <div
            className="absolute inset-0 bg-cover bg-center"
            style={{
              backgroundImage:
                "linear-gradient(180deg, rgba(11,27,52,0.12) 0%, rgba(11,27,52,0.55) 48%, rgba(11,27,52,0.96) 100%), url('/login.jpg')",
            }}
          />

          {/* Decorative glow */}
          <div className="pointer-events-none absolute -right-20 -top-20 h-64 w-64 rounded-full bg-blue-400/20 blur-3xl" />

          {/* Desktop logo */}
          <div className="relative z-10 hidden items-center gap-3 sm:flex">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl border border-white/20 bg-white/10 text-sm font-bold text-white backdrop-blur-md">
              CB
            </div>

            <div>
              <p
                className={`${robotoSlab.className} text-lg font-semibold tracking-tight`}
              >
                Career Basket
              </p>
              <p className="text-[11px] tracking-wide text-white/65">
                YOUR WORKSPACE
              </p>
            </div>
          </div>

          {/* Image panel content */}
          <div className="relative z-10 mt-auto">
            

           

            <p className="mt-3 max-w-md text-sm leading-6 text-white/75 sm:text-[13px]">
              Your workspace for resume processing, data sorting, and
              structured information management.
            </p>

            {/* Feature cards */}
            <div className="mt-5 grid grid-cols-2 gap-2 sm:mt-7 sm:gap-3">
              <div className="rounded-xl border border-white/15 bg-white/10 p-3 backdrop-blur-md sm:p-4">
                <div className="mb-3 flex h-8 w-8 items-center justify-center rounded-lg bg-white/15">
                  <FileText size={17} />
                </div>

                <p className="text-sm font-medium">Resume Processing</p>
                <p className="mt-1 text-xs leading-5 text-white/60">
                  Organized and structured records.
                </p>
              </div>

              <div className="rounded-xl border border-white/15 bg-white/10 p-3 backdrop-blur-md sm:p-4">
                <div className="mb-3 flex h-8 w-8 items-center justify-center rounded-lg bg-white/15">
                  <Database size={17} />
                </div>

                <p className="text-sm font-medium">Data Sorting</p>
                <p className="mt-1 text-xs leading-5 text-white/60">
                  Information managed efficiently.
                </p>
              </div>
            </div>

            {/* Desktop footer */}
            <div className="mt-6 hidden items-center justify-between border-t border-white/15 pt-4 text-[11px] text-white/60 sm:flex">
              <span>© 2026 Career Basket</span>

              <span className="inline-flex items-center gap-1.5">
                <ShieldCheck size={14} />
                Secure access
              </span>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}