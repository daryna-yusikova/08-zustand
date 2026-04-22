'use client';

import NoteList from '@/components/NoteList/NoteList';
import Pagination from '@/components/Pagination/Pagination';
import SearchBox from '@/components/SearchBox/SearchBox';
import { fetchNotes } from '@/lib/api';
import { keepPreviousData, useQuery } from '@tanstack/react-query';
import { useState } from 'react';
import { useDebouncedCallback } from 'use-debounce';
import css from './NotesPage.module.css';
import Link from 'next/link';

export default function FilteredNotesClient({ tag }: { tag?: string }) {
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [searchValue, setSearchValue] = useState('');

  const { data, error, isLoading, isSuccess } = useQuery({
    queryKey: ['notes', searchValue, currentPage, tag],
    queryFn: () => fetchNotes(searchValue, currentPage, tag),
    placeholderData: keepPreviousData,
    refetchOnMount: false,
  });

  const handleSearch = useDebouncedCallback((value: string) => {
    setSearchValue(value.trim());
    setCurrentPage(1);
  }, 500);

  const totalPages = data?.totalPages || 0;
  return (
    <>
      <header className={css.toolbar}>
        <SearchBox value={searchValue} onSearch={handleSearch} />
        {totalPages > 1 && (
          <Pagination
            totalPages={totalPages}
            currentPage={currentPage}
            onPageChange={setCurrentPage}
          />
        )}
        <Link className={css.button} href="/notes/action/create">
          Create note +
        </Link>
      </header>
      {isLoading && <p>Loading...</p>}
      {error && <p>Sorry something went wrong, try again later.</p>}
      {isSuccess && data.notes.length > 0 && <NoteList notes={data.notes} />}
    </>
  );
}
