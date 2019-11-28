
const sortListHelper = (a, b, field) => {
    if (a[field] > b[field]) {
        return 1;
    };
    if (a[field] < b[field]) {
    return -1;
    };
    return 0;
};

export default sortListHelper