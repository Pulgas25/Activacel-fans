"use client";

import { supabase } from "@/lib/supabaseClient";
import { PremiumFeed } from "@/app/components/PremiumFeed";

export default function FeedPage() {
  return (
    <div className="min-h-screen bg-black text-white">
      <PremiumFeed supabase={supabase} />
    </div>
  );
}
