import { useState } from "react";
import { Link } from "@inertiajs/react";
import { Blog } from "@/types";
import { useFavorites } from "@/hooks/useFavorites";
import ShareModal from "./ShareModal";

const show = (slug: string) => `/blog/${slug}`;

const placeholderBlog: Blog = {
  id: 1,
  slug: "automotive",
  title: "Automotive",
  content: "",
  description: "Superchat for car dealerships, workshops and rental companies.",
  image: "https://images.unsplash.com/photo-1493195671595-30a332807d62?w=500&h=400&fit=crop",
  created_at: "",
  updated_at: "",
};

function Card({ blog = placeholderBlog }: { blog?: Blog }) {
  const [isLoading, setIsLoading] = useState(true);
  const [hasError, setHasError] = useState(false);
  const [showShareModal, setShowShareModal] = useState(false);
  const { isFavorite, toggleFavorite } = useFavorites();

  const isArabic = (text: string) => {
    const arabicRegex = /[؀-ۿ]/;
    return arabicRegex.test(text);
  };

  const handleFavoriteClick = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    toggleFavorite(blog);
  };

  return (
    <>
      <div className="group relative w-full bg-white rounded-2xl overflow-hidden border border-[#3a3b3a]/10 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-700 ease-[cubic-bezier(0.34,1.56,0.64,1)] flex flex-col">
      <Link
        href={show(blog.slug)}
        className="block relative w-full h-52 overflow-hidden rounded-xl mt-3 mx-3 transition-all duration-700 group-hover:shadow-md"
        style={{ width: "calc(100% - 24px)" }}
      >
        {isLoading && (
          <div className="absolute inset-0 bg-[#3a3b3a]/5 z-10">
            <div className="absolute inset-0 bg-linear-to-r from-[#3a3b3a]/5 via-[#3a3b3a]/2 to-[#3a3b3a]/5 animate-pulse" />
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="w-6 h-6 border border-[#3a3b3a]/20 border-t-[#3a3b3a]/40 rounded-full animate-spin" />
            </div>
          </div>
        )}

        {hasError ? (
          <div className="absolute inset-0 bg-[#3a3b3a]/5 flex items-center justify-center rounded-xl">
            <svg className="w-8 h-8 text-[#3a3b3a]/20" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
            </svg>
          </div>
        ) : (
          <img
            className={`w-full h-full object-cover rounded-xl transition-all duration-700 ease-[cubic-bezier(0.34,1.56,0.64,1)] group-hover:scale-105 ${
              isLoading ? "opacity-0 scale-105" : "opacity-100 scale-100"
            }`}
            loading="lazy"
            src={blog.image ?? "/images/blognoimage.webp"}
            alt={blog.title}
            onLoad={() => setIsLoading(false)}
            onError={() => { setIsLoading(false); setHasError(true); }}
          />
        )}
      </Link>

      <div className="flex flex-col gap-2 px-5 pt-3 pb-5 flex-1">
        <Link href={show(blog.slug)}>
          <h3 className="text-lg font-bold text-[#3a3b3a] leading-tight transition-colors duration-500" dir={isArabic(blog.title) ? 'rtl' : 'ltr'}>
            {blog.title}
          </h3>
        </Link>

        <p className="text-sm text-[#3a3b3a]/60 leading-relaxed line-clamp-2 flex-1 transition-colors duration-500" dir={isArabic(blog.title) ? 'rtl' : 'ltr'}>
          {blog.description}
        </p>

        <div className="flex items-center justify-between pt-4 mt-2 border-t border-[#3a3b3a]/5">
          <div className="flex items-center gap-1 bg-[#FAFAFA] rounded-full p-1 border border-[#3a3b3a]/10">
            <button
              onClick={handleFavoriteClick}
              className={`flex items-center justify-center w-8 h-8 rounded-full transition-all duration-300 cursor-pointer ${isFavorite(blog.id) ? "bg-white shadow-md text-red-500 scale-110" : "text-[#3a3b3a]/40 hover:text-[#3a3b3a] hover:bg-white hover:shadow-sm hover:scale-105"}`}
              aria-label="Favorite"
            >
              <svg className="w-4 h-4 transition-transform duration-300" fill={isFavorite(blog.id) ? "currentColor" : "none"} viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
              </svg>
            </button>

            <div className="relative">
              <button
                onClick={(e) => { e.preventDefault(); e.stopPropagation(); setShowShareModal(true); }}
                className={`flex items-center justify-center w-8 h-8 rounded-full transition-all duration-300 cursor-pointer ${showShareModal ? "bg-white shadow-md text-[#3a3b3a] scale-110" : "text-[#3a3b3a]/40 hover:text-[#3a3b3a] hover:bg-white hover:shadow-sm hover:scale-105"}`}
              >
                <svg className="w-4 h-4 transition-transform duration-300" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.368 2.684 3 3 0 00-5.368-2.684z" />
                </svg>
              </button>
            </div>
          </div>

          <Link
            href={show(blog.slug)}
            className="group/link flex items-center gap-1.5 text-sm font-bold text-[#3a3b3a] transition-all duration-500"
          >
            <span className="relative">
              Read more
              <span className="absolute -bottom-0.5 left-0 w-0 h-0.5 bg-primary transition-all duration-500 ease-[cubic-bezier(0.34,1.56,0.64,1)] group-hover/link:w-full" />
            </span>
            <svg className="w-4 h-4 transition-transform duration-700 group-hover/link:translate-x-1" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M13 7l5 5m0 0l-5 5m5-5H6" />
            </svg>
          </Link>
        </div>
      </div>
    </div>

    {/* Share Modal */}
    <ShareModal
      open={showShareModal}
      onClose={() => setShowShareModal(false)}
      blog={blog}
    />
    </>
  );
}

export default Card;
