import MainLayout from '@/layouts/MainLayout';
import { Blog } from '@/types';
import { Head } from '@inertiajs/react';
import { useFavorites } from '@/hooks/useFavorites';
import { motion, Variants } from 'framer-motion';
import { Share2, Heart, Clock } from 'lucide-react';
import { useMemo, useState } from 'react';
import ShareModal from '@/components/blogs/ShareModal';

const formatDate = (dateString: string) => {
    const options: Intl.DateTimeFormatOptions = { year: 'numeric', month: 'long', day: 'numeric' };
    return new Date(dateString).toLocaleDateString(undefined, options);
};

const containerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: {
        opacity: 1,
        transition: {
            staggerChildren: 0.12,
            delayChildren: 0.15,
        },
    },
};

const itemVariants: Variants = {
    hidden: { opacity: 0, y: 24 },
    visible: {
        opacity: 1,
        y: 0,
        transition: {
            duration: 0.7,
            ease: [0.25, 0.46, 0.45, 0.94] as const,
        },
    },
};

const imageVariants: Variants = {
    hidden: { opacity: 0, scale: 1.03 },
    visible: {
        opacity: 1,
        scale: 1,
        transition: {
            duration: 0.9,
            ease: [0.25, 0.46, 0.45, 0.94] as const,
        },
    },
};

