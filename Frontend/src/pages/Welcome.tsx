import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import welcomeHeroImg from "../assets/img/welcome_hero.png";

const Welcome: React.FC = () => {
  const navigate = useNavigate();
  const { isLoggedIn, isLoading } = useAuth();
  useEffect(() => {
    if (!isLoading && isLoggedIn) {
      navigate("/");
    }
  }, [isLoggedIn, isLoading, navigate]);

  if (isLoading) {
    return null;
  }

  return (
    <main className="flex-grow bg-background font-body-md text-on-background">
      <section className="relative w-full min-h-[420px] sm:min-h-[560px] md:h-[751px] overflow-hidden">
        <div className="absolute inset-0 bg-stone-900/40 z-10" />
        <img
          alt="Architectural Brickwork"
          className="w-full h-full object-cover absolute inset-0"
          src={welcomeHeroImg}
        />
        <div className="relative z-20 flex flex-col justify-center items-start px-4 sm:px-8 md:px-16 py-12 md:py-0 md:absolute md:inset-0">
          <div className="w-full bg-white/95 p-5 sm:p-10 md:p-16 border-l-[6px] sm:border-l-[12px] border-primary">
            <h2 className="font-headline-xl text-2xl sm:text-4xl md:text-headline-xl text-stone-900 mb-4 sm:mb-6 uppercase leading-tight">
              Architectural Excellence in Every Unit.
            </h2>
            <p className="font-body-lg text-sm sm:text-base md:text-body-lg text-secondary mb-6 sm:mb-12 max-w-2xl">
              Providing master-crafted ceramic solutions for contemporary
              architectural landmarks. Our bricks are engineered for endurance,
              precision, and the raw honesty of natural clay.
            </p>
            <div className="flex gap-4 sm:gap-6">
              <button
                onClick={() => navigate("/auth")}
                className="bg-primary text-on-primary font-label-caps text-xs uppercase tracking-widest px-6 sm:px-12 py-4 sm:py-6 hover:bg-primary-container cursor-pointer transition-all active:translate-y-0.5 border-b-4"
              >
                ENTER STORE
              </button>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
};

export default Welcome;
