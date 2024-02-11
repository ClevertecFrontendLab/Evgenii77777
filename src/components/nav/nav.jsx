import styles from './nav.module.css';
import Heart from './assets/heart.svg';
import Calendar from './assets/calendar.svg';
import Profile from './assets/profile.svg';
import Cup from './assets/cup.svg';
import Exit from './assets/exit.svg';

const items = [
    {
        icon: Calendar,
        label: 'Календарь',
    },
    {
        icon: Heart,
        label: 'Тренировки',
    },
    {
        icon: Cup,
        label: 'Достижения',
    },
    {
        icon: Profile,
        label: 'Профиль',
    },
    {
        icon: Exit,
        label: 'Выход',
    },
];

export const Nav = ({ collapsed }) => (
    <>
        {items.map((el) => (
            <li key={el.label} className={!collapsed ? styles.item : styles.itemMini}>
                <img src={el.icon} alt={el.label} className={styles.icon} />
                {!collapsed && <span className={styles.tag}>{el.label}</span>}
            </li>
        ))}
    </>
);