function Show({ blog }: { blog: Blog }) {
    const { isFavorite, toggleFavorite } = useFavorites();
    const [showShareModal, setShowShareModal] = useState(false);

    const postContent = blog.content || '<p>This post is currently empty. Check back soon!</p>';
    const pageTitle = blog.title || 'Blog Post';
    const plainText = useMemo(
        () => (blog.content ? blog.content.replace(/<[^>]*>/g, ' ').replace(/\s+/g, ' ').trim() : ''),
        [blog.content],
    );
    const description =
        blog.description ||
        (plainText ? plainText.substring(0, 160) + '...' : 'Read our latest blog post for insights and updates.');
    const imageUrl = blog.image || '/images/blogshowplaceholder.webp';
    const siteUrl = typeof window !== 'undefined' ? window.location.origin + '/blog/' + blog.slug : '';

    // Estimated reading time (~200 wpm)
    const readTime = useMemo(() => {
        if (!plainText) return null;
        const words = plainText.split(' ').length;
        return Math.max(1, Math.round(words / 200));
    }, [plainText]);

    const isArabic = (text: string) => /[\u0600-\u06FF]/.test(text);
    const isRTL = isArabic(blog.title || '');
    const readLabel = readTime ? (isRTL ? `${readTime} دقائق قراءة` : `${readTime} min read`) : null;

    const saved = isFavorite(blog.id);

    const ActionButtons = ({ compact = false }: { compact?: boolean }) => (
        <>
            <motion.button
                whileHover={{ scale: 1.04 }}
                whileTap={{ scale: 0.96 }}
                onClick={() => toggleFavorite(blog)}
                aria-pressed={saved}
                className={`flex items-center gap-2 rounded-full text-sm font-medium transition-colors cursor-pointer border ${
                    compact ? 'px-4 py-2' : 'px-5 py-2.5'
                } ${
                    saved
                        ? 'border-red-200 bg-red-50 text-red-600'
                        : 'border-gray-300 text-gray-700 hover:bg-gray-50'
                }`}
            >
                <Heart className={`w-4 h-4 transition-all ${saved ? 'fill-red-500 text-red-500' : ''}`} />
                <span>{saved ? 'Saved' : 'Save'}</span>
            </motion.button>

            <motion.button
                whileHover={{ scale: 1.04 }}
                whileTap={{ scale: 0.96 }}
                onClick={() => setShowShareModal(true)}
                className={`flex items-center gap-2 rounded-full border border-gray-300 text-sm font-medium text-gray-700 hover:bg-gray-50 transition-colors cursor-pointer ${
                    compact ? 'px-4 py-2' : 'px-5 py-2.5'
                }`}
            >
                <Share2 className="w-4 h-4" />
                <span>Share</span>
            </motion.button>
        </>
    );

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

            <div className="min-h-screen" dir={isRTL ? 'rtl' : 'ltr'}>
                <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
                    {/* ── Hero: left-aligned headline with accent rule ── */}
                    <motion.header
                        variants={containerVariants}
                        initial="hidden"
                        animate="visible"
                        className="pt-14 md:pt-20 pb-10 md:pb-14"
                    >
                        {/* Eyebrow: date · read time */}
                        <motion.div
                            variants={itemVariants}
                            className="flex items-center gap-3 text-sm text-gray-500 tracking-wide"
                        >
                            {blog.created_at && <time dateTime={blog.created_at}>{formatDate(blog.created_at)}</time>}
                            {blog.created_at && readLabel && (
                                <span className="w-1 h-1 rounded-full bg-gray-300" aria-hidden="true" />
                            )}
                            {readLabel && (
                                <span className="inline-flex items-center gap-1.5">
                                    <Clock className="w-3.5 h-3.5" aria-hidden="true" />
                                    {readLabel}
                                </span>
                            )}
                        </motion.div>

                        {blog.title && (
                            <motion.h1
                                variants={itemVariants}
                                className="mt-5 max-w-4xl text-4xl md:text-5xl lg:text-6xl font-bold text-primary leading-[1.08] tracking-tight border-s-4 border-primary ps-5 md:ps-6"
                            >
                                {blog.title}
                            </motion.h1>
                        )}

                        {/* Description + actions share a row on desktop */}
                        <motion.div
                            variants={itemVariants}
                            className="mt-7 flex flex-col md:flex-row md:items-end md:justify-between gap-6"
                        >
                            {blog.description ? (
                                <p className="text-lg md:text-xl text-gray-600 leading-relaxed max-w-2xl">
                                    {blog.description}
                                </p>
                            ) : (
                                <span />
                            )}
                            <div className="flex items-center gap-3 shrink-0">
                                <ActionButtons />
                            </div>
                        </motion.div>
                    </motion.header>

                    {/* ── Feature image: asymmetric, bleeds toward the end edge ── */}
                    <motion.figure variants={imageVariants} initial="hidden" animate="visible" className="relative">
                        <div className="overflow-hidden rounded-2xl shadow-xl shadow-gray-200/60 md:me-[-2rem] lg:me-[-4rem]">
                            <img
                                src={imageUrl}
                                alt={blog.title || 'Blog post cover'}
                                className="w-full h-[280px] sm:h-[400px] md:h-[520px] object-cover"
                            />
                        </div>
                    </motion.figure>

                    {/* ── Body: sticky action rail beside a comfortable reading column ── */}
                    <div className="flex gap-10 lg:gap-16 pt-12 md:pt-16 pb-16 md:pb-24">
                        {/* Sticky rail (desktop only) */}
                        <aside className="hidden lg:block w-14 shrink-0">
                            <div className="sticky top-28 flex flex-col items-center gap-3">
                                <button
                                    onClick={() => toggleFavorite(blog)}
                                    aria-pressed={saved}
                                    aria-label={saved ? 'Remove from saved' : 'Save post'}
                                    title={saved ? 'Saved' : 'Save'}
                                    className={`flex items-center justify-center w-11 h-11 rounded-full border transition-colors cursor-pointer ${
                                        saved
                                            ? 'border-red-200 bg-red-50'
                                            : 'border-gray-200 bg-white hover:bg-gray-50'
                                    }`}
                                >
                                    <Heart
                                        className={`w-4.5 h-4.5 ${saved ? 'fill-red-500 text-red-500' : 'text-gray-600'}`}
                                    />
                                </button>
                                <button
                                    onClick={() => setShowShareModal(true)}
                                    aria-label="Share post"
                                    title="Share"
                                    className="flex items-center justify-center w-11 h-11 rounded-full border border-gray-200 bg-white hover:bg-gray-50 transition-colors cursor-pointer"
                                >
                                    <Share2 className="w-4.5 h-4.5 text-gray-600" />
                                </button>
                            </div>
                        </aside>

                        {/* Article */}
                        <main className="min-w-0 max-w-3xl">
                            {blog.content ? (
                                <article className="markdown-content text-lg leading-[1.8] text-gray-800">
                                    {/* Renders trusted WYSIWYG editor output */}
                                    <div dangerouslySetInnerHTML={{ __html: postContent }} />
                                </article>
                            ) : (
                                <div className="py-16 text-gray-500 italic">
                                    <p>Content for this blog post is not yet available.</p>
                                </div>
                            )}

                            {/* End-of-article actions (visible where the rail isn't) */}
                            <footer className="mt-14 pt-8 border-t border-gray-200 flex items-center gap-3 lg:hidden">
                                <ActionButtons compact />
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