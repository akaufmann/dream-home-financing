import { useRef } from "react";
import Highcharts from "highcharts/highstock";
import HighchartsReact from "highcharts-react-official";
import useSWR from "swr";
import Image from 'next/image'
import Link from "next/link";

import s from "./index.module.css";

const fetcher = (url: URL) => fetch(url).then((res) => res.json());

export default function Home() {
  const chartRef = useRef<HighchartsReact.RefObject>(null);
  const { data: _data, error } = useSWR("/api/interest", fetcher);

  if (error) return <div>Fehler beim laden</div>;
  if (!_data) return <div>Laden...</div>;

  const data = (_data.result as [{ period: number; interest: number }])
    .map(({ period, interest }) => [new Date(period).getTime(), interest])
    .sort();

  const chartOptions = createChartOptions(data);

  return (
    <div className={`bg-indigo-700 md:flex ${s.homeContainer}`}>
      <div className="w-1/2 flex flex-col justify-center ml-16">
        <h1 className="text-5xl font-bold text-white">
          <span className="text-orange-500">Dream</span> Home
          <br />
          Financing
        </h1>
        <div className="partners mt-16">
          <h2 className="text-white font-bold">Unsere Finanzierungspartner</h2>
          <div className="md:flex mt-3">
            <div className="mr-6">
              <Image
                alt="Commerzbank"
                src="/images/combank.webp"
                className="bg-indigo-300 rounded-md"
                width={120}
                height={120}
              />
            </div>
            <div className="mr-6">
              <Image
                alt="ING"
                src="/images/ing.webp"
                className="bg-indigo-300 rounded-md"
                width={120}
                height={120}
              />
            </div>
            <div className="mr-6">
              <Image
                alt="Sparkasse"
                src="/images/sparkasse.webp"
                className="bg-indigo-300 rounded-md"
                width={120}
                height={120}
              />
            </div>
            <div className="mr-6">
              <Image
                alt="Allianz"
                src="/images/allianz.webp"
                className="bg-indigo-300 rounded-md"
                width={120}
                height={120}
              />
            </div>
          </div>
        </div>
      </div>
      <div className="w-1/2 grid grid-cols-2 gap-4 auto-rows-fr mr-4">
        <div className="p-8 text-white bg-indigo-900 rounded-b-xl">
          <h2 className="text-xl font-bold mb-6">Aktuelle Zinsentwicklung</h2>
          Wie haben sich die Zinsen entwickelt? Wie sehen die Prognosen aus? Hier bekommen Sie den Überblick.
          <br/>
          <Link href="#" className=""><a className="border p-4 mt-16 block text-center rounded-md">Jetzt über Zinsen informieren</a></Link>
        </div>
        <div className="bg-white rounded-b-xl relative">
        <Image
          alt="your dream home"
          src="/images/home.jpg"
          className="rounded-b-xl"
          width={600}
          height={500}
          layout="fill"
          objectFit="cover"
        />
        </div>
          <div className="bg-orange-100 p-8 rounded-t-xl">
            <HighchartsReact
              highcharts={Highcharts}
              options={chartOptions}
              constructorType="chart"
              height="100%"
              ref={chartRef}
            />
          </div>
        <div className="bg-orange-500 text-white p-8 rounded-t-xl">
        <h2 className="text-xl font-bold mb-6">Zins-Check</h2>
          Vergleichen Sie erste Angebote auf der Grundlage der aktuellen Bauzinsen.
          <br/>
          <Link href="#" className=""><a className="border p-4 mt-16 block text-center">Zins berechnen</a></Link>
        </div>
      </div>
    </div>
  );
}


function createChartOptions(data: number[][]): Highcharts.Options {
  return {
    chart: {
      backgroundColor: undefined,
    },
    title: {
      text: "",
    },
    xAxis: {
      crosshair: true,
      type: "datetime",
      tickInterval: 24 * 3600 * 1000 * 30,
      labels: {
        style: {
          fontWeight: "bold",
        },
      },
      lineColor: '#777',
      gridLineColor: '#ffc699',
      gridLineWidth: 1,
    },
    tooltip: {
      shape: "square",
      borderWidth: 0,
      backgroundColor: "#ee7900",
      shadow: false,
      style: {
        color: "#fff",
      },
      useHTML: true,
      formatter: function () {
        if (this.y) {
          return `${Highcharts.numberFormat(this.y, 2)} %`;
        }
      },
      positioner: function (boxWidth, boxHeight, point) {
        return { x: point.plotX - 10, y: point.plotY };
      },
    },
    yAxis: {
      title: {
        text: "",
      },
      labels: {
        format: "{value:.2f}%",
        style: {
          fontWeight: "bold",
        },
      },
      gridLineColor: '#ffc699'
    },
    legend: {
      enabled: false,
    },
    plotOptions: {
      series: {
        marker: {
          enabled: false,
          states: {
            hover: {
              enabled: false,
            },
          },
        },
      },
    },
    credits: {
      enabled: false,
    },
    series: [
      {
        color: "#ee7900",
        type: "line",
        data,
      },
    ],
  };
}
