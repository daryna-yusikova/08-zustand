import NoteList from '@/components/NoteList/NoteList';
import { fetchNoteById, fetchNotes } from '@/lib/api';
import {
  dehydrate,
  HydrationBoundary,
  QueryClient,
} from '@tanstack/react-query';
import css from './NotesPage.module.css';
import FilteredNotesClient from './Notes.client';
import { Metadata } from 'next';

interface NotesFilterProps {
  params: Promise<{ slug: string[] }>;
}

export async function generateMetadata({
  params,
}: NotesFilterProps): Promise<Metadata> {
  const { slug } = await params;

  return {
    title: `Notes: ${slug}`,
    description: `Notes tagged: ${slug} `,
    openGraph: {
      title: `Notes: ${slug}`,
      description: `Notes tagged: ${slug} `,
      url: `https://notehub.com/notes/${slug}`,
      siteName: 'NoteHub',
      images: [
        {
          url: 'https://ac.goit.global/fullstack/react/notehub-og-meta.jpg',
          width: 1200,
          height: 630,
          alt: `${slug}`,
        },
      ],
      type: 'article',
    },
  };
}

export default async function NotesFilter({ params }: NotesFilterProps) {
  const { slug } = await params;
  console.log(slug);
  const tag = slug[0] === 'all' ? undefined : slug[0];
  const queryClient = new QueryClient();
  await queryClient.prefetchQuery({
    queryKey: ['notes', '', 1, tag],
    queryFn: () => fetchNotes('', 1, tag),
  });

  return (
    <div className={css.app}>
      <HydrationBoundary state={dehydrate(queryClient)}>
        <FilteredNotesClient tag={tag} />
      </HydrationBoundary>
    </div>
  );
}
