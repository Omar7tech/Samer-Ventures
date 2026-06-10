import Card from '@/components/blogs/Card';
import Pagination from '@/components/Pagination';
import MainLayout from '@/layouts/MainLayout';
import { Blog, PaginationProps } from '@/types';
import { Head } from '@inertiajs/react';
import { useFavorites } from '@/hooks/useFavorites';

function Blogs({ blogs }: { blogs: PaginationProps<Blog> }) {
    const { favorites, showFavorites, setShowFavorites } = useFavorites();

    const displayedBlogs = showFavorites ? favorites : blogs.data;

    return (
        <MainLayout>
            <Head title="Blogs">
                <meta head-key="description" name="description" content="Insights and stories from Samer Ventures covering business growth, sales, and strategy." />
                <meta head-key="og:title" property="og:title" content="Blogs - Samer Ventures" />
                <meta head-key="og:description" property="og:description" content="Insights and stories from Samer Ventures covering business growth, sales, and strategy." />
                <meta head-key="og:type" property="og:type" content="website" />
            </Head>

            <div className="max-w-[1700px] mx-auto px-6 md:px-12 lg:px-16 py-8 text-[#3a3b3a]">
                {/* Header Section */}
                <div className="mb-12 flex flex-col md:flex-row justify-between md:items-end gap-6">
                    <div className="flex-1">
                        {/* Improved Heading Wrap */}
                        <h1 className="text-4xl sm:text-5xl md:text-7xl lg:text-8xl font-normal tracking-wider lg:tracking-widest leading-[0.95] text-primary uppercase mb-4 flex flex-col sm:flex-row sm:items-baseline gap-2 sm:gap-4">
                            <span>{showFavorites ? 'Favorites' : 'Blogs'}</span>
                            
                            {/* Page Indicator transformed into a small, elegant accent */}
                            {!showFavorites && blogs.meta.current_page > 1 && (
                                <span className="text-base sm:text-lg md:text-xl font-light tracking-normal text-[#3a3b3a]/40 lowercase normal-case shrink-0">
                                    / page {blogs.meta.current_page}
                                </span>
                            )}
                        </h1>
                        
                        {(showFavorites || blogs.meta.current_page === 1) && (
                            <p className="text-lg md:text-xl text-[#3a3b3a]/60 font-light tracking-tight leading-relaxed max-w-xl">
                                {showFavorites
                                    ? 'Your curated picks'
                                    : 'Insights on business, growth & sales.'}
                            </p>
                        )}
                    </div>

                    <button
                        onClick={() => setShowFavorites(!showFavorites)}
                        className={`group inline-flex w-fit items-center gap-2.5 rounded-full px-5 py-2.5 text-sm font-semibold transition-all duration-300 cursor-pointer ${
                            showFavorites
                                ? 'bg-primary text-white shadow-sm shadow-primary/25'
                                : 'bg-white text-[#3a3b3a] ring-1 ring-inset ring-[#3a3b3a]/15 hover:ring-primary hover:text-primary'
                        }`}
                    >
                        <svg
                            className={`h-4 w-4 transition-transform duration-300 group-hover:scale-110 ${showFavorites ? 'fill-current' : 'fill-transparent stroke-current'}`}
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
                        <span>{showFavorites ? 'All Blogs' : 'Favorites'}</span>
                        {favorites.length > 0 && (
                            <span
                                className={`flex h-5 min-w-5 items-center justify-center rounded-full px-1.5 text-xs font-bold ${
                                    showFavorites ? 'bg-white/20 text-white' : 'bg-primary/10 text-primary'
                                }`}
                            >
                                {favorites.length}
                            </span>
                        )}
                    </button>
                </div>

                {displayedBlogs.length > 0 ? (
                    <>
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-4 gap-x-8 gap-y-12 mb-12">
                            {displayedBlogs.map((blog: Blog) => (
                                <Card key={blog.id} blog={blog} />
                            ))}
                        </div>
                        {!showFavorites && <Pagination pagination={blogs} />}
                    </>
                ) : (
                    <div className="py-24">
                        <h3 className="text-3xl md:text-4xl font-bold tracking-tight text-primary mb-3">
                            {showFavorites ? 'No favorites yet' : 'No blogs'}
                        </h3>
                        <p className="text-base text-[#3a3b3a]/60 font-light max-w-lg">
                            {showFavorites
                                ? 'Start adding blogs to your favorites collection by clicking the heart icon.'
                                : 'Check back soon for new insights and stories.'}
                        </p>
                    </div>
                )}
            </div>
        </MainLayout>
    );
}

export default Blogs;