import css from './SidebarNotes.module.css';
import Link from 'next/link';

const categories = ['Todo', 'Work', 'Personal', 'Meeting', 'Shopping'];

export default function SidebarNotes() {
  console.log(categories);
  return (
    <ul className={css.menuList}>
      <li className={css.menuItem}>
        <Link href="/notes/filter/all" className={css.menuLink}>
          All notes
        </Link>
      </li>
      {categories.map(category => (
        <li key={category} className={css.menuItem}>
          <Link href={`/notes/filter/${category}`} className={css.menuLink}>
            {category}
          </Link>
        </li>
      ))}
    </ul>
  );
}
