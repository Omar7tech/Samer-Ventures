import MainLayout from '@/layouts/MainLayout';
import { Blog } from '@/types';
import { Head } from '@inertiajs/react';
import { useFavorites } from '@/hooks/useFavorites';
import { Share2, Heart, Clock } from 'lucide-react';
import { useMemo, useState, memo } from 'react';
import ShareModal from '@/components/blogs/ShareModal';

const formatDate = (dateString: string, isRTL: boolean) => {
    const options: Intl.DateTimeFormatOptions = { year: 'numeric', month: 'long', day: 'numeric' };
    return new Date(dateString).toLocaleDateString(isRTL ? 'ar-EG' : undefined, options);
};

// Extracted for architectural cleanliness and rendering isolation
const ActionButton = memo(({ 
    saved, 
    compact, 
    onToggleFavorite, 
    onShare 
}: { 
    saved: boolean; 
    compact?: boolean; 
    onToggleFavorite: () => void; 
    onShare: () => void; 
}) => (
    <>
        <button
            onClick={onToggleFavorite}
            aria-pressed={saved}
            className={`flex items-center gap-2 rounded-full text-sm font-medium transition-all duration-200 cursor-pointer border select-none active:scale-[0.98] ${
                compact ? 'px-4 py-2' : 'px-5 py-2.5'
            } ${
                saved
                    ? 'border-red-200 bg-red-50 text-red-600 shadow-sm shadow-red-100/50'
                    : 'border-gray-200 bg-white text-gray-700 hover:bg-gray-50 hover:border-gray-300'
            }`}
        >
            <Heart className={`w-4 h-4 transition-transform duration-200 ${saved ? 'fill-red-500 text-red-500 scale-105' : 'text-gray-500'}`} />
            <span className="w-12 text-start">{saved ? 'Saved' : 'Save'}</span>
        </button>

        <button
            onClick={onShare}
            className={`flex items-center gap-2 rounded-full border border-gray-200 bg-white text-sm font-medium text-gray-700 hover:bg-gray-50 hover:border-gray-300 transition-all duration-200 cursor-pointer select-none active:scale-[0.98] ${
                compact ? 'px-4 py-2' : 'px-5 py-2.5'
            }`}
        >
            <Share2 className="w-4 h-4 text-gray-500" />
            <span>Share</span>
        </button>
    </>
));
ActionButton.displayName = 'ActionButton';

