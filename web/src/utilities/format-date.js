import dayjs from "dayjs";

// Produce el día de la semana de una fecha de dayjs
const getWeekday = (rawDate) => {
    // Se parsea la fecha en un objeto dayjs
    const date = dayjs(rawDate);

    // En base el día de la semana en inglés condicionalmente
    // se producen los valores en español
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

// Produce el mes una fecha de dayjs
const getMonth = (rawDate) => {
    // Se parsea la fecha en un objeto dayjs
    const date = dayjs(rawDate);

    // En base el mes en inglés condicionalment se producen
    // los valores en español
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
    // Se parsea la fecha en un objeto dayjs
    const date = dayjs(rawDate);

    // Se lee el día de la semana
    const weekday = getWeekday(rawDate);

    // Se lee el día
    const day = date.format("D");

    // Se lee el mes
    const month = getMonth(rawDate);

    // Se lee el año
    const year = date.format("YYYY");

    // Se concatenan los datos en un formato conveniente
    const formatted = `${weekday} ${day} de ${month} de ${year}`;

    return formatted;
};

export default formatDate;