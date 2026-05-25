import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import jesusBoy from "@/assets/jesus-boy.png";
import jesusGirl from "@/assets/jesus-girl.png";

export const Route = createFileRoute("/")({
  component: Index,
  head: () => ({
    meta: [
      { title: "A Love Letter From God" },
      {
        name: "description",
        content:
          "Open a love letter written for you by God. A gentle reminder of His everlasting love.",
      },
    ],
  }),
});

function FloatingHeart({ left, delay, size }: { left: string; delay: string; size: number }) {
  return (
    <span
      className="pointer-events-none absolute bottom-0 select-none opacity-70"
      style={{
        left,
        animation: `floatUp 9s linear ${delay} infinite`,
        fontSize: size,
      }}
    >
      💗
    </span>
  );
}

function Index() {
  const [opened, setOpened] = useState(false);
  const [showLetter, setShowLetter] = useState(false);

  const handleOpen = () => {
    if (opened) return;
    setOpened(true);
    setTimeout(() => setShowLetter(true), 900);
  };

  return (
    <main className="relative min-h-screen overflow-x-hidden bg-gradient-to-br from-rose-100 via-pink-50 to-amber-50">
      <style>{`
        @keyframes floatUp {
          0% { transform: translateY(0) rotate(0); opacity: 0; }
          10% { opacity: 0.8; }
          100% { transform: translateY(-110vh) rotate(360deg); opacity: 0; }
        }
        @keyframes softPulse {
          0%,100% { transform: scale(1); filter: drop-shadow(0 10px 30px rgba(244,114,182,.35)); }
          50% { transform: scale(1.04); filter: drop-shadow(0 18px 45px rgba(244,114,182,.55)); }
        }
        @keyframes flapOpen {
          0% { transform: rotateX(0deg); }
          100% { transform: rotateX(-180deg); }
        }
        @keyframes letterRise {
          0% { transform: translateY(20px) scale(.6); opacity: 0; }
          100% { transform: translateY(-160px) scale(1); opacity: 1; }
        }
        @keyframes sway {
          0%,100% { transform: translateY(0) rotate(-2deg); }
          50% { transform: translateY(-10px) rotate(2deg); }
        }
        @keyframes fadeUp {
          from { opacity: 0; transform: translateY(20px); }
          to { opacity: 1; transform: translateY(0); }
        }
      `}</style>

      {/* Floating hearts */}
      <div className="pointer-events-none fixed inset-0 z-0">
        {[
          { l: "5%", d: "0s", s: 22 },
          { l: "15%", d: "2s", s: 16 },
          { l: "28%", d: "4s", s: 28 },
          { l: "42%", d: "1s", s: 18 },
          { l: "58%", d: "3s", s: 24 },
          { l: "72%", d: "5s", s: 20 },
          { l: "85%", d: "2.5s", s: 26 },
          { l: "92%", d: "6s", s: 18 },
        ].map((h, i) => (
          <FloatingHeart key={i} left={h.l} delay={h.d} size={h.s} />
        ))}
      </div>

      {/* Hero */}
      <section className="relative z-10 flex min-h-screen flex-col items-center justify-center px-4 py-12">
        <div className="mb-6 text-center" style={{ animation: "fadeUp .8s ease both" }}>
          <p className="mb-2 text-sm font-medium uppercase tracking-[0.3em] text-rose-500">
            For you, beloved
          </p>
          <h1 className="bg-gradient-to-r from-rose-500 via-pink-500 to-amber-500 bg-clip-text font-serif text-4xl font-bold text-transparent sm:text-6xl">
            A Love Letter From God
          </h1>
          <p className="mx-auto mt-3 max-w-md text-base text-rose-700/70 sm:text-lg">
            Tap the envelope to read what your Father has been longing to tell you.
          </p>
        </div>

        {/* Doodles */}
        <img
          src={jesusBoy}
          alt="Jesus hugging a child"
          className="pointer-events-none absolute left-2 top-24 hidden h-44 w-44 opacity-90 md:block lg:h-56 lg:w-56"
          style={{ animation: "sway 6s ease-in-out infinite" }}
        />
        <img
          src={jesusGirl}
          alt="Jesus hugging a child with flowers"
          className="pointer-events-none absolute right-2 top-24 hidden h-44 w-44 opacity-90 md:block lg:h-56 lg:w-56"
          style={{ animation: "sway 7s ease-in-out infinite reverse" }}
        />

        {/* Envelope */}
        <div className="relative mt-6 flex h-[360px] w-full max-w-md items-end justify-center">
          {/* Letter that rises out */}
          <div
            className="absolute bottom-12 z-10 h-56 w-[90%] rounded-md bg-gradient-to-b from-white to-rose-50 p-5 text-center shadow-2xl"
            style={{
              transformOrigin: "bottom center",
              animation: opened ? "letterRise 1s ease-out .4s both" : "none",
              opacity: opened ? undefined : 0,
            }}
          >
            <div className="font-serif text-2xl text-rose-600">My Beloved Child,</div>
            <p className="mt-3 px-2 text-sm leading-relaxed text-rose-900/70">
              I have loved you with an everlasting love. Come, read what My heart has written for you…
            </p>
            <div className="mt-4 text-3xl">💖</div>
          </div>

          {/* Envelope body */}
          <button
            onClick={handleOpen}
            aria-label="Open the love letter"
            className="group relative h-56 w-[90%] cursor-pointer rounded-md bg-gradient-to-b from-rose-400 to-rose-500 shadow-[0_20px_60px_-15px_rgba(244,63,94,0.6)] transition-transform hover:scale-[1.02] focus:outline-none focus:ring-4 focus:ring-rose-300"
            style={{ animation: opened ? "none" : "softPulse 2.6s ease-in-out infinite" }}
          >
            {/* Front flap (bottom triangles via clip) */}
            <div
              className="absolute inset-0 rounded-md"
              style={{
                background:
                  "linear-gradient(135deg, #fb7185 0%, #f43f5e 50%, #e11d48 100%)",
                clipPath: "polygon(0 100%, 100% 100%, 100% 40%, 50% 90%, 0 40%)",
              }}
            />
            {/* Wax seal */}
            {!opened && (
              <div className="absolute left-1/2 top-1/2 z-20 -translate-x-1/2 -translate-y-1/2 transform">
                <div className="flex h-16 w-16 items-center justify-center rounded-full bg-gradient-to-br from-amber-300 to-rose-600 text-2xl shadow-lg ring-4 ring-rose-100/40">
                  ✝
                </div>
              </div>
            )}
            {/* Top flap - the one that opens */}
            <div
              className="absolute inset-x-0 top-0 z-30 origin-top h-full"
              style={{
                clipPath: "polygon(0 0, 100% 0, 50% 60%)",
                background:
                  "linear-gradient(135deg, #fda4af 0%, #fb7185 50%, #f43f5e 100%)",
                transformStyle: "preserve-3d",
                transform: opened ? "rotateX(-180deg)" : "rotateX(0deg)",
                transition: "transform .9s ease-in-out",
                backfaceVisibility: "hidden",
              }}
            />
            {!opened && (
              <span className="absolute bottom-3 left-1/2 z-40 -translate-x-1/2 whitespace-nowrap rounded-full bg-white/90 px-3 py-1 text-xs font-medium text-rose-600 shadow">
                Tap to open ✨
              </span>
            )}
          </button>
        </div>

        {!showLetter && (
          <p className="mt-10 text-sm italic text-rose-500/70">
            "See what great love the Father has lavished on us…" — 1 John 3:1
          </p>
        )}
      </section>

      {/* PDF Letter */}
      {showLetter && (
        <section
          className="relative z-10 px-4 pb-20"
          style={{ animation: "fadeUp 1s ease both" }}
        >
          <div className="mx-auto max-w-4xl">
            <div className="mb-6 text-center">
              <h2 className="font-serif text-3xl font-bold text-rose-600 sm:text-4xl">
                Read His Letter to You 💌
              </h2>
              <p className="mt-2 text-rose-700/70">
                Take a quiet moment. Let every word reach your heart.
              </p>
            </div>
            <div className="overflow-hidden rounded-2xl border-4 border-rose-200 bg-white shadow-2xl">
              <iframe
                src="/love-letter.pdf"
                title="A Love Letter From God"
                className="h-[80vh] w-full"
              />
            </div>
            <div className="mt-4 flex flex-wrap justify-center gap-3">
              <a
                href="/love-letter.pdf"
                download
                className="rounded-full bg-rose-500 px-6 py-3 text-sm font-medium text-white shadow-lg transition hover:bg-rose-600"
              >
                Download Letter
              </a>
              <a
                href="/love-letter.pdf"
                target="_blank"
                rel="noopener noreferrer"
                className="rounded-full border-2 border-rose-400 bg-white px-6 py-3 text-sm font-medium text-rose-600 shadow-lg transition hover:bg-rose-50"
              >
                Open in New Tab
              </a>
            </div>
          </div>
        </section>
      )}

      {/* Feedback */}
      <section className="relative z-10 px-4 pb-16">
        <div className="mx-auto max-w-2xl rounded-3xl bg-gradient-to-br from-rose-500 to-pink-500 p-8 text-center text-white shadow-2xl sm:p-12">
          <div className="mb-3 text-4xl">🙏</div>
          <h3 className="font-serif text-2xl font-bold sm:text-3xl">
            How did His letter touch you?
          </h3>
          <p className="mx-auto mt-3 max-w-md text-white/90">
            We'd love to hear your heart. Share your feedback and stay connected.
          </p>
          <a
            href="https://forms.gle/7a9VARjvTUN6j2gF6"
            target="_blank"
            rel="noopener noreferrer"
            className="mt-6 inline-block rounded-full bg-white px-8 py-3 text-sm font-semibold text-rose-600 shadow-lg transition hover:scale-105"
          >
            Share Your Feedback →
          </a>
        </div>
      </section>

      <footer className="relative z-10 pb-8 text-center text-sm text-rose-500/60">
        Made with 💗 to spread God's love · Share freely
      </footer>
    </main>
  );
}
