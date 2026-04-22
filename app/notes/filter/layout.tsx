import css from './LayoutNotes.module.css';

interface NotesLayoutProps {
  children: React.ReactNode;
  sidebar: React.ReactNode;
}

export default function NotesLayout({ sidebar, children }: NotesLayoutProps) {
  return (
    <section className={css.container}>
      <aside className={css.sidebar}>{sidebar}</aside>
      <div className={css.notesWrapper}>{children}</div>
    </section>
  );
}
