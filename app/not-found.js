import Link from 'next/link';
import styles from './not-found.module.scss';

export const metadata = {
    title: '404 — Page Not Found | Matthew Renfer',
};

export default function NotFound() {
    return (
        <main className={styles.wrap}>
            <div className={styles.inner}>
                <p className={styles.code}>404</p>
                <h1 className={styles.heading}>This one got away.</h1>
                <p className={styles.copy}>
                    Either the link&apos;s gone stale or I moved something and
                    forgot to leave a forwarding address. Nothing lives here.
                </p>
                <div className={styles.actions}>
                    <Link href='/' className={styles.link}>
                        ← Back home
                    </Link>
                    <Link href='/writing/' className={styles.link}>
                        Read something instead →
                    </Link>
                </div>
            </div>
        </main>
    );
}
