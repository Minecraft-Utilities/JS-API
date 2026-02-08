/**
 * Callback passed to a page fetcher: limit (items per page) and skip (offset).
 */
export type PageCallback = {
    limit: number;
    skip: number;
};

/**
 * A single page of paginated results.
 */
export type Page<T> = {
    items: T[];
    totalItems: number;
    itemsPerPage: number;
    totalPages: number;
};

/**
 * Pagination configuration (items per page and total count).
 */
export type PaginationConfig = {
    itemsPerPage: number;
    totalItems: number;
};

/**
 * Fetcher used to load items for a page. Receives limit and skip via PageCallback.
 */
export type PageFetcher<T> = (callback: PageCallback) => T[] | Promise<T[]>;
