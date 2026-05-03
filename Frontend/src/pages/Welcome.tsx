import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { ICON_STYLE } from "../lib/utils";
import { IMG_WELCOME_HERO, IMG_WELCOME_TEXTURE, IMG_WELCOME_INTERIOR } from "../lib/constants";


interface StatBadgeProps {
  icon: string;
  label: string;
  value: string;
}

const StatBadge: React.FC<StatBadgeProps> = ({ icon, label, value }) => (
  <div className="bg-surface-container border border-slate-300 p-md flex items-center gap-md">
    <span
      className="material-symbols-outlined text-primary"
      style={ICON_STYLE}
    >
      {icon}
    </span>
    <div>
      <div className="font-label-caps text-[10px] text-secondary uppercase tracking-widest">
        {label}
      </div>
      <div className="font-headline-md text-stone-900">{value}</div>
    </div>
  </div>
);

interface SpecRowProps {
  label: string;
  value: string;
}

const SpecRow: React.FC<SpecRowProps> = ({ label, value }) => (
  <div className="flex justify-between border-b border-slate-300 py-base">
    <span className="font-label-caps text-stone-600 uppercase tracking-widest text-xs">
      {label}
    </span>
    <span className="font-sans font-bold">{value}</span>
  </div>
);

const Welcome: React.FC = () => {
  const navigate = useNavigate();
  const { isLoggedIn } = useAuth();

  useEffect(() => {
    if (isLoggedIn) {
      navigate("/");
    }
  }, [isLoggedIn, navigate]);

  return (
    <main className="flex-grow bg-background font-body-md text-on-background">
      {/* Hero Section */}
      <section className="relative w-full min-h-[420px] sm:min-h-[560px] md:h-[751px] overflow-hidden">
        <div className="absolute inset-0 bg-stone-900/40 z-10" />
        <img
          alt="Architectural Brickwork"
          className="w-full h-full object-cover absolute inset-0"
          src={IMG_WELCOME_HERO}
        />
        <div className="relative z-20 flex flex-col justify-center items-start px-4 sm:px-8 md:px-16 py-12 md:py-0 md:absolute md:inset-0">
          <div className="w-full bg-white/95 p-5 sm:p-10 md:p-16 border-l-[6px] sm:border-l-[12px] border-primary">
            <p className="font-label-caps text-xs text-primary mb-3 uppercase tracking-widest">
              ESTABLISHED 1924
            </p>
            <h2 className="font-headline-xl text-2xl sm:text-4xl md:text-headline-xl text-stone-900 mb-4 sm:mb-6 uppercase leading-tight">
              Architectural Excellence in Every Kiln-Fired Unit.
            </h2>
            <p className="font-body-lg text-sm sm:text-base md:text-body-lg text-secondary mb-6 sm:mb-12 max-w-2xl">
              Providing master-crafted ceramic solutions for contemporary
              architectural landmarks. Our bricks are engineered for endurance,
              precision, and the raw honesty of natural clay.
            </p>
            <div className="flex gap-4 sm:gap-6">
              <button 
                onClick={() => navigate('/auth')}
                className="bg-primary text-on-primary font-label-caps text-xs uppercase tracking-widest px-6 sm:px-12 py-4 sm:py-6 hover:bg-primary-container transition-all active:translate-y-0.5 border-b-4 border-stone-900">
                ENTER STORE
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Material Focus Grid */}
      <section className="py-10 sm:py-16 md:py-20 px-4 sm:px-8 md:px-16 max-w-[1440px] mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
          {/* Large Feature */}
          <div className="md:col-span-8 bg-stone-100 border border-slate-300 p-6 sm:p-10 md:p-12 flex flex-col justify-between min-h-[280px] sm:min-h-[340px] md:min-h-[400px]">
            <div>
              <span
                className="material-symbols-outlined text-primary mb-3 block"
                style={{ fontSize: 48, ...ICON_STYLE }}
              >
                texture
              </span>
              <h3 className="font-headline-lg text-xl sm:text-2xl md:text-headline-lg text-stone-900 mb-2 uppercase">
                Granular Detail
              </h3>
              <p className="font-body-md text-body-md text-secondary max-w-md">
                Our specialized firing process creates unique textures that
                catch light and shadow, defining the rhythm of modern facades.
              </p>
            </div>
            <div className="mt-8 sm:mt-12">
              <img
                alt="Texture Detail"
                className="w-full h-40 sm:h-48 object-cover border-b-4 border-primary"
                src={IMG_WELCOME_TEXTURE}
              />
            </div>
          </div>

          {/* Vertical Feature */}
          <div className="md:col-span-4 bg-stone-900 text-stone-100 border border-slate-700 p-8 sm:p-12 flex flex-col justify-center items-center text-center">
            <span
              className="material-symbols-outlined text-primary mb-6 block"
              style={{ fontSize: 64, ...ICON_STYLE }}
            >
              precision_manufacturing
            </span>
            <h3 className="font-headline-md text-xl md:text-headline-md mb-2 uppercase">
              Industrial Precision
            </h3>
            <p className="font-body-md text-stone-400 mb-8 sm:mb-12">
              Zero-tolerance manufacturing for architects who demand structural
              perfection and aesthetic consistency.
            </p>
            <hr className="w-16 border-primary border-2 mb-8 sm:mb-12" />
            <div className="font-label-caps text-xs uppercase tracking-widest">
              CERTIFIED ASTM C216
            </div>
          </div>

          {/* Stats Row */}
          <div className="col-span-1 md:col-span-12 grid grid-cols-1 sm:grid-cols-3 gap-4 sm:gap-6 mt-2 sm:mt-6">
            <StatBadge icon="history" label="LEGACY" value="100+ Years" />
            <StatBadge icon="eco" label="SUSTAINABLE" value="100% Recyclable" />
            <StatBadge
              icon="public"
              label="GLOBAL REACH"
              value="50 Countries"
            />
          </div>
        </div>
      </section>

      {/* Material Honesty Section */}
      <section className="bg-stone-50 py-10 sm:py-16 md:py-20 px-4 sm:px-8 md:px-16 border-y border-slate-200">
        <div className="flex flex-col md:flex-row items-center gap-8 sm:gap-12 md:gap-20">
          <div className="w-full md:w-1/2">
            <img
              alt="Architectural Application"
              className="w-full aspect-square object-cover shadow-2xl border-stone-300 border"
              src={IMG_WELCOME_INTERIOR}
            />
          </div>
          <div className="w-full md:w-1/2">
            <h2 className="font-headline-xl text-headline-xl text-stone-900 mb-6 uppercase">
              Material Honesty
            </h2>
            <p className="font-body-lg text-body-lg text-secondary mb-12">
              We believe in the inherent beauty of the material. Our ceramic
              units are not just building blocks; they are the skin and soul of
              the structure.
            </p>
            <div className="space-y-3">
              <SpecRow label="COMPRESSIVE STRENGTH" value="12,000 PSI" />
              <SpecRow label="WATER ABSORPTION" value="< 3.0%" />
              <SpecRow label="DENSITY" value="135 LB/FT³" />
            </div>
          </div>
        </div>
      </section>
    </main>
  );
};

export default Welcome;
