import { useState, useEffect, useCallback } from 'react';
import { Blog } from '@/types';

const STORAGE_KEY = 'sv_blog_favorites';
const EVENT_KEY = 'sv-favorites-changed';

export function useFavorites() {
    const [favorites, setFavorites] = useState<Blog[]>(() => {
        if (typeof window === 'undefined') return [];

        const stored = localStorage.getItem(STORAGE_KEY);
        if (stored) {
            try {
                return JSON.parse(stored);
            } catch (e) {
                console.error('Failed to parse favorites:', e);
                return [];
            }
        } else {
            return [];
        }
    });
    const [showFavorites, setShowFavorites] = useState(false);

    const loadFavorites = useCallback(() => {
        if (typeof window === 'undefined') return [];

        const stored = localStorage.getItem(STORAGE_KEY);
        if (stored) {
            try {
                return JSON.parse(stored);
            } catch (e) {
                console.error('Failed to parse favorites:', e);
                return [];
            }
        } else {
            return [];
        }
    }, []);

    useEffect(() => {
        const handleStorageChange = (e: StorageEvent) => {
            if (e.key === STORAGE_KEY) {
                setFavorites(loadFavorites());
            }
        };

        const handleLocalChange = () => {
            setFavorites(loadFavorites());
        };

        window.addEventListener('storage', handleStorageChange);
        window.addEventListener(EVENT_KEY, handleLocalChange);

        return () => {
            window.removeEventListener('storage', handleStorageChange);
            window.removeEventListener(EVENT_KEY, handleLocalChange);
        };
    }, [loadFavorites]);

    const toggleFavorite = (blog: Blog) => {
        const stored = localStorage.getItem(STORAGE_KEY);
        let currentFavorites: Blog[] = stored ? JSON.parse(stored) : [];

        if (!Array.isArray(currentFavorites)) {
            currentFavorites = [];
        }

        const exists = currentFavorites.some((f) => f.id === blog.id);

        if (exists) {
            currentFavorites = currentFavorites.filter((f) => f.id !== blog.id);
        } else {
            currentFavorites.push(blog);
        }

        localStorage.setItem(STORAGE_KEY, JSON.stringify(currentFavorites));

        window.dispatchEvent(new Event(EVENT_KEY));

        setFavorites(currentFavorites);
    };

    const isFavorite = (blogId: number) => {
        return favorites.some((fav) => fav.id === blogId);
    };

    return {
        favorites,
        toggleFavorite,
        isFavorite,
        showFavorites,
        setShowFavorites,
    };
}
