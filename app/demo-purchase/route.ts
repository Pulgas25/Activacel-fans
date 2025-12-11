// app/api/coins/demo-purchase/route.ts
import { NextResponse } from "next/server";
import { supabase } from "@/lib/supabaseClient";

// Paquetes disponibles: deben coincidir con lo que muestras en la página
const PACKAGES = {
  starter: { id: "starter", label: "Starter", coins: 500, usd: 4.99 },
  popular: { id: "popular", label: "Popular", coins: 1100, usd: 9.99 },
  pro: { id: "pro", label: "Pro", coins: 3000, usd: 24.99 },
  ultra: { id: "ultra", label: "Ultra Fan", coins: 6500, usd: 49.99 },
} as const;

type Role = "fan" | "creator" | "platform";

async function getOrCreateWallet(userRef: string, role: Role) {
  // Buscar si ya existe
  const { data, error } = await supabase
    .from("wallets")
    .select("*")
    .eq("user_ref", userRef)
    .eq("role", role);

  if (error) {
    throw error;
  }

  if (data && data.length > 0) {
    return data[0];
  }

  // Si no existe, la creamos con balance 0
  const { data: inserted, error: insertError } = await supabase
    .from("wallets")
    .insert({ user_ref: userRef, role, balance_coins: 0 })
    .select()
    .single();

  if (insertError) {
    throw insertError;
  }

  return inserted;
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const pkg =
      PACKAGES[body.packageId as keyof typeof PACKAGES];

    if (!pkg) {
      return NextResponse.json(
        { error: "Paquete inválido" },
        { status: 400 }
      );
    }

    // Por ahora usamos un usuario demo fijo
    const fanRef = "demo-fan-1";

    const fanWallet = await getOrCreateWallet(fanRef, "fan");

    const newBalance = (fanWallet.balance_coins || 0) + pkg.coins;

    // Actualizar saldo de la billetera
    const { data: updatedWallet, error: updateError } = await supabase
      .from("wallets")
      .update({ balance_coins: newBalance })
      .eq("id", fanWallet.id)
      .select()
      .single();

    if (updateError) {
      throw updateError;
    }

    // Registrar movimiento en coin_transactions (tipo "buy")
    await supabase.from("coin_transactions").insert({
      wallet_id: fanWallet.id,
      tx_type: "buy",
      coins: pkg.coins,
      usd_amount: pkg.usd,
      description: `Compra demo paquete ${pkg.label}`,
    });

    return NextResponse.json({
      ok: true,
      package: pkg.label,
      newBalance: updatedWallet?.balance_coins ?? newBalance,
    });
  } catch (error) {
    console.error("Error en demo-purchase:", error);
    return NextResponse.json(
      { error: "No se pudo procesar la compra demo" },
      { status: 500 }
    );
  }
}
