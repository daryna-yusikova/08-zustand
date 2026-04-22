import { Metadata } from 'next';
import css from './Home.module.css';

export const metadata: Metadata = {
  title: 'NoteHub-Not-Found',
  description: 'Oops, this page does not exist',
  openGraph: {
    title: 'NoteHub-Not-Found',
    description:
      'Notehub is an answer to your procrastination struggles. But this page does not exist sorry.',
    url: 'https://notehub.com/',
    images: [
      {
        url: 'https://ac.goit.global/fullstack/react/notehub-og-meta.jpg',
        width: 1200,
        height: 630,
        alt: 'Notepad',
      },
    ],
  },
};

export default function NotFound() {
  return (
    <div>
      <h1 className={css.title}>404 - Page not found</h1>
      <p className={css.description}>
        Sorry, the page you are looking for does not exist.
      </p>
    </div>
  );
}
