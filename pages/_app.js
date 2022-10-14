import '../styles/globals.css'

if (typeof Highcharts === 'object') {
  Highcharts.setOptions({
    lang: {
      decimalPoint: ",",
      thousandsSep: ".",
      loading: "Daten werden geladen...",
      months: [
        "Januar",
        "Februar",
        "März",
        "April",
        "Mai",
        "Juni",
        "Juli",
        "August",
        "September",
        "Oktober",
        "November",
        "Dezember",
      ],
      weekdays: [
        "Sonntag",
        "Montag",
        "Dienstag",
        "Mittwoch",
        "Donnerstag",
        "Freitag",
        "Samstag",
      ],
      shortMonths: [
        "Jan",
        "Feb",
        "Mär",
        "Apr",
        "Mai",
        "Jun",
        "Jul",
        "Aug",
        "Sep",
        "Okt",
        "Nov",
        "Dez",
      ],
    },
  });
}

function MyApp({ Component, pageProps }) {
  return <Component {...pageProps} />
}

export default MyApp
