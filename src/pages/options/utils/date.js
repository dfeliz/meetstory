
const weekDays = [
    'Dom',
    'Lun',
    'Mar',
    'Mie',
    'Jue',
    'Vie',
    'Sab',
];

const months = [
    'Ene',
    'Feb',
    'Mar',
    'Abr',
    'May',
    'Jun',
    'Jul',
    'Ago',
    'Sep',
    'Oct',
    'Nov',
    'Dic',
];

export const formatDate = (dateStr) => {
    if (dateStr) {
        const date = new Date(dateStr);

        const dayNum = date.getDate();
        const dayStr = weekDays[date.getDay()];
        const monthStr = months[date.getMonth()];
        const fullYear = date.getFullYear();

        return `${dayStr} ${dayNum} ${monthStr}, ${fullYear}`;
    }
}
