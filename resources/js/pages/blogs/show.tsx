import MainLayout from '@/layouts/MainLayout';
import { Blog } from '@/types';
import { Head } from '@inertiajs/react';
import { useFavorites } from '@/hooks/useFavorites';
import { motion, Variants } from 'framer-motion';
import { Share2, Heart } from 'lucide-react';
import { useState } from 'react';
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
            staggerChildren: 0.1,
            delayChildren: 0.2,
        },
    },
};

const itemVariants: Variants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
        opacity: 1,
        y: 0,
        transition: {
            duration: 0.6,
            ease: [0.25, 0.46, 0.45, 0.94] as const,
        },
    },
};

function Show({ blog }: { blog: Blog }) {
    const { isFavorite, toggleFavorite } = useFavorites();
    const [showShareModal, setShowShareModal] = useState(false);
    const postContent = blog.content || '<p>This post is currently empty. Check back soon!</p>';
    const pageTitle = blog.title || 'Blog Post';
    const description = blog.description || (blog.content ? blog.content.replace(/<[^>]*>/g, '').substring(0, 160) + '...' : 'Read our latest blog post for insights and updates.');
    const imageUrl = blog.image || '/images/blogshowplaceholder.webp';
    const siteUrl = typeof window !== 'undefined' ? window.location.origin + '/blog/' + blog.slug : '';

    const isArabic = (text: string) => {
        const arabicRegex = /[؀-ۿ]/;
        return arabicRegex.test(text);
    };

    const isRTL = isArabic(blog.title || '');

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

            <div className="min-h-screen">
                {/* Hero Section - Side by Side */}
                <motion.div
                    variants={containerVariants}
                    initial="hidden"
                    animate="visible"
                    className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-12 md:pt-16 pb-8 md:pb-12"
                >
                    <div className={`grid md:grid-cols-2 gap-8 lg:gap-12 items-center ${isRTL ? 'direction-rtl' : ''}`} dir={isRTL ? 'rtl' : 'ltr'}>
                        {/* Content Side */}
                        <motion.div variants={itemVariants} className="space-y-6">
                            {blog.created_at && (
                                <span className="text-sm text-gray-500">
                                    {formatDate(blog.created_at)}
                                </span>
                            )}

                            {blog.title && (
                                <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-primary leading-tight">
                                    {blog.title}
                                </h1>
                            )}

                            {blog.description && (
                                <p className="text-lg text-gray-600 leading-relaxed">
                                    {blog.description}
                                </p>
                            )}

                            <div className="flex gap-3 pt-2">
                                <motion.button
                                    whileHover={{ scale: 1.05 }}
                                    whileTap={{ scale: 0.95 }}
                                    onClick={() => toggleFavorite(blog)}
                                    className="flex items-center gap-2 px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors cursor-pointer"
                                >
                                    <Heart
                                        className={`w-4 h-4 transition-all ${
                                            isFavorite(blog.id)
                                                ? "fill-red-500 text-red-500"
                                                : ""
                                        }`}
                                    />
                                    <span className="text-sm">{isFavorite(blog.id) ? "Saved" : "Save"}</span>
                                </motion.button>

                                <motion.button
                                    whileHover={{ scale: 1.05 }}
                                    whileTap={{ scale: 0.95 }}
                                    onClick={() => setShowShareModal(true)}
                                    className="flex items-center gap-2 px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors cursor-pointer"
                                >
                                    <Share2 className="w-4 h-4" />
                                    <span className="text-sm">Share</span>
                                </motion.button>
                            </div>
                        </motion.div>

                        {/* Image Side */}
                        <motion.div variants={itemVariants} className="relative">
                            <img
                                src={blog.image ?? '/images/blogshowplaceholder.webp'}
                                alt={blog.title}
                                className="w-full h-[400px] md:h-[500px] object-cover rounded-2xl"
                            />
                        </motion.div>
                    </div>
                </motion.div>

                {/* MAIN CONTENT BODY */}
                <main className="max-w-6xl mx-auto px-6 pt-0 pb-12 md:pb-20 overflow-auto">
                    {blog.content ? (
                        <div className="markdown-content text-lg">
                            {/* Renders trusted WYSIWYG editor output */}
                            <div dangerouslySetInnerHTML={{ __html: postContent }} />
                        </div>
                    ) : (
                        <div className="py-10 text-center text-gray-500 italic">
                            <p>Content for this blog post is not yet available.</p>
                        </div>
                    )}
                </main>
            </div>

            <ShareModal
                open={showShareModal}
                onClose={() => setShowShareModal(false)}
                blog={blog}
            />
        </MainLayout>
    );
}

export default Show;
