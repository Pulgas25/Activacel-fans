"use client";
import React, { useEffect, useState } from "react";
import type { SupabaseClient } from "@supabase/supabase-js";

type PremiumFeedProps = {
  supabase: SupabaseClient;
  limit?: number;
};

type PostRow = {
  id: string;
  creator_id: string;
  title: string | null;
  content: string | null;
  media_url: string | null;
  coin_price: number | null;
  is_published: boolean;
  created_at: string;
};

type UnlockMap = Record<string, boolean>;

function isVideoUrl(url?: string | null) {
  const u = (url ?? "").toLowerCase();
  return u.endsWith(".mp4") || u.includes("video");
}

export const PremiumFeed: React.FC<PremiumFeedProps> = ({
  supabase,
  limit = 30,
}) => {
  const [loading, setLoading] = useState(true);
  const [posts, setPosts] = useState<PostRow[]>([]);
  const [unlockedMap, setUnlockedMap] = useState<UnlockMap>({});
  const [busyPostId, setBusyPostId] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  const loadPosts = async () => {
    setLoading(true);
    setError(null);

    const { data, error } = await supabase
      .from("posts")
      .select(
        "id, creator_id, title, content, media_url, coin_price, is_published, created_at"
      )
      .eq("is_published", true)
      .order("created_at", { ascending: false })
      .limit(limit);

    if (error) {
      setError(error.message);
      setPosts([]);
      setLoading(false);
      return;
    }

    setPosts((data || []) as PostRow[]);
    setLoading(false);
  };

  const loadUnlockStates = async (rows: PostRow[]) => {
    const paid = rows.filter((p) => (p.coin_price ?? 0) > 0);
    if (paid.length === 0) {
      setUnlockedMap({});
      return;
    }

    const pairs = await Promise.all(
      paid.map(async (p) => {
        const { data, error } = await supabase.rpc("is_post_unlocked", {
          p_post_id: p.id,
        });

        if (error) return [p.id, false] as const;
        return [p.id, Boolean(data)] as const;
      })
    );

    const map: UnlockMap = {};
    for (const [id, unlocked] of pairs) map[id] = unlocked;
    setUnlockedMap(map);
  };

  useEffect(() => {
    loadPosts();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [limit]);

  useEffect(() => {
    if (!loading) loadUnlockStates(posts);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [loading, posts.length]);

  const handleUnlock = async (post: PostRow) => {
    setError(null);
    setBusyPostId(post.id);

    const { error } = await supabase.rpc("unlock_post", {
      p_post_id: post.id,
    });

    if (error) {
      setError(error.message);
      setBusyPostId(null);
      return;
    }

    setUnlockedMap((prev) => ({ ...prev, [post.id]: true }));
    setBusyPostId(null);
  };

  const renderMedia = (post: PostRow, locked: boolean) => {
    if (!post.media_url) return null;

    const commonClass =
      "w-full rounded-xl border border-slate-800 bg-slate-950";

    if (isVideoUrl(post.media_url)) {
      return (
        <div className="relative">
          <video
            className={`${commonClass} ${locked ? "blur-md" : ""}`}
            src={post.media_url}
            controls={!locked}
            muted={locked}
          />
          {locked && (
            <div className="absolute inset-0 rounded-xl bg-black/35" />
          )}
        </div>
      );
    }

    return (
      <div className="relative">
        <img
          className={`${commonClass} object-cover max-h-[520px] ${
            locked ? "blur-md" : ""
          }`}
          src={post.media_url}
          alt={post.title ?? "post"}
        />
        {locked && <div className="absolute inset-0 rounded-xl bg-black/35" />}
      </div>
    );
  };

  return (
    <div className="max-w-3xl mx-auto px-4 md:px-6 py-6 space-y-5">
      <div className="flex items-center justify-between">
        <h2 className="text-xl md:text-2xl font-bold">
          Feed Premium · Activacel Fans
        </h2>
        <button
          onClick={loadPosts}
          className="text-xs px-3 py-2 rounded-lg bg-slate-900 border border-slate-700 hover:bg-slate-800 transition"
        >
          Actualizar
        </button>
      </div>

      {error && (
        <div className="text-sm bg-red-500/10 border border-red-500 text-red-200 px-4 py-2 rounded-lg">
          {error}
        </div>
      )}

      {loading && (
        <div className="text-sm text-slate-400">Cargando publicaciones...</div>
      )}

      {!loading && posts.length === 0 && (
        <div className="text-sm text-slate-500">
          Aún no hay publicaciones publicadas.
        </div>
      )}

      <div className="space-y-4">
        {posts.map((post) => {
          const price = post.coin_price ?? 0;
          const isPaid = price > 0;
          const unlocked = isPaid ? Boolean(unlockedMap[post.id]) : true;
          const locked = isPaid && !unlocked;
          const isBusy = busyPostId === post.id;

          return (
            <div
              key={post.id}
              className="bg-slate-950/60 border border-slate-800 rounded-2xl p-4 space-y-3"
            >
              <div className="flex items-start justify-between gap-3">
                <div>
                  <p className="text-base font-semibold">
                    {post.title ?? "Publicación"}
                  </p>
                  <p className="text-[11px] text-slate-500">
                    {new Date(post.created_at).toLocaleString()}
                  </p>
                </div>

                {isPaid && (
                  <span className="text-[10px] px-2 py-1 rounded-full bg-amber-500/10 border border-amber-400 text-amber-200">
                    {price} coins
                  </span>
                )}
              </div>

              {renderMedia(post, locked)}

              <div>
                {locked ? (
                  <div className="space-y-2">
                    <div className="h-3 w-3/4 bg-slate-800 rounded" />
                    <div className="h-3 w-2/3 bg-slate-800 rounded" />
                    <div className="h-3 w-1/2 bg-slate-800 rounded" />
                  </div>
                ) : (
                  <p className="text-sm text-slate-200 whitespace-pre-line">
                    {post.content ?? ""}
                  </p>
                )}
              </div>

              {locked && (
                <div className="flex items-center justify-between gap-3 bg-black/30 border border-slate-800 rounded-xl p-3">
                  <div>
                    <p className="text-xs text-slate-300 font-medium">
                      Contenido premium
                    </p>
                    <p className="text-[11px] text-slate-500">
                      Desbloquea para ver el contenido completo.
                    </p>
                  </div>

                  <button
                    onClick={() => handleUnlock(post)}
                    disabled={isBusy}
                    className="text-xs px-3 py-2 rounded-lg bg-emerald-500 text-slate-900 font-semibold hover:bg-emerald-400 disabled:opacity-60 disabled:cursor-not-allowed transition"
                  >
                    {isBusy ? "Desbloqueando..." : `Desbloquear (${price})`}
                  </button>
                </div>
              )}

              {isPaid && unlocked && (
                <div className="flex">
                  <span className="text-[10px] px-2 py-1 rounded-full bg-emerald-500/10 border border-emerald-400 text-emerald-200">
                    Desbloqueado
                  </span>
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
};
