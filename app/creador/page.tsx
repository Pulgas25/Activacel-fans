const COINS_PER_USD = 100;

// Datos de ejemplo de una creadora
const CREATOR_DATA = {
  name: "Creadora Demo",
  coinsDisponibles: 8200, // coins que puede retirar
  coinsPendientes: 1200,  // coins en revisión / por confirmar
  coinsHistorico: 32000,  // total ganado en toda la vida
};

const HISTORIAL = [
  {
    id: "txn_001",
    tipo: "Suscripción Diamante",
    fan: "Usuario123",
    coinsTotales: 4000,
    coinsCreadora: 2000,
    coinsPlataforma: 2000,
    fecha: "02/12/2025",
  },
  {
    id: "txn_002",
    tipo: "Videollamada 20 min",
    fan: "FanVIP01",
    coinsTotales: 600,
    coinsCreadora: 300,
    coinsPlataforma: 300,
    fecha: "01/12/2025",
  },
  {
    id: "txn_003",
    tipo: "Suscripción Oro",
    fan: "CarlosHND",
    coinsTotales: 2000,
    coinsCreadora: 1000,
    coinsPlataforma: 1000,
    fecha: "30/11/2025",
  },
];

function coinsToUsd(coins: number) {
  return coins / COINS_PER_USD;
}

