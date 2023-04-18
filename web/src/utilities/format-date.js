import dayjs from "dayjs";

const getWeekday = (rawDate) => {
    const date = dayjs(rawDate);

    switch (date.format("dddd")) {
        case "Monday":
            return "lunes";

        case "Tuesday":
            return "martes";

        case "Wednesday":
            return "miércoles";

        case "Thursday":
            return "jueves";

        case "Friday":
            return "viernes";

        case "Saturday":
            return "sábado";

        case "Sunday":
            return "domingo";
    }
};

const getMonth = (rawDate) => {
    const date = dayjs(rawDate);

    switch (date.format("MMMM")) {
        case "January":
            return "enero";

        case "February":
            return "febrero";

        case "March":
            return "marzo";

        case "April":
            return "abril";

        case "May":
            return "mayo";

        case "June":
            return "junio";

        case "July":
            return "julio";

        case "August":
            return "agosto";

        case "September":
            return "setiembre";

        case "October":
            return "octubre";

        case "November":
            return "noviembre";

        case "December":
            return "diciembre";
    }
};

const formatDate = (rawDate) => {
    const date = dayjs(rawDate);

    const weekday = getWeekday(rawDate);
    const day = date.format("D");
    const month = getMonth(rawDate);
    const year = date.format("YYYY");

    const formatted = `${weekday} ${day} de ${month} de ${year}`;

    return formatted;
};

export default formatDate;