function Show({ blog }: { blog: Blog }) {
    const { isFavorite, toggleFavorite } = useFavorites();
    const [showShareModal, setShowShareModal] = useState(false);

    const postContent = blog.content || '<p>This post is currently empty. Check back soon!</p>';
    const pageTitle = blog.title || 'Blog Post';
    
    const plainText = useMemo(
        () => (blog.content ? blog.content.replace(/<[^>]*>/g, ' ').replace(/\s+/g, ' ').trim() : ''),
        [blog.content],
    );

    const description = blog.description || 
        (plainText ? plainText.substring(0, 160) + '...' : 'Read our latest blog post for insights and updates.');
    
    const imageUrl = blog.image || '/images/blogshowplaceholder.webp';
    const siteUrl = typeof window !== 'undefined' ? window.location.origin + '/blog/' + blog.slug : '';

    const readTime = useMemo(() => {
        if (!plainText) return null;
        const words = plainText.split(/\s+/).length;
        return Math.max(1, Math.round(words / 200));
    }, [plainText]);

    const isArabic = (text: string) => /[\u0600-\u06FF]/.test(text);
    const isRTL = isArabic(blog.title || '');
    const readLabel = readTime ? (isRTL ? `${readTime} دقائق قراءة` : `${readTime} min read`) : null;
    const saved = isFavorite(blog.id);

    return (
        <MainLayout>
            <Head>
                <title>{`${pageTitle} - Blog`}</title>
                <meta head-key="description" name="description" content={description} />
                <meta head-key="og:title" property="og:title" content={pageTitle} />
                <meta head-key="og:description" property="og:description" content={description} />
                <meta head-key="og:image" property="og:image" content={imageUrl} />
                <meta head-key="og:url" property="og:url" content={siteUrl} />
                <meta head-key="og:type" property="og:type" content="article" />
            </Head>

            <div className="min-h-screen overflow-x-hidden selection:bg-primary/10 selection:text-primary" dir={isRTL ? 'rtl' : 'ltr'}>
                <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
                    
                    {/* ── Hero section ── */}
                    <header className="pt-12 md:pt-16 pb-8 md:pb-12">
                        {/* Eyebrow metadata */}
                        <div className="flex items-center gap-3 text-xs md:text-sm text-gray-500 font-medium tracking-wide uppercase">
                            {blog.created_at && (
                                <time dateTime={blog.created_at}>
                                    {formatDate(blog.created_at, isRTL)}
                                </time>
                            )}
                            {blog.created_at && readLabel && (
                                <span className="w-1 h-1 rounded-full bg-gray-300" aria-hidden="true" />
                            )}
                            {readLabel && (
                                <span className="inline-flex items-center gap-1.5 normal-case">
                                    <Clock className="w-3.5 h-3.5 stroke-[2]" aria-hidden="true" />
                                    {readLabel}
                                </span>
                            )}
                        </div>

                        {/* Title */}
                        {blog.title && (
                            <h1 className="mt-4 max-w-4xl text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-black text-gray-900 leading-[1.1] tracking-tight border-s-4 border-primary ps-4 md:ps-6">
                                {blog.title}
                            </h1>
                        )}

                        {/* Subtitle / Description row */}
                        <div className="mt-6 flex flex-col md:flex-row md:items-end md:justify-between gap-6">
                            {blog.description ? (
                                <p className="text-gray-600 text-base md:text-lg leading-relaxed max-w-2xl font-normal">
                                    {blog.description}
                                </p>
                            ) : (
                                <div />
                            )}
                            <div className="flex items-center gap-3 shrink-0 sm:self-start md:self-auto">
                                <ActionButton 
                                    saved={saved} 
                                    onToggleFavorite={() => toggleFavorite(blog)} 
                                    onShare={() => setShowShareModal(true)} 
                                />
                            </div>
                        </div>
                    </header>

                    {/* ── Feature Image ── */}
                    <figure className="relative w-full">
                        <div className="overflow-hidden rounded-2xl shadow-xl shadow-gray-200/50 md:me-[-2rem] lg:me-[-4rem]">
                            <img
                                src={imageUrl}
                                alt={blog.title || 'Blog post cover image'}
                                className="w-full aspect-[21/9] min-h-[260px] md:min-h-[460px] object-cover hover:scale-[1.005] transition-transform duration-300 ease-out"
                                loading="eager"
                            />
                        </div>
                    </figure>

                    {/* ── Reading Layout ── */}
                    <div className="flex gap-12 lg:gap-16 pt-10 md:pt-14 pb-16 md:pb-24">
                        {/* Interactive Desktop Sidebar Rail */}
                        <aside className="hidden lg:block w-12 shrink-0">
                            <div className="sticky top-24 flex flex-col items-center gap-4">
                                <button
                                    onClick={() => toggleFavorite(blog)}
                                    aria-pressed={saved}
                                    aria-label={saved ? 'Remove post from bookmarks' : 'Bookmark post'}
                                    title={saved ? 'Saved' : 'Save'}
                                    className={`flex items-center justify-center w-11 h-11 rounded-full border transition-all duration-200 cursor-pointer shadow-sm active:scale-[0.95] ${
                                        saved
                                            ? 'border-red-200 bg-red-50 text-red-600 shadow-red-50'
                                            : 'border-gray-200 bg-white hover:bg-gray-50 hover:border-gray-300 text-gray-500 hover:text-gray-700'
                                    }`}
                                >
                                    <Heart className={`w-4.5 h-4.5 ${saved ? 'fill-red-500 text-red-500' : ''}`} />
                                </button>
                                <button
                                    onClick={() => setShowShareModal(true)}
                                    aria-label="Share article link"
                                    title="Share"
                                    className="flex items-center justify-center w-11 h-11 rounded-full border border-gray-200 bg-white text-gray-500 hover:text-gray-700 hover:bg-gray-50 hover:border-gray-300 transition-all duration-200 cursor-pointer shadow-sm active:scale-[0.95]"
                                >
                                    <Share2 className="w-4.5 h-4.5" />
                                </button>
                            </div>
                        </aside>

                        {/* Article Text Base Column */}
                        <main className="min-w-0 max-w-2xl lg:max-w-3xl w-full">
                            {blog.content ? (
                                <article className="markdown-content text-base sm:text-lg leading-[1.85] text-gray-800 tracking-normal prose prose-gray max-w-none">
                                    <div dangerouslySetInnerHTML={{ __html: postContent }} />
                                </article>
                            ) : (
                                <div className="py-16 text-gray-400 italic font-medium flex items-center justify-center border border-dashed border-gray-200 rounded-xl">
                                    <p>Content for this blog post is not yet available.</p>
                                </div>
                            )}

                            {/* Responsive Mobile footer backup controls */}
                            <footer className="mt-12 pt-6 border-t border-gray-100 flex items-center gap-3 lg:hidden">
                                <ActionButton 
                                    saved={saved} 
                                    compact 
                                    onToggleFavorite={() => toggleFavorite(blog)} 
                                    onShare={() => setShowShareModal(true)} 
                                />
                            </footer>
                        </main>
                    </div>
                </div>
            </div>

            <ShareModal open={showShareModal} onClose={() => setShowShareModal(false)} blog={blog} />
        </MainLayout>
    );
}

export default Show;