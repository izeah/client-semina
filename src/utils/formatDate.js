export function formatDate(date) {
    const d = new Date(date);
    const dtf = new Intl.DateTimeFormat("id", {
        year: "numeric",
        month: "long",
        day: "2-digit",
    });

    const [{ value: day }, , { value: month }] = dtf.formatToParts(d);

    return `${day} ${month}`;
}

export function formatFullDate(date) {
    const d = new Date(date);
    const dtf = new Intl.DateTimeFormat("id", {
        year: "numeric",
        month: "long",
        day: "2-digit",
    });

    const [{ value: day }, , { value: month }, , { value: year }] =
        dtf.formatToParts(d);

    return `${day} ${month} ${year}`;
}
