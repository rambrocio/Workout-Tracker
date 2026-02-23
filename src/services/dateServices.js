import { format } from 'date-fns';

export function formatDate(date) {
    if (!date) {
        return ("");
    }

    // New variable to ensure date is in local time and not 1 day behind
    const localDate = new Date(date.replace(/-/g, '\/'));
    
    return format(new Date(localDate), 'MM/dd/yyyy');
}