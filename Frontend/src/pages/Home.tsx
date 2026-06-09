import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { ICON_STYLE } from "../lib/utils";
import homeCatalogImg from "../assets/home-catalog.png";

const Home: React.FC = () => {
  const navigate = useNavigate();
  const { user } = useAuth();
  const userName = user?.name;

  return (
    <main className="min-h-screen bg-background text-on-background font-body-md">
      <section className="px-4 sm:px-8 md:px-16 py-8 sm:py-10 md:py-12 bg-surface-container-low border-b border-slate-300">
        <div className="max-w-7xl mx-auto">
          <p className="font-label-caps text-xs text-primary mb-2 uppercase tracking-widest">
            CLIENT PORTAL
          </p>
          <h2 className="font-headline-xl text-3xl sm:text-4xl font-bold leading-tight tracking-tight text-on-surface mb-3 sm:mb-4">
            Welcome, {userName}
          </h2>
          <p className="font-body-lg text-base sm:text-lg text-secondary max-w-2xl mb-4 sm:mb-6 leading-relaxed">
            Access your personalized architectural resource hub. Track your
            ongoing projects, browse technical specifications, and manage your
            inventory with precision.
          </p>
        </div>
      </section>
      <section className="px-4 sm:px-8 md:px-16 py-10 sm:py-14 md:py-20">
        <div className="max-w-7xl mx-auto">
          <h3 className="font-label-caps text-xs text-secondary mb-8 sm:mb-12 uppercase tracking-widest">
            QUICK NAVIGATION
          </h3>

          <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
            <div className="md:col-span-8 bg-stone-100 border border-slate-300 border-b-[4px] border-b-stone-800 p-6 sm:p-10 md:p-12 flex flex-col justify-between min-h-[280px] sm:min-h-[340px] md:min-h-[400px] relative overflow-hidden group">
              <img
                alt="Premium terracotta bricks"
                className="absolute inset-0 w-full h-full object-cover opacity-20 group-hover:opacity-30 transition-opacity"
                src={homeCatalogImg}
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
            </div>
            <div className="md:col-span-4 bg-tertiary-fixed border border-slate-300 border-b-[4px] border-b-tertiary p-6 sm:p-10 md:p-12 flex flex-col justify-between">
              <div>
                <span
                  className="material-symbols-outlined text-4xl text-tertiary mb-2 block"
                  style={ICON_STYLE}
                >
                  person
                </span>
                <h4 className="font-headline-md text-xl sm:text-2xl font-semibold text-on-tertiary-fixed">
                  My Profile
                </h4>
                <p className="font-body-md text-base text-on-tertiary-fixed-variant mt-3">
                  Manage your personal information, update security settings, and configure your account preferences.
                </p>
              </div>
              <button
                onClick={() => navigate("/profile")}
                className="bg-tertiary text-on-tertiary py-3 font-label-caps text-xs uppercase tracking-widest
                           active:translate-y-0.5 transition-transform w-full mt-8 sm:mt-12 cursor-pointer"
              >
                Go to Profile
              </button>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
};

export default Home;
