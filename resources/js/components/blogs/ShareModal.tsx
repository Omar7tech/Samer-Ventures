interface Blog {
  id: number;
  title: string;
  slug: string;
  description?: string;
  image?: string | null;
}

interface ShareModalProps {
  open: boolean;
  onClose: () => void;
  blog: Blog;
}

export default function ShareModal({ open, onClose, blog }: ShareModalProps) {
  const shareUrl = `${typeof window !== "undefined" ? window.location.origin : ""}/blog/${blog.slug}`;

  const isArabic = (text: string) => {
    const arabicRegex = /[؀-ۿ]/;
    return arabicRegex.test(text);
  };

  const handleCopyLink = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    navigator.clipboard.writeText(shareUrl);
    onClose();
  };

  const shareToWhatsApp = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    window.open(`https://wa.me/?text=${encodeURIComponent(blog.title + " " + shareUrl)}`, '_blank');
    onClose();
  };

  if (!open) return null;

  return (
    <>
      <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-9998 animate-in fade-in duration-200" onClick={onClose} />
      <div className="fixed inset-0 z-9999 flex items-center justify-center p-4">
        <div className="bg-white rounded-2xl shadow-2xl max-w-lg w-full max-h-[90vh] overflow-y-auto animate-in zoom-in-95 fade-in slide-in-from-bottom-4 duration-300">
          {/* Header */}
          <div className="flex items-center justify-between p-6 border-b border-[#3a3b3a]/10 sticky top-0 bg-white z-10">
            <h2 className="text-xl font-bold text-[#3a3b3a]">Share Article</h2>
            <button
              onClick={onClose}
              className="flex items-center justify-center w-8 h-8 rounded-full text-[#3a3b3a]/60 hover:text-[#3a3b3a] hover:bg-[#3a3b3a]/5 transition-all duration-200 cursor-pointer"
            >
              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>

          {/* Content */}
          <div className="p-6">
            {/* Image */}
            <div className="relative w-full rounded-xl overflow-hidden mb-4 bg-[#FAFAFA]">
              <img
                src={blog.image ?? "/images/blognoimage.webp"}
                alt={blog.title}
                className="w-full h-auto object-contain"
              />
            </div>

            {/* Title */}
            <h3 className={`text-lg font-bold text-[#3a3b3a] mb-4 ${isArabic(blog.title) ? 'text-right' : 'text-left'}`}>
              {blog.title}
            </h3>

            {/* URL */}
            <div className="mb-6">
              <label className="block text-sm font-medium text-[#3a3b3a]/80 mb-2">Article URL</label>
              <div className="flex items-center gap-2 p-3 bg-[#FAFAFA] rounded-lg border border-[#3a3b3a]/10">
                <input
                  type="text"
                  value={shareUrl}
                  readOnly
                  className="flex-1 text-sm text-[#3a3b3a] bg-transparent outline-none"
                />
                <button
                  onClick={handleCopyLink}
                  className="flex items-center gap-2 px-3 py-1.5 text-xs font-medium text-white bg-primary hover:bg-primary/90 rounded-md transition-colors cursor-pointer"
                >
                  <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
                  </svg>
                  Copy
                </button>
              </div>
            </div>

            {/* Share Buttons */}
            <div className="flex gap-3">
              <button
                onClick={shareToWhatsApp}
                className="flex-1 flex items-center justify-center gap-2 px-4 py-3 text-sm font-medium text-white bg-green-500 hover:bg-green-600 rounded-lg transition-colors cursor-pointer"
              >
                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.149-.67.149-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.074-.297-.149-1.255-.462-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.297-.347.446-.521.151-.172.2-.296.3-.495.099-.198.05-.372-.025-.521-.075-.148-.669-1.611-.916-2.206-.242-.579-.487-.501-.669-.51l-.57-.01c-.198 0-.52.074-.792.372s-1.04 1.016-1.04 2.479 1.065 2.876 1.213 3.074c.149.198 2.095 3.2 5.076 4.487.709.306 1.263.489 1.694.626.712.226 1.36.194 1.872.118.571-.085 1.758-.719 2.006-1.413.248-.695.248-1.29.173-1.414-.074-.123-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z"/>
                </svg>
                WhatsApp
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
