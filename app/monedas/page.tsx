const COINS_PER_USD = 100;

const PACKS = [
  {
    name: "Starter",
    coins: 500,
    priceUsd: 4.99,
    description: "Ideal para probar la plataforma.",
  },
  {
    name: "Popular",
    coins: 1100,
    priceUsd: 9.99,
    description: "El favorito de los fans recurrentes.",
    highlight: true,
  },
  {
    name: "Pro",
    coins: 3000,
    priceUsd: 24.99,
    description: "Perfecto para suscripciones y videollamadas VIP.",
  },
  {
    name: "Ultra Fan",
    coins: 6500,
    priceUsd: 49.99,
    description: "Para fans que quieren apoyar al máximo.",
  },
];

export default function MonedasPage() {
  return (
    <main className="min-h-screen bg-gradient-to-b from-slate-950 to-slate-900 text-white">
      {/* HEADER SIMPLE (puedes igualarlo al de tu home luego) */}
      <header className="border-b border-white/10">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-4">
          <div className="text-xl font-bold tracking-tight">
            Activacel <span className="text-pink-500">Fans</span>
          </div>
          <nav className="hidden gap-4 text-sm text-slate-200 md:flex">
            <a href="/" className="hover:text-pink-400">
              Inicio
            </a>
            <a href="/monedas" className="text-pink-400 font-semibold">
              Monedas
            </a>
          </nav>
        </div>
      </header>

      {/* CONTENIDO */}
      <section className="mx-auto max-w-6xl px-4 py-10 md:py-14">
        {/* TÍTULO + EXPLICACIÓN */}
        <div className="mb-8 md:mb-10 grid gap-6 md:grid-cols-[minmax(0,1.4fr),minmax(0,1fr)] items-start">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.25em] text-pink-400 mb-2">
              Sistema de monedas
            </p>
            <h1 className="text-3xl md:text-4xl font-bold leading-tight mb-3">
              Activacel Coins para fans y creadoras.
            </h1>
            <p className="text-sm md:text-base text-slate-300 mb-3">
              Los fans compran <span className="font-semibold">Activacel Coins (AC)</span> y las usan
              para suscripciones, videollamadas y contenido exclusivo.
            </p>
            <p className="text-sm text-slate-300">
              Conversión base:{" "}
              <span className="font-semibold text-pink-300">
                1 USD ≈ {COINS_PER_USD} AC
              </span>
              . Cuando un fan gasta monedas en una creadora, el ingreso se reparte
              <span className="font-semibold text-emerald-300"> 50% creadora</span> y{" "}
              <span className="font-semibold text-sky-300">50% plataforma</span>.
            </p>
          </div>

          <div className="rounded-2xl bg-slate-900/70 border border-white/10 p-4 md:p-5 shadow-xl shadow-pink-500/10 text-xs md:text-sm">
            <h2 className="text-sm md:text-base font-semibold mb-2">
              Ejemplo rápido
            </h2>
            <ul className="space-y-2 text-slate-300">
              <li>
                • Un fan compra el paquete <span className="font-semibold">Popular</span> de{" "}
                <span className="font-semibold">1100 AC</span> (~9.99 USD).
              </li>
              <li>
                • Usa esas monedas para suscribirse y hacer videollamadas con sus creadoras favoritas.
              </li>
              <li>
                • Cada vez que gasta monedas, el sistema reparte:
              </li>
              <li className="ml-3">
                – <span className="text-emerald-300 font-semibold">50%</span> del valor para la creadora. <br />
                – <span className="text-sky-300 font-semibold">50%</span> del valor para la plataforma Activacel Fans.
              </li>
            </ul>
          </div>
        </div>

        {/* LISTA DE PAQUETES */}
        <div className="grid gap-5 md:grid-cols-4">
          {PACKS.map((pack) => {
            const creatorUsd = pack.priceUsd / 2;
            const platformUsd = pack.priceUsd / 2;
            const pricePer100Coins = (pack.priceUsd / (pack.coins / COINS_PER_USD));

            return (
              <div
                key={pack.name}
                className={`relative rounded-2xl border border-white/10 bg-slate-900/70 p-4 md:p-5 shadow-lg shadow-slate-900/40 flex flex-col ${
                  pack.highlight ? "ring-2 ring-pink-500/70" : ""
                }`}
              >
                {pack.highlight && (
                  <span className="absolute -top-3 left-4 rounded-full bg-pink-500 px-3 py-1 text-[10px] font-semibold uppercase tracking-[0.2em] shadow-lg shadow-pink-500/50">
                    Más popular
                  </span>
                )}

                <h3 className="mt-1 text-lg font-semibold mb-1">{pack.name}</h3>
                <p className="text-xs text-slate-400 mb-3">{pack.description}</p>

                <div className="mb-3">
                  <p className="text-2xl font-bold">
                    {pack.coins.toLocaleString("es-HN")}{" "}
                    <span className="text-sm font-semibold text-pink-300">AC</span>
                  </p>
                  <p className="text-sm text-slate-300">
                    ≈ ${pack.priceUsd.toFixed(2)} USD
                  </p>
                  <p className="mt-1 text-[11px] text-slate-400">
                    ~ ${pricePer100Coins.toFixed(2)} por cada 100 AC
                  </p>
                </div>

                <div className="mt-auto rounded-xl bg-slate-950/70 border border-white/5 p-3 text-[11px] space-y-1">
                  <p className="text-slate-400 font-medium mb-1">
                    Cuando estas monedas se gastan:
                  </p>
                  <div className="flex items-center justify-between">
                    <span className="text-emerald-300">Creadora (50%)</span>
                    <span>≈ ${creatorUsd.toFixed(2)} USD</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sky-300">Plataforma (50%)</span>
                    <span>≈ ${platformUsd.toFixed(2)} USD</span>
                  </div>
                </div>

                <button className="mt-4 w-full rounded-full bg-pink-500 px-4 py-2 text-sm font-semibold text-white shadow-md shadow-pink-500/40 hover:bg-pink-400">
                  Comprar ahora (demo)
                </button>
              </div>
            );
          })}
        </div>

        {/* NOTA AL PIE */}
        <p className="mt-8 text-[11px] text-slate-500">
          *Esta página es una vista demo. Más adelante conectaremos los botones de compra
          con un proveedor de pagos (por ejemplo, PayPal) y guardaremos el saldo de
          Activacel Coins de cada usuario en la base de datos.
        </p>
      </section>
    </main>
  );
}
