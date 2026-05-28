import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { getProductById, getImageUrl } from "../services/productService";
import type { Product } from "../models/responses/Product";
import { ICON_STYLE } from "../lib/utils";
import {
  IMG_DETAIL_GALLERY_MAIN,
  IMG_DETAIL_GALLERY_THUMB,
  IMG_DETAIL_THUMBS,
} from "../lib/constants";

interface SpecRowProps {
  label: string;
  value: string;
}

const SpecRow: React.FC<SpecRowProps> = ({ label, value }) => (
  <div className="flex justify-between py-3 border-b border-outline-variant/30">
    <span className="font-label-caps text-[10px] text-secondary uppercase tracking-widest">
      {label}
    </span>
    <span className="font-body-sm text-on-surface font-medium">{value}</span>
  </div>
);

const ProductDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [product, setProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [activeImg, setActiveImg] = useState<string>("");
  useEffect(() => {
    if (!id) return;

    const fetchProduct = async () => {
      try {
        setLoading(true);
        const data = await getProductById(id);
        setProduct(data);
        setActiveImg(getImageUrl(data.imagePath));
        setError(null);
      } catch (err) {
        setError("No se pudo cargar la información del producto.");
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchProduct();
  }, [id]);
  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-primary border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="font-label-caps text-xs text-secondary uppercase tracking-widest animate-pulse">
            Loading architectural details...
          </p>
        </div>
      </div>
    );
  }

  if (error || !product) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background px-6">
        <div className="text-center max-w-md">
          <span
            className="material-symbols-outlined text-error text-6xl mb-4"
            style={ICON_STYLE}
          >
            error_outline
          </span>
          <h2 className="font-headline-md text-2xl font-bold text-on-surface mb-2 uppercase">
            Product Not Found
          </h2>
          <p className="text-on-surface-variant mb-8">
            {error ||
              "The requested architectural piece is not available in our current catalog."}
          </p>
          <button
            onClick={() => navigate("/products")}
            className="bg-stone-900 text-white px-8 py-3 font-label-caps text-xs uppercase tracking-widest hover:bg-primary transition-colors"
          >
            Return to Collection
          </button>
        </div>
      </div>
    );
  }

  return (
    <main className="pt-8 pb-24 px-6 md:px-16 max-w-7xl mx-auto bg-background text-on-surface animate-fade-in">
      <nav className="mb-12 flex items-center justify-between">
        <button
          onClick={() => navigate("/products")}
          className="flex items-center gap-2 group transition-all"
        >
          <span
            className="material-symbols-outlined text-secondary text-sm group-hover:-translate-x-1 transition-transform"
            style={ICON_STYLE}
          >
            arrow_back
          </span>
          <span className="font-label-caps text-xs text-secondary uppercase tracking-widest group-hover:text-primary transition-colors">
            Back to Catalog
          </span>
        </button>
        <div className="hidden md:flex items-center gap-3 text-[10px] font-label-caps text-outline uppercase tracking-[0.2em]">
          <span>Home</span>
          <span className="w-1 h-1 bg-outline-variant rounded-full"></span>
          <span>{product.categoryName || "General"}</span>
          <span className="w-1 h-1 bg-outline-variant rounded-full"></span>
          <span className="text-primary font-bold">{product.name}</span>
        </div>
      </nav>

      <div className="grid grid-cols-12 gap-8 lg:gap-16">
        <div className="col-span-12 lg:col-span-7 animate-slide-up">
          <div className="relative aspect-[4/5] bg-surface-container overflow-hidden group border border-outline-variant">
            <img
              alt={product.name}
              className="w-full h-full object-contain p-4 transition-transform duration-700 group-hover:scale-[1.02]"
              style={{ filter: "contrast(1.05) saturate(0.9)" }}
              src={activeImg}
            />

            <div className="absolute bottom-0 right-0 p-8 bg-stone-900/90 backdrop-blur-sm text-white font-label-caps text-[10px] uppercase tracking-[0.3em]">
              REF: {product.productResourceId.split("-")[0].toUpperCase()}
            </div>

            <div className="absolute top-6 right-6 opacity-0 group-hover:opacity-100 transition-opacity">
              <span
                className="material-symbols-outlined text-white"
                style={ICON_STYLE}
              >
                zoom_in
              </span>
            </div>
          </div>
          <div className="mt-6 flex gap-4 overflow-x-auto pb-2">
            {[getImageUrl(product.imagePath), ...IMG_DETAIL_THUMBS].map(
              (src, i) => (
                <button
                  key={i}
                  onClick={() => setActiveImg(src)}
                  className={`relative flex-shrink-0 w-24 aspect-square border-2 transition-all ${
                    activeImg === src
                      ? "border-primary scale-105 shadow-lg"
                      : "border-transparent opacity-60 hover:opacity-100"
                  }`}
                >
                  <img
                    alt={`Detail ${i + 1}`}
                    className="w-full h-full object-contain p-1"
                    src={src}
                  />
                </button>
              ),
            )}
          </div>
        </div>
        <div
          className="col-span-12 lg:col-span-5 flex flex-col pt-4 animate-slide-up"
          style={{ animationDelay: "0.1s" }}
        >
          <div className="mb-10">
            <div className="flex items-center gap-3 mb-4">
              <span className="px-3 py-1 bg-primary/10 text-primary font-label-caps text-[10px] uppercase tracking-widest rounded-full">
                {product.categoryName || "Premium Series"}
              </span>
              <span className="text-outline-variant font-label-caps text-[10px]">
                EST. 2024
              </span>
            </div>

            <h1 className="font-headline-xl text-3xl sm:text-4xl lg:text-5xl xl:text-6xl font-bold leading-tight tracking-tighter text-on-surface uppercase mb-6 break-words">
              {product.name}
            </h1>

            <p className="font-body-lg text-lg text-secondary italic leading-relaxed max-w-md border-l-2 border-primary/30 pl-6">
              Exclusive architectural material designed for high-performance
              facades and modern structures.
            </p>
          </div>
          <div className="bg-surface-container-low border border-outline-variant p-8 mb-10 relative overflow-hidden">
            <div className="absolute top-0 right-0 w-24 h-24 bg-primary/5 rounded-full -translate-y-1/2 translate-x-1/2" />

            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-end mb-6 gap-4">
              <div>
                <p className="font-label-caps text-[10px] text-outline uppercase tracking-widest mb-1">
                  MSRP (Unit Price)
                </p>
                <p className="font-headline-md text-3xl sm:text-4xl font-bold text-on-surface">
                  ₡{product.price}
                </p>
              </div>
              <div className="text-left sm:text-right">
                <p className="font-label-caps text-[10px] text-outline uppercase tracking-widest mb-1">
                  Stock Status
                </p>
                <div className="flex items-center gap-2">
                  <span
                    className={`w-2 h-2 rounded-full ${product.stock > 10 ? "bg-emerald-500 animate-pulse" : "bg-amber-500"}`}
                  />
                  <span className="font-body-sm font-bold text-on-surface">
                    {product.stock} UNITS
                  </span>
                </div>
              </div>
            </div>

            <button className="w-full bg-stone-900 text-white py-4 font-label-caps text-xs uppercase tracking-[0.2em] hover:bg-primary transition-all active:scale-[0.98] flex items-center justify-center gap-3">
              <span className="material-symbols-outlined text-sm">
                shopping_cart
              </span>
              Add to Specifications
            </button>
          </div>
          <div className="space-y-8">
            <div>
              <h3 className="font-label-caps text-xs text-on-surface font-bold mb-4 uppercase tracking-[0.2em] flex items-center gap-2">
                <span className="w-8 h-px bg-on-surface"></span>
                Technical Details
              </h3>
              <div className="space-y-1">
                <SpecRow
                  label="Composition"
                  value="Refined Terracotta & Shale"
                />
                <SpecRow label="Standard Size" value="290 x 90 x 50 MM" />
                <SpecRow
                  label="Durability Class"
                  value="F2 (Frost Resistant)"
                />
                <SpecRow label="Finish Type" value="Matte Architectural" />
              </div>
            </div>

            <div>
              <h3 className="font-label-caps text-xs text-on-surface font-bold mb-4 uppercase tracking-[0.2em] flex items-center gap-2">
                <span className="w-8 h-px bg-on-surface"></span>
                Description
              </h3>
              <p className="font-body-md text-base text-on-surface-variant leading-relaxed">
                {product.description ||
                  "No description available for this unique architectural element. Please contact our sales team for detailed material specifications and environmental impact reports."}
              </p>
            </div>
            <div className="grid grid-cols-2 gap-4 pt-4">
              <button className="flex items-center justify-center gap-2 border border-outline p-3 font-label-caps text-[10px] uppercase tracking-widest hover:bg-surface-container transition-colors">
                <span className="material-symbols-outlined text-sm">
                  download
                </span>
                Data Sheet
              </button>
              <button className="flex items-center justify-center gap-2 border border-outline p-3 font-label-caps text-[10px] uppercase tracking-widest hover:bg-surface-container transition-colors">
                <span className="material-symbols-outlined text-sm">
                  architecture
                </span>
                BIM Objects
              </button>
            </div>
          </div>
        </div>
        <section className="col-span-12 mt-24 border-t border-outline-variant pt-20">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-end mb-12 sm:mb-16 gap-6 sm:gap-8">
            <div className="max-w-2xl">
              <h2 className="font-headline-lg text-2xl sm:text-4xl font-bold text-on-surface uppercase tracking-tight mb-4 leading-tight">
                Applied Context
              </h2>
              <p className="text-secondary font-body-lg">
                Visualizing{" "}
                <span className="text-primary font-bold">{product.name}</span>{" "}
                in contemporary architectural projects across the globe.
              </p>
            </div>
            <button className="font-label-caps text-xs text-primary uppercase tracking-[0.2em] border-b-2 border-primary pb-1 hover:text-secondary hover:border-secondary transition-all flex-shrink-0">
              View All Case Studies
            </button>
          </div>

          <div className="grid grid-cols-12 gap-8">
            <div className="col-span-12 md:col-span-8 group relative overflow-hidden aspect-video lg:aspect-[21/9]">
              <img
                alt="Architectural application"
                className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-1000 scale-105 group-hover:scale-100"
                src={IMG_DETAIL_GALLERY_MAIN}
              />
              <div className="absolute inset-0 bg-linear-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex flex-col justify-end p-12">
                <span className="font-label-caps text-[10px] text-white/70 uppercase tracking-widest mb-2">
                  Portfolio Project
                </span>
                <h4 className="text-white text-2xl font-bold uppercase tracking-tight">
                  The Zenith Residence, Sydney
                </h4>
              </div>
            </div>
            <div className="col-span-12 md:col-span-4 flex flex-col gap-8">
              <div className="flex-1 bg-surface-container-high relative group overflow-hidden">
                <img
                  alt="Detail view"
                  className="w-full h-full object-cover mix-blend-multiply opacity-80 group-hover:opacity-100 transition-all"
                  src={IMG_DETAIL_GALLERY_THUMB}
                />
              </div>
              <div className="bg-stone-900 p-10 flex flex-col justify-between aspect-square md:aspect-auto">
                <span
                  className="material-symbols-outlined text-primary text-4xl"
                  style={ICON_STYLE}
                >
                  collections
                </span>
                <div>
                  <p className="text-white font-headline-md text-xl mb-4 leading-tight uppercase">
                    Full Texture <br />
                    Reference Library
                  </p>
                  <button className="text-white/50 font-label-caps text-[10px] uppercase tracking-[0.3em] hover:text-white transition-colors">
                    Explore Gallery (12)
                  </button>
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
    </main>
  );
};

export default ProductDetail;
