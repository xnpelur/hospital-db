export function toLocalizedString(date: Date): string {
    return date.toLocaleDateString("ru-RU", {
        day: "numeric",
        month: "long",
        year: "numeric",
    });
}

export function getToday() {
    let date = new Date();
    date = new Date(date.getFullYear(), date.getMonth(), date.getDate());
    return date;
}

export function getDateAfterNDays(date: Date, days: number): Date {
    date.setDate(date.getDate() + days);
    return date;
}