export default function CreadorDashboardPage() {
  const dispUsd = coinsToUsd(CREATOR_DATA.coinsDisponibles);
  const pendUsd = coinsToUsd(CREATOR_DATA.coinsPendientes);
  const histUsd = coinsToUsd(CREATOR_DATA.coinsHistorico);

  return (
    <main className="min-h-screen bg-gradient-to-b from-slate-950 to-slate-900 text-white">
      {/* HEADER */}
      <header className="border-b border-white/10">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-4">
          <div className="text-xl font-bold tracking-tight">
            Activacel <span className="text-pink-500">Fans</span>
          </div>

          <nav className="hidden gap-4 text-sm text-slate-200 md:flex">
            <a href="/" className="hover:text-pink-400">
              Inicio
            </a>
            <a href="/monedas" className="hover:text-pink-400">
              Monedas
            </a>
            <span className="text-pink-400 font-semibold">
              Panel Creadora
            </span>
          </nav>
        </div>
      </header>

      {/* CONTENIDO */}
      <section className="mx-auto max-w-6xl px-4 py-10 md:py-14 space-y-8">
        {/* ENCABEZADO */}
        <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.25em] text-pink-400 mb-1">
              Panel de creadora
            </p>
            <h1 className="text-3xl md:text-4xl font-bold leading-tight">
              Ingresos con Activacel Coins
            </h1>
            <p className="text-sm text-slate-300 mt-2 max-w-2xl">
              Aquí puedes ver tus ganancias en monedas, el equivalente aproximado
              en dólares y el historial de suscripciones y videollamadas.
              El reparto está configurado al{" "}
              <span className="font-semibold text-emerald-300">50% creadora</span>{" "}
              y <span className="font-semibold text-sky-300">50% plataforma</span>.
            </p>
          </div>

          <div className="rounded-2xl bg-slate-900/70 border border-white/10 px-4 py-3 text-xs text-slate-300 max-w-xs">
            <p className="font-semibold mb-1 text-white">
              {CREATOR_DATA.name}
            </p>
            <p>Modelo de reparto: 50% / 50%</p>
            <p className="mt-1 text-slate-400">
              *Más adelante podrás cambiar esto con acuerdos especiales.
            </p>
          </div>
        </div>

        {/* CARDS DE SALDO */}
        <div className="grid gap-4 md:grid-cols-3">
          <div className="rounded-2xl bg-slate-900/80 border border-emerald-500/30 p-4 shadow-lg shadow-emerald-500/20">
            <p className="text-xs font-semibold text-emerald-300 mb-1">
              Saldo disponible
            </p>
            <p className="text-2xl font-bold mb-1">
              {CREATOR_DATA.coinsDisponibles.toLocaleString("es-HN")}{" "}
              <span className="text-sm text-emerald-300">AC</span>
            </p>
            <p className="text-sm text-slate-300">
              ≈ ${dispUsd.toFixed(2)} USD
            </p>
            <p className="mt-2 text-[11px] text-slate-400">
              Este es el saldo que puedes solicitar para retiro. El pago se
              realiza de forma manual (transferencia, PayPal, etc.).
            </p>
          </div>

          <div className="rounded-2xl bg-slate-900/80 border border-amber-400/30 p-4 shadow-lg shadow-amber-400/20">
            <p className="text-xs font-semibold text-amber-300 mb-1">
              Monedas en revisión
            </p>
            <p className="text-2xl font-bold mb-1">
              {CREATOR_DATA.coinsPendientes.toLocaleString("es-HN")}{" "}
              <span className="text-sm text-amber-300">AC</span>
            </p>
            <p className="text-sm text-slate-300">
              ≈ ${pendUsd.toFixed(2)} USD
            </p>
            <p className="mt-2 text-[11px] text-slate-400">
              Monedas recientes de suscripciones o llamadas que aún están en
              ventana de seguridad. Se sumarán al saldo disponible cuando se confirmen.
            </p>
          </div>

          <div className="rounded-2xl bg-slate-900/80 border border-slate-500/40 p-4 shadow-lg shadow-slate-900/40">
            <p className="text-xs font-semibold text-slate-300 mb-1">
              Total ganado (histórico)
            </p>
            <p className="text-2xl font-bold mb-1">
              {CREATOR_DATA.coinsHistorico.toLocaleString("es-HN")}{" "}
              <span className="text-sm text-slate-300">AC</span>
            </p>
            <p className="text-sm text-slate-300">
              ≈ ${histUsd.toFixed(2)} USD
            </p>
            <p className="mt-2 text-[11px] text-slate-400">
              Suma total de todas tus suscripciones, videollamadas y compras
              de contenido desde que creaste tu cuenta.
            </p>
          </div>
        </div>

        {/* BOTÓN DE RETIRO */}
        <div className="flex flex-col gap-2 md:flex-row md:items-center md:justify-between mt-2">
          <p className="text-xs text-slate-400">
            *En esta fase demo, el botón de retiro no envía nada. Más adelante lo
            conectaremos con el backend y el panel de administración para que puedas
            pedir retiros reales.
          </p>

          <button className="rounded-full bg-pink-500 px-6 py-2 text-sm font-semibold shadow-lg shadow-pink-500/40 hover:bg-pink-400">
            Solicitar retiro (demo)
          </button>
        </div>

        {/* HISTORIAL DE TRANSACCIONES */}
        <div className="mt-6 rounded-2xl bg-slate-950/70 border border-white/10 p-4 md:p-5">
          <h2 className="text-base md:text-lg font-semibold mb-3">
            Historial de suscripciones y videollamadas
          </h2>
          <div className="overflow-x-auto">
            <table className="min-w-full text-xs md:text-sm border-separate border-spacing-y-1">
              <thead className="text-slate-300">
                <tr>
                  <th className="text-left py-2 pr-3">Fecha</th>
                  <th className="text-left py-2 pr-3">Tipo</th>
                  <th className="text-left py-2 pr-3">Fan</th>
                  <th className="text-right py-2 pr-3">Total (AC)</th>
                  <th className="text-right py-2 pr-3">Para ti (AC)</th>
                  <th className="text-right py-2 pr-3">Plataforma (AC)</th>
                </tr>
              </thead>
              <tbody>
                {HISTORIAL.map((item) => (
                  <tr key={item.id} className="text-slate-200">
                    <td className="py-2 pr-3 text-slate-400">{item.fecha}</td>
                    <td className="py-2 pr-3">{item.tipo}</td>
                    <td className="py-2 pr-3 text-slate-300">{item.fan}</td>
                    <td className="py-2 pr-3 text-right">
                      {item.coinsTotales.toLocaleString("es-HN")}
                    </td>
                    <td className="py-2 pr-3 text-right text-emerald-300">
                      {item.coinsCreadora.toLocaleString("es-HN")}
                    </td>
                    <td className="py-2 pr-3 text-right text-sky-300">
                      {item.coinsPlataforma.toLocaleString("es-HN")}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>
    </main>
  );
}
