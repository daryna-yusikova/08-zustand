import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import type { NewNote } from '../../types/note';

const initialDraft: NewNote = {
  title: '',
  content: '',
  tag: 'Todo',
};

interface NoteState {
  draft: NewNote;
  setDraft: (data: Partial<NewNote>) => void;
  clearDraft: () => void;
}

export const useNoteStore = create<NoteState>()(
  persist(
    set => ({
      draft: initialDraft,

      setDraft: data =>
        set(state => ({
          draft: { ...state.draft, ...data },
        })),

      clearDraft: () => set({ draft: initialDraft }),
    }),
    {
      name: 'note-draft', // ключ у localStorage
    }
  )
);
