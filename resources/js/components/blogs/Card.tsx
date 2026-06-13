import { memo, useState } from "react";
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
  have_video: false,
  video_url: null,
  image:
    "https://images.unsplash.com/photo-1493195671595-30a332807d62?w=500&h=400&fit=crop",
  created_at: "",
  updated_at: "",
};

const isArabic = (text: string) => /[\u0600-\u06FF]/.test(text);

function Card({ blog = placeholderBlog }: { blog?: Blog }) {
  const [isLoading, setIsLoading] = useState(true);
  const [hasError, setHasError] = useState(false);
  const [showShareModal, setShowShareModal] = useState(false);
  const { isFavorite, toggleFavorite } = useFavorites();

  const favorited = isFavorite(blog.id);
  const dir = isArabic(blog.title) ? "rtl" : "ltr";

  const formattedDate = blog.created_at
    ? new Date(blog.created_at)
        .toLocaleDateString(undefined, { month: "short", day: "numeric" })
        .toUpperCase()
    : "";

  const handleFavoriteClick = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    toggleFavorite(blog);
  };

  const handleShareClick = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setShowShareModal(true);
  };

  return (
    <>
      <article className="group flex h-full flex-col">
        {/* Image */}
        <Link
          href={show(blog.slug)}
          aria-label={blog.title}
          className="relative block aspect-[3/2] w-full overflow-hidden rounded-xl bg-[#3a3b3a]/[0.04] ring-1 ring-[#3a3b3a]/[0.06]"
        >
          {isLoading && !hasError && (
            <div className="absolute inset-0 z-10 motion-safe:animate-pulse bg-[#3a3b3a]/[0.05]" />
          )}

          {hasError ? (
            <div className="absolute inset-0 flex items-center justify-center">
              <svg
                className="h-8 w-8 text-[#3a3b3a]/20"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={1.5}
                  d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
                />
              </svg>
            </div>
          ) : (
            <img
              className={`h-full w-full object-cover transition-[opacity,transform] duration-700 ease-out motion-safe:group-hover:scale-[1.03] ${
                isLoading ? "opacity-0" : "opacity-100"
              }`}
              loading="lazy"
              decoding="async"
              src={blog.image ?? "/images/blognoimage.webp"}
              alt={blog.title}
              onLoad={() => setIsLoading(false)}
              onError={() => {
                setIsLoading(false);
                setHasError(true);
              }}
            />
          )}
        </Link>

        {/* Content */}
        <div
          className="mt-5 flex flex-1 flex-col border-t border-[#3a3b3a]/10 pt-5"
          dir={dir}
        >
          {/* Eyebrow */}
          <div className="flex items-center gap-2.5 text-[11px] font-semibold uppercase tracking-[0.16em] text-primary/80">
            {formattedDate && (
              <>
                <time>{formattedDate}</time>
                <span aria-hidden className="h-px w-4 bg-[#3a3b3a]/20" />
              </>
            )}
            <span className="text-[#3a3b3a]/40">Article</span>
          </div>

          <Link href={show(blog.slug)} className="mt-3 block">
            <h3 className="text-lg font-bold leading-snug tracking-tight text-[#3a3b3a] transition-colors duration-300 group-hover:text-primary md:text-xl">
              {blog.title}
            </h3>
          </Link>

          <p className="mt-2 line-clamp-2 flex-1 text-sm leading-relaxed text-[#3a3b3a]/55">
            {blog.description}
          </p>

          {/* Footer */}
          <div className="mt-5 flex items-center justify-between">
            <Link
              href={show(blog.slug)}
              className="group/link inline-flex items-center gap-1.5 text-sm font-semibold text-[#3a3b3a] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-primary"
            >
              <span className="relative">
                Read more
                <span className="absolute -bottom-0.5 left-0 h-px w-full origin-left scale-x-0 bg-primary transition-transform duration-300 ease-out group-hover/link:scale-x-100" />
              </span>
              <svg
                className="h-4 w-4 motion-safe:transition-transform motion-safe:duration-300 group-hover/link:translate-x-1"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={2.5}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M13 7l5 5m0 0l-5 5m5-5H6"
                />
              </svg>
            </Link>

            <div className="flex items-center gap-0.5">
              <button
                onClick={handleFavoriteClick}
                aria-label={favorited ? "Remove from favorites" : "Add to favorites"}
                aria-pressed={favorited}
                className={`flex h-9 w-9 items-center justify-center rounded-full transition-colors duration-200 cursor-pointer focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary ${
                  favorited
                    ? "text-red-500 hover:bg-red-500/[0.06]"
                    : "text-[#3a3b3a]/35 hover:text-[#3a3b3a] hover:bg-[#3a3b3a]/[0.05]"
                }`}
              >
                <svg
                  className="h-[18px] w-[18px] motion-safe:transition-transform motion-safe:duration-200 active:scale-90"
                  fill={favorited ? "currentColor" : "none"}
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth={2}
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
                  />
                </svg>
              </button>

              <button
                onClick={handleShareClick}
                aria-label="Share article"
                className="flex h-9 w-9 items-center justify-center rounded-full text-[#3a3b3a]/35 transition-colors duration-200 hover:text-[#3a3b3a] hover:bg-[#3a3b3a]/[0.05] cursor-pointer focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary"
              >
                <svg
                  className="h-[18px] w-[18px]"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth={2}
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.368 2.684 3 3 0 00-5.368-2.684z"
                  />
                </svg>
              </button>
            </div>
          </div>
        </div>
      </article>

      {/* Share Modal */}
      <ShareModal
        open={showShareModal}
        onClose={() => setShowShareModal(false)}
        blog={blog}
      />
    </>
  );
}

export default memo(Card);