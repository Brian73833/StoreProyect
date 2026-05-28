import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { ICON_STYLE } from "../lib/utils";
import { IMG_HOME_CATALOG, IMG_HOME_TERRA } from "../lib/constants";interface StatItemProps {
  label: string;
  value: string;
  last?: boolean;
}

const StatItem: React.FC<StatItemProps> = ({ label, value, last = false }) => (
  <div
    className={`py-6 ${!last ? "border-b md:border-b-0" : ""} border-slate-200`}
  >
    <p className="font-label-caps text-xs text-secondary uppercase tracking-widest mb-1">
      {label}
    </p>
    <p className="font-headline-md text-2xl font-semibold">{value}</p>
  </div>
);const Home: React.FC = () => {
  const navigate = useNavigate();  const { user } = useAuth();
  const userName = user?.name;

  return (
    <main className="min-h-screen bg-background text-on-background font-body-md">      <section className="px-4 sm:px-8 md:px-16 py-10 sm:py-14 md:py-20 bg-surface-container-low border-b border-slate-300">
        <div className="max-w-7xl mx-auto">
          <p className="font-label-caps text-xs text-primary mb-3 uppercase tracking-widest">
            CLIENT PORTAL
          </p>
          <h2 className="font-headline-xl text-3xl sm:text-4xl md:text-5xl font-bold leading-tight tracking-tight text-on-surface mb-4 sm:mb-6">
            Bienvenido, {userName}
          </h2>
          <p className="font-body-lg text-base sm:text-xl text-secondary max-w-2xl mb-8 sm:mb-12 leading-relaxed">
            Access your personalized architectural resource hub. Track your
            ongoing projects, browse technical specifications, and manage your
            inventory with precision.
          </p>
          <div className="flex flex-wrap gap-4 sm:gap-6">            <button
              onClick={() => navigate("/products")}
              className="bg-primary text-on-primary px-8 sm:px-12 py-3 font-label-caps text-xs uppercase tracking-widest
                         active:translate-y-0.5 transition-transform"
            >
              Catalog Access
            </button>
            <button
              className="border-2 border-stone-800 text-stone-800 px-8 sm:px-12 py-3 font-label-caps text-xs uppercase tracking-widest
                         hover:bg-stone-800 hover:text-white transition-all active:translate-y-0.5"
            >
              Contact Support
            </button>
          </div>
        </div>
      </section>      <section className="px-4 sm:px-8 md:px-16 py-10 sm:py-14 md:py-20">
        <div className="max-w-7xl mx-auto">
          <h3 className="font-label-caps text-xs text-secondary mb-8 sm:mb-12 uppercase tracking-widest">
            QUICK NAVIGATION
          </h3>

          <div className="grid grid-cols-1 md:grid-cols-12 gap-6">            <div className="md:col-span-8 bg-stone-100 border border-slate-300 border-b-[4px] border-b-stone-800 p-6 sm:p-10 md:p-12 flex flex-col justify-between min-h-[280px] sm:min-h-[340px] md:min-h-[400px] relative overflow-hidden group">
              <img
                alt="Premium terracotta bricks"
                className="absolute inset-0 w-full h-full object-cover opacity-20 group-hover:opacity-30 transition-opacity"
                src={IMG_HOME_CATALOG}
              />
              <div className="relative z-10">
                <span
                  className="material-symbols-outlined text-4xl text-primary mb-2 block"
                  style={ICON_STYLE}
                >
                  grid_view
                </span>
                <h4 className="font-headline-lg text-xl sm:text-2xl md:text-3xl font-semibold text-on-surface">
                  Product Catalog
                </h4>
                <p className="font-body-md text-base text-secondary mt-3 max-w-md">
                  Explore over 400 unique ceramic finishes and dimensions
                  tailored for modern structural requirements.
                </p>
              </div>
              <Link
                to="/products"
                className="relative z-10 font-label-caps text-xs text-primary flex items-center gap-2
                           hover:translate-x-2 transition-transform uppercase tracking-widest mt-6 md:mt-0"
              >
                VIEW COLLECTION{" "}
                <span
                  className="material-symbols-outlined text-base"
                  style={{
                    fontVariationSettings:
                      "'FILL' 0, 'wght' 400, 'GRAD' 0, 'opsz' 24",
                  }}
                >
                  arrow_forward
                </span>
              </Link>
            </div>            <div className="md:col-span-4 bg-tertiary-fixed border border-slate-300 border-b-[4px] border-b-tertiary p-6 sm:p-10 md:p-12 flex flex-col justify-between">
              <div>
                <span
                  className="material-symbols-outlined text-4xl text-tertiary mb-2 block"
                  style={ICON_STYLE}
                >
                  mail
                </span>
                <h4 className="font-headline-md text-xl sm:text-2xl font-semibold text-on-tertiary-fixed">
                  Expert Consultation
                </h4>
                <p className="font-body-md text-base text-on-tertiary-fixed-variant mt-3">
                  Schedule a technical review with our ceramic engineers for
                  your current project.
                </p>
              </div>
              <button
                className="bg-tertiary text-on-tertiary py-3 font-label-caps text-xs uppercase tracking-widest
                           active:translate-y-0.5 transition-transform w-full mt-8 sm:mt-12"
              >
                Request Call
              </button>
            </div>            <div className="md:col-span-4 bg-surface-container-high border border-slate-300 border-b-[4px] border-b-slate-500 p-6 sm:p-10 md:p-12 flex flex-col justify-between">
              <div>
                <span
                  className="material-symbols-outlined text-4xl text-secondary mb-2 block"
                  style={ICON_STYLE}
                >
                  history
                </span>
                <h4 className="font-headline-md text-xl sm:text-2xl font-semibold text-on-surface">
                  Recent Specs
                </h4>
                <p className="font-body-md text-base text-secondary mt-3">
                  Quick access to your most viewed technical data sheets and CAD
                  files.
                </p>
              </div>
              <Link
                to="/profile"
                className="font-label-caps text-xs text-secondary mt-8 sm:mt-12 hover:text-on-surface transition-colors uppercase tracking-widest"
              >
                OPEN PROFILE
              </Link>
            </div>            <div className="md:col-span-8 bg-stone-900 text-stone-100 p-6 sm:p-10 md:p-12 border-b-[4px] border-b-orange-800">
              <div className="flex flex-col md:flex-row gap-8 md:gap-12 items-center">
                <div className="flex-1">
                  <h4 className="font-headline-lg text-xl sm:text-2xl md:text-3xl font-semibold mb-3">
                    Featured: Terra Mater
                  </h4>
                  <p className="font-body-md text-base text-stone-400 mb-6">
                    Our new high-fire collection inspired by raw geological
                    formations. Limited availability for Q3 projects.
                  </p>
                  <button
                    onClick={() => navigate("/products")}
                    className="bg-orange-800 text-white px-6 py-3 font-label-caps text-xs uppercase tracking-widest
                               active:translate-y-0.5 transition-transform"
                  >
                    Explore Series
                  </button>
                </div>
                <div className="w-full md:w-1/3 aspect-square overflow-hidden bg-stone-800 flex-shrink-0">
                  <img
                    alt="Raw dark clay texture"
                    className="w-full h-full object-cover"
                    src={IMG_HOME_TERRA}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>      <section className="px-4 sm:px-8 md:px-16 py-10 sm:py-14 md:py-20 bg-stone-50 border-t-2 border-slate-200">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-end gap-4 mb-8 sm:mb-12">
            <div>
              <p className="font-label-caps text-xs text-primary uppercase tracking-widest mb-1">
                MANUFACTURING STANDARDS
              </p>
              <h3 className="font-headline-lg text-2xl sm:text-3xl font-semibold">
                Active Inventory Stats
              </h3>
            </div>
            <a
              href="#"
              className="font-label-caps text-xs text-secondary underline uppercase tracking-widest hover:text-on-surface transition-colors"
            >
              Full Report
            </a>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 border-t border-slate-300">
            <StatItem label="KILN TEMPERATURE" value="1,250°C" />
            <StatItem label="COMPRESSION STRENGTH" value="55 N/mm²" />
            <StatItem label="AVAILABLE SKU'S" value="1,420" />
            <StatItem label="LEAD TIME" value="12 Wks" last />
          </div>
        </div>
      </section>
    </main>
  );
};

export default Home;
