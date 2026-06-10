import { Link } from '@inertiajs/react';
import { PaginationProps, PaginationLink } from '@/types';
import { ChevronLeft, ChevronRight } from 'lucide-react';

interface PaginationComponentProps<T = Record<string, unknown>> {
    pagination: PaginationProps<T>;
}

export default function Pagination<T = Record<string, unknown>>({ pagination }: PaginationComponentProps<T>) {
    const links: PaginationLink[] = pagination.meta.links;
    const currentPage = pagination.meta.current_page;
    const lastPage = pagination.meta.last_page;
    const total = pagination.meta.total;
    const from = pagination.meta.from;
    const to = pagination.meta.to;

    const prevUrl = links[0]?.url;
    const nextUrl = links[links.length - 1]?.url;

    if (lastPage <= 1) {
        return null;
    }

    return (
        <div className="flex flex-col items-center gap-5 mt-8">
            {/* Results info */}
            <div className="text-sm text-[#3a3b3a]/55">
                Showing <span className="font-semibold text-[#3a3b3a]">{from}</span>–
                <span className="font-semibold text-[#3a3b3a]">{to}</span> of{' '}
                <span className="font-semibold text-[#3a3b3a]">{total}</span>
            </div>

            {/* Pagination controls */}
            <div className="flex items-center gap-2">
                {/* Previous */}
                {prevUrl ? (
                    <Link
                        href={prevUrl}
                        className="flex h-11 w-11 items-center justify-center rounded-full border border-[#3a3b3a]/15 text-[#3a3b3a] transition-all duration-300 hover:border-primary hover:bg-primary hover:text-white"
                        aria-label="Previous page"
                    >
                        <ChevronLeft className="h-4 w-4" />
                    </Link>
                ) : (
                    <span className="flex h-11 w-11 items-center justify-center rounded-full border border-[#3a3b3a]/10 text-[#3a3b3a]/25 cursor-not-allowed">
                        <ChevronLeft className="h-4 w-4" />
                    </span>
                )}

                {/* Page numbers - segmented pill */}
                <div className="flex items-center gap-1 rounded-full border border-[#3a3b3a]/10 bg-[#FAFAFA] p-1">
                    {links.slice(1, -1).map((link: PaginationLink, index: number) => {
                        const actualIndex = index + 1;
                        const isEllipsis = link.label === '...';
                        const isBoundaryLink = actualIndex === 1 || actualIndex === links.length - 2;

                        const shouldShowOnMobile =
                            link.active ||
                            (link.page && Math.abs(link.page - currentPage) <= 1);

                        const visibilityClass = !shouldShowOnMobile && !isBoundaryLink
                            ? 'hidden sm:flex'
                            : 'flex';

                        if (isEllipsis) {
                            return (
                                <span
                                    key={actualIndex}
                                    className={`${visibilityClass} h-9 w-9 items-center justify-center text-[#3a3b3a]/40`}
                                >
                                    •••
                                </span>
                            );
                        }

                        if (!link.url) {
                            return null;
                        }

                        return (
                            <Link
                                key={actualIndex}
                                href={link.url}
                                className={`
                                    ${visibilityClass} h-9 min-w-9 items-center justify-center rounded-full px-3 text-sm font-semibold
                                    transition-all duration-300
                                    ${link.active
                                        ? 'bg-primary text-white shadow-sm'
                                        : 'text-[#3a3b3a]/70 hover:bg-primary/10 hover:text-primary'
                                    }
                                `}
                                aria-label={`Page ${link.label}`}
                                aria-current={link.active ? 'page' : undefined}
                            >
                                {link.label}
                            </Link>
                        );
                    })}
                </div>

                {/* Next */}
                {nextUrl ? (
                    <Link
                        href={nextUrl}
                        className="flex h-11 w-11 items-center justify-center rounded-full border border-[#3a3b3a]/15 text-[#3a3b3a] transition-all duration-300 hover:border-primary hover:bg-primary hover:text-white"
                        aria-label="Next page"
                    >
                        <ChevronRight className="h-4 w-4" />
                    </Link>
                ) : (
                    <span className="flex h-11 w-11 items-center justify-center rounded-full border border-[#3a3b3a]/10 text-[#3a3b3a]/25 cursor-not-allowed">
                        <ChevronRight className="h-4 w-4" />
                    </span>
                )}
            </div>
        </div>
    );
}
