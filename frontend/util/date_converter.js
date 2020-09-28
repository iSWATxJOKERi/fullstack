const dateConverter = (uglyDate) => {
    let fakeHalf = uglyDate.split("T");
    let realHalf = fakeHalf[0].split("-");

    let realDate = MONTHS[realHalf[1]] + ", " + realHalf[2] + " " + realHalf[0];

    return realDate;
}

const MONTHS = {
    "01": "January",
    "02": "February",
    "03": "March",
    "04": "April",
    "05": "May",
    "06": "June",
    "07": "July",
    "08": "August",
    "09": "September",
    "10": "October",
    "11": "November",
    "12": "December"
}

export default dateConverter;

