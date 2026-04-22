'use client';

import Modal from '@/components/Modal/Modal';
import NoteForm from '@/components/NoteForm/NoteForm';
import NoteList from '@/components/NoteList/NoteList';
import Pagination from '@/components/Pagination/Pagination';
import SearchBox from '@/components/SearchBox/SearchBox';
import { fetchNotes } from '@/lib/api';
import { keepPreviousData, useQuery } from '@tanstack/react-query';
import { useState } from 'react';
import { useDebouncedCallback } from 'use-debounce';
import css from './NotesPage.module.css';

export default function FilteredNotesClient({ tag }: { tag?: string }) {
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [searchValue, setSearchValue] = useState('');

  const { data, error, isLoading, isSuccess } = useQuery({
    queryKey: ['notes', searchValue, currentPage, tag],
    queryFn: () => fetchNotes(searchValue, currentPage, tag),
    placeholderData: keepPreviousData,
    refetchOnMount: false,
  });

  const closeModal = () => setIsModalOpen(false);

  const handleChange = useDebouncedCallback(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      setSearchValue(event.target.value.trim());
      setCurrentPage(1);
    },
    500
  );
  const totalPages = data?.totalPages || 0;
  return (
    <>
      <header className={css.toolbar}>
        <SearchBox value={searchValue} onSearch={handleChange} />{' '}
        {totalPages > 1 && (
          <Pagination
            totalPages={totalPages}
            currentPage={currentPage}
            onPageChange={setCurrentPage}
          />
        )}
        <button className={css.button} onClick={() => setIsModalOpen(true)}>
          Create note +
        </button>
      </header>
      {isModalOpen && (
        <Modal onClose={closeModal}>
          <NoteForm onCancel={closeModal} />
        </Modal>
      )}
      {isLoading && <p>Loading...</p>}
      {error && <p>Sorry something went wrong, try again later.</p>}
      {isSuccess && data.notes.length > 0 && <NoteList notes={data.notes} />}
    </>
  );
}
