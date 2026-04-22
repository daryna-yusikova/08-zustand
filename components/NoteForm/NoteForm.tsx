'use client';

import css from './NoteForm.module.css';
import { useId } from 'react';
import { useRouter } from 'next/navigation';
import type { NewNote } from '../../types/note';
import { createNote } from '../../lib/api';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useNoteStore } from '../../lib/store/noteStore';

export default function NoteForm() {
  const fieldID = useId();
  const router = useRouter();
  const queryClient = useQueryClient();

  const { draft, setDraft, clearDraft } = useNoteStore();

  const mutation = useMutation({
    mutationFn: createNote,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['notes'] });
      clearDraft();
      router.back();
    },
    onError: (error: Error) => {
      alert(`Failed to create note: ${error.message}`);
    },
  });

  const handleSubmit = (formData: FormData) => {
    const title = formData.get('title') as string;
    const content = formData.get('content') as string;
    const tag = formData.get('tag') as string;

    mutation.mutate({
      title,
      content,
      tag: tag as NewNote['tag'],
    });
  };

  const handleCancel = () => {
    router.back();
  };

  return (
    <form
      className={css.form}
      onSubmit={e => {
        e.preventDefault();
        handleSubmit(new FormData(e.currentTarget));
      }}
    >
      <div className={css.formGroup}>
        <label htmlFor={`${fieldID}-title`}>Title</label>
        <input
          id={`${fieldID}-title`}
          name="title"
          className={css.input}
          value={draft.title}
          onChange={e => setDraft({ title: e.target.value })}
          required
          minLength={3}
          maxLength={50}
        />
      </div>

      <div className={css.formGroup}>
        <label htmlFor={`${fieldID}-content`}>Content</label>
        <textarea
          id={`${fieldID}-content`}
          name="content"
          rows={8}
          className={css.textarea}
          value={draft.content}
          onChange={e => setDraft({ content: e.target.value })}
          maxLength={500}
        />
      </div>

      <div className={css.formGroup}>
        <label htmlFor={`${fieldID}-tag`}>Tag</label>
        <select
          id={`${fieldID}-tag`}
          name="tag"
          className={css.select}
          value={draft.tag}
          onChange={e => setDraft({ tag: e.target.value as NewNote['tag'] })}
        >
          <option value="Todo">Todo</option>
          <option value="Work">Work</option>
          <option value="Personal">Personal</option>
          <option value="Meeting">Meeting</option>
          <option value="Shopping">Shopping</option>
        </select>
      </div>

      <div className={css.actions}>
        <button
          type="button"
          className={css.cancelButton}
          onClick={handleCancel}
        >
          Cancel
        </button>

        <button
          type="submit"
          className={css.submitButton}
          disabled={mutation.isPending}
        >
          {mutation.isPending ? 'Creating...' : 'Create note'}
        </button>
      </div>
    </form>
  );
}
