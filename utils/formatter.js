//capitalize the first letter of a string
export const capitalizeFirstLetter = (string) => {
    return string.charAt(0).toUpperCase() + string.slice(1);
}

//format a date string
export const formatDate = (dateString) => {
    const date = new Date(dateString);
    
    const days = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
    const months = [
        'Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun',
        'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'
    ];
    
    const dayOfWeek = days[date.getDay()];
    const dayOfMonth = date.getDate();
    const month = months[date.getMonth()];
    const year = date.getFullYear();
    const hours = date.getHours();
    const minutes = date.getMinutes();

    const ordinalSuffix = (n) => {
        const s = ["th", "st", "nd", "rd"],
              v = n % 100;
        return n + (s[(v - 20) % 10] || s[v] || s[0]);
    };

    const formatHours = (hours) => {
        const period = hours >= 12 ? 'p.m.' : 'a.m.';
        const formattedHours = hours % 12 || 12; // Convert 0 to 12 for 12-hour format
        return `${formattedHours} ${period}`;
    };

    return `${dayOfWeek}, ${ordinalSuffix(dayOfMonth)} ${month} ${formatHours(hours)}`;
};

//format card text
export const formatCardText = (content) => {
    return content.length > 80 ? content.substring(0, 80) + '...' : content;
};


