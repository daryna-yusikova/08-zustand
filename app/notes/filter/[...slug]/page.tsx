import NoteList from '@/components/NoteList/NoteList';
import { fetchNotes } from '@/lib/api';
import {
  dehydrate,
  HydrationBoundary,
  QueryClient,
} from '@tanstack/react-query';
import css from './NotesPage.module.css';
import FilteredNotesClient from './Notes.client';

interface NotesFilterProps {
  params: Promise<{ slug: string[] }>;
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
