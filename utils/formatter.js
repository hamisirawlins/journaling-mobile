//capitalize the first letter of a string
export const capitalizeFirstLetter = (string) => {
    return string.charAt(0).toUpperCase() + string.slice(1);
}

//format a date string
export const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString();
}

