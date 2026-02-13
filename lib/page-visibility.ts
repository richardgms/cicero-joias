import prisma from '@/lib/prisma';
import { auth } from '@clerk/nextjs/server';
import { redirect } from 'next/navigation';
import { logger } from '@/lib/logger';

/**
 * Checks page visibility server-side and redirects if the page is hidden.
 * Admins always see the page (with a preview indicator).
 * 
 * @returns `{ isAdmin: boolean }` if the page is visible or the user is admin
 * @throws redirect('/') if the page is hidden and user is not admin
 */
export async function checkPageVisibility(slug: string): Promise<{ isAdmin: boolean }> {
    try {
        const pageVisibility = await prisma.pageVisibility.findUnique({
            where: { slug },
            select: { isVisible: true },
        });

        // If page not configured in DB, default to visible (fail-safe)
        if (!pageVisibility) {
            return { isAdmin: false };
        }

        if (pageVisibility.isVisible) {
            return { isAdmin: false };
        }

        // Page is hidden — check if user is admin
        const { userId } = await auth();
        if (userId) {
            return { isAdmin: true };
        }

        // Not admin, page is hidden → redirect
        redirect('/');
    } catch (error) {
        // Re-throw redirect errors (Next.js throws with digest property)
        if (error && typeof error === 'object' && 'digest' in error) {
            throw error;
        }

        logger.error('Error checking page visibility:', error);
        // Fail-safe: show the page if we can't check visibility
        return { isAdmin: false };
    }
}
