"use client";

import Link from "next/link";

type PaginationProps = {
    page: number;
    pageCount: number;
    searchParams: Record<string, any>;
    basePath: string;
};

export default function Pagination({ page, pageCount, searchParams, basePath }: PaginationProps) {
    const canPrev = page > 1;
    const canNext = page < pageCount;

    const makeHref = (toPage: number) => {
        const params = new URLSearchParams();
        Object.entries(searchParams || {}).forEach(([k, v]) => {
            if (v == null || v === "") return;
            if (Array.isArray(v)) v.forEach(val => params.append(k, String(val)));
            else params.set(k, String(v));
        });
        params.set("page", String(toPage));
        return `${basePath}?${params.toString()}`;
    };

    if (pageCount <= 1) return null;

    const WINDOW = 2;
    const start = Math.max(1, page - WINDOW);
    const end = Math.min(pageCount, page + WINDOW);
    const pages = Array.from({ length: end - start + 1 }, (_, i) => start + i);

    return (
        <nav className="pagination" aria-label="Paginación">
            <Link
                aria-disabled={!canPrev}
                className={`pag-btn ${!canPrev ? "pag-disabled" : ""}`}
                href={makeHref(page - 1)}
            >
                ←
            </Link>

            {start > 1 && (
                <>
                    <Link className="pag-num" href={makeHref(1)}>1</Link>
                    {start > 2 && <span className="pag-ellipsis">…</span>}
                </>
            )}

            {pages.map((n) => {
                const isActive = n === page;
                return (
                    <Link
                        key={n}
                        href={makeHref(n)}
                        className={`pag-num ${isActive ? "pag-active" : ""}`}
                        {...(isActive ? { "aria-current": "page" } : {})}
                    >
                        {n}
                    </Link>
                );
            })}

            {end < pageCount && (
                <>
                    {end < pageCount - 1 && <span className="pag-ellipsis">…</span>}
                    <Link className="pag-num" href={makeHref(pageCount)}>{pageCount}</Link>
                </>
            )}

            <Link
                aria-disabled={!canNext}
                className={`pag-btn ${!canNext ? "pag-disabled" : ""}`}
                href={makeHref(page + 1)}
            >
                →
            </Link>
        </nav>
    );
}