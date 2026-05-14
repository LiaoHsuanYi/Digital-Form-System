export function formatNow(mode = 'minute') {
    const d = new Date();
    const pad = (n) => String(n).padStart(2, '0');
    const date =
        `${d.getFullYear()}-${pad(d.getMonth() + 1)}-${pad(d.getDate())}`;
    
    if (mode === 'date') 
    {
        return date;
    }
    return `${date}T${pad(d.getHours())}:${pad(d.getMinutes())}`;
}
