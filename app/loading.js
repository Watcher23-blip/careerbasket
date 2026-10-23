'use client';
export default function Loading() {
  return (
    <div className="fixed inset-0 z-[9999] flex items-center justify-center bg-white">
      <div className="w-64 max-w-[75vw]">
        {/* Brand */}
        <h1 className="text-center text-3xl font-semibold tracking-tight text-slate-900">
          Career<span className="text-blue-600">Basket</span>
        </h1>

        {/* Animated Loading Dots */}
        <div className="mt-7 flex items-center justify-center gap-2">
          {[0, 1, 2, 3].map((dot) => (
            <span
              key={dot}
              className="h-2 w-2 rounded-full bg-blue-600 animate-bounce"
              style={{
                animationDelay: `${dot * 150}ms`,
                animationDuration: '700ms',
              }}
            />
          ))}
        </div>

        {/* Loading Text */}
        <p className="mt-4 text-center text-xs tracking-wide text-slate-400">
          Please wait while we prepare your page...
        </p>
      </div>
    </div>
  );
}