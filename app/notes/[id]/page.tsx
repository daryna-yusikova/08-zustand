import { fetchNoteById } from '@/lib/api';
import css from './NoteDetails.module.css';
import {
  QueryClient,
  HydrationBoundary,
  dehydrate,
} from '@tanstack/react-query';
import NoteDetailsClient from './NoteDetails.client';

interface NoteProps {
  params: Promise<{ id: string }>;
}

export default async function NoteDetails({ params }: NoteProps) {
  const { id } = await params;

  const queryClient = new QueryClient();
  await queryClient.prefetchQuery({
    queryKey: ['note', id],
    queryFn: () => fetchNoteById(id),
  });

  return (
    <div className={css.main}>
      <HydrationBoundary state={dehydrate(queryClient)}>
        <NoteDetailsClient />
      </HydrationBoundary>
    </div>
  );
}
