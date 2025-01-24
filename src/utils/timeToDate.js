export function convertTimeToDate(timeStr) {
    const [time, period] = timeStr.split(' ');
    const [hours, minutes] = time.split(':');

    const date = new Date();
    date.setHours(
        period === 'PM' ?
            (hours === '12' ? 12 : parseInt(hours) + 12) :
            (hours === '12' ? 0 : parseInt(hours))
    );
    date.setMinutes(parseInt(minutes));
    date.setSeconds(0);
    return date;
}