"use client";

import Link from "next/link";

export default function HomePage() {
  return (
    <div className="min-h-screen bg-black text-white flex items-center justify-center">
      <div className="text-center space-y-4">
        <h1 className="text-2xl font-bold">Activacel Fans</h1>
        <p className="text-sm text-slate-400">
          Panel principal de prueba
        </p>

        <div className="flex gap-3 justify-center">
          <Link
            href="/feed"
            className="px-4 py-2 rounded-lg bg-emerald-500 text-black font-semibold"
          >
            Ir al Feed
          </Link>

          <Link
            href="/monedas"
            className="px-4 py-2 rounded-lg bg-slate-800 text-white border border-slate-700"
          >
            Comprar monedas
          </Link>
        </div>
      </div>
    </div>
  );
}
