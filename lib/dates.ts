export function toLocalizedString(date: Date): string {
    return date.toLocaleDateString("ru-RU", {
        day: "numeric",
        month: "long",
        year: "numeric",
    });
}
