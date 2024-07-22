export const delay = (ms: number) =>
    new Promise((res) => {
        setTimeout(res, ms);
    });

export function formatDate(dateString: string) {
    const date = new Date(dateString);
    const hours = date.getHours().toString().padStart(2, '0');
    const minutes = date.getMinutes().toString().padStart(2, '0');
    const day = date.getDate().toString().padStart(2, '0');
    const month = (date.getMonth() + 1).toString().padStart(2, '0'); // getMonth() is zero-based
    const year = date.getFullYear();
    return `${hours}:${minutes} ${day}/${month}/${year}`;
}