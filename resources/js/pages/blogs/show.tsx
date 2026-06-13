import MainLayout from '@/layouts/MainLayout';
import { Blog } from '@/types';
import { Head } from '@inertiajs/react';
import { useFavorites } from '@/hooks/useFavorites';
import { getYouTubeVideoId } from '@/lib/utils';
import { Share2, Heart, Clock, PlayCircle } from 'lucide-react';
import { useMemo, useState, useRef, memo } from 'react';
import ShareModal from '@/components/blogs/ShareModal';

// Explicitly locked to English format ('en-US')
const formatDate = (dateString: string) => {
    const options: Intl.DateTimeFormatOptions = { year: 'numeric', month: 'long', day: 'numeric' };
    return new Date(dateString).toLocaleDateString('en-US', options);
};

// Main Action Buttons - Always visible at the top
const ActionButtons = memo(({
    saved,
    onToggleFavorite,
    onShare,
    onWatchVideo,
}: {
    saved: boolean;
    onToggleFavorite: () => void;
    onShare: () => void;
    onWatchVideo?: () => void;
}) => (
    <>
        <button
            onClick={onToggleFavorite}
            aria-pressed={saved}
            className={`flex items-center gap-2 rounded-full text-sm font-medium transition-all duration-200 cursor-pointer border select-none active:scale-[0.98] px-5 py-2.5 ${
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
            className="flex items-center gap-2 rounded-full border border-gray-200 bg-white text-sm font-medium text-gray-700 hover:bg-gray-50 hover:border-gray-300 transition-all duration-200 cursor-pointer select-none active:scale-[0.98] px-5 py-2.5"
        >
            <Share2 className="w-4 h-4 text-gray-500" />
            <span>Share</span>
        </button>

        {onWatchVideo && (
            <button
                onClick={onWatchVideo}
                className="flex items-center gap-2 rounded-full border border-primary/20 bg-primary/5 text-sm font-medium text-primary hover:bg-primary/10 transition-all duration-200 cursor-pointer select-none active:scale-[0.98] px-5 py-2.5"
            >
                <PlayCircle className="w-4 h-4" />
                <span>Watch Video</span>
            </button>
        )}
    </>
));
ActionButtons.displayName = 'ActionButtons';

function Show({ blog }: { blog: Blog }) {
    const { isFavorite, toggleFavorite } = useFavorites();
    const [showShareModal, setShowShareModal] = useState(false);
    const [playVideo, setPlayVideo] = useState(false);
    const videoSectionRef = useRef<HTMLDivElement>(null);

    const videoId = useMemo(() => (blog.have_video && blog.video_url ? getYouTubeVideoId(blog.video_url) : null), [blog.have_video, blog.video_url]);

    const handleWatchVideo = () => {
        setPlayVideo(true);
        videoSectionRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
    };

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
    
    // Read label forced strictly to English string format
    const readLabel = readTime ? `${readTime} min read` : null;
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
                    
                    {/* ── Split Hero Layout ── */}
                    <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 pt-10 md:pt-16 pb-10 md:pb-14 border-b border-gray-100 items-start lg:items-center">
                        
                        {/* Left/Start Side: Typography & Metadata */}
                        <header className="lg:col-span-7 w-full order-2 lg:order-1">
                            {/* Eyebrow metadata - Locked to English alignment tokens */}
                            <div className="flex items-center gap-3 text-xs md:text-sm text-gray-500 font-medium tracking-wide uppercase" dir="ltr">
                                {blog.created_at && (
                                    <time dateTime={blog.created_at}>
                                        {formatDate(blog.created_at)}
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
                                <h1 className="mt-4 text-3xl sm:text-4xl md:text-5xl font-black text-gray-900 leading-[1.15] tracking-tight border-s-4 border-primary ps-4 md:ps-6">
                                    {blog.title}
                                </h1>
                            )}

                            {/* Description */}
                            {blog.description && (
                                <p className="mt-5 text-gray-600 text-base md:text-lg leading-relaxed font-normal max-w-2xl">
                                    {blog.description}
                                </p>
                            )}

                            {/* Actions Container - Permanently visible on all screens here */}
                            <div className="mt-8 flex items-center gap-3 shrink-0">
                                <ActionButtons
                                    saved={saved}
                                    onToggleFavorite={() => toggleFavorite(blog)}
                                    onShare={() => setShowShareModal(true)}
                                    onWatchVideo={videoId ? handleWatchVideo : undefined}
                                />
                            </div>
                        </header>

                        {/* Right/End Side: Contained Bounded Image */}
                        <div className="lg:col-span-5 w-full order-1 lg:order-2">
                            <figure className="overflow-hidden rounded-2xl shadow-md shadow-gray-200/40 border border-gray-100 bg-gray-50">
                                <img
                                    src={imageUrl}
                                    alt={blog.title || 'Blog post cover image'}
                                    className="w-full aspect-[4/3] sm:aspect-[16/10] lg:aspect-[4/3] object-cover object-center"
                                    loading="eager"
                                />
                            </figure>
                        </div>
                    </div>

                    {/* ── Reading Content Layout ── */}
                    {/* Simplified to a clean single column wrapper since sticky side elements are removed */}
                    <div className="pt-10 md:pt-14 pb-16 md:pb-24">
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

                            {videoId && (
                                <div ref={videoSectionRef} className="mt-10 md:mt-14 scroll-mt-24">
                                    <h2 className="text-xl md:text-2xl font-bold text-gray-900 mb-4">Watch the Video</h2>
                                    <div className="overflow-hidden rounded-2xl shadow-md shadow-gray-200/40 border border-gray-100 bg-gray-50 aspect-video">
                                        <iframe
                                            className="w-full h-full"
                                            src={`https://www.youtube.com/embed/${videoId}${playVideo ? '?autoplay=1' : ''}`}
                                            title={blog.title || 'Blog video'}
                                            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                                            referrerPolicy="strict-origin-when-cross-origin"
                                            allowFullScreen
                                        />
                                    </div>
                                </div>
                            )}
                        </main>
                    </div>
                </div>
            </div>

            <ShareModal open={showShareModal} onClose={() => setShowShareModal(false)} blog={blog} />
        </MainLayout>
    );
}

export default Show;