import { useEffect, useState } from "react";

type WeatherMain = 
| "Clear" 
| "Clouds" 
| "Rain" 
| "Snow" 
| "Drizzle" 
| "Thunderstorm" 
| string;

type Props = {
    CITY: string;
    delayMs?: number; // API叩き遅延
};

const API_KEY = "46661e20cbe4ed1befb7d8b5dfe3a068";

export default function WeatherIcon({ CITY, delayMs = 0 }: Props) {
    const [weatherMain, setWeatherMain] = useState<WeatherMain>("Clear");
    const [iconSrc, setIconSrc] = useState("/icons/default.png");

    // 天気APIの取得
    useEffect(() => { 
        fetchWeather();
    }, []);

    async function fetchWeather() {
        // API呼び出し遅延
        await new Promise(res => setTimeout(res,delayMs));

        // ローカルキャッシュ
        const CACHE_TIME = 10 * 60 * 1000; // 10分
        const cache = localStorage.getItem(`weather_${CITY}`);
        const cacheTime = localStorage.getItem(`weather_time_${CITY}`);

        if (cache && cacheTime && Date.now() - Number(cacheTime) < CACHE_TIME) {
            const data = JSON.parse(cache);
            const main: WeatherMain = data.weather[0].main;
            setWeatherMain(main);
            setIconSrc(getIcon(main));
            return;
        }
    
    // API呼び出し
    try {
        const url = `https://api.openweathermap.org/data/2.5/weather?q=${CITY}&appid=${API_KEY}`;
        const res = await fetch(url);
        const data = await res.json();

        const main: WeatherMain = data.weather[0].main;
        setWeatherMain(main);
        setIconSrc(getIcon(main));

        // キャッシュ保存
        localStorage.setItem(`weather_${CITY}`, JSON.stringify(data));
        localStorage.setItem(`weather_time_${CITY}`, Date.now().toString());
    } catch (e) {
        console.error("天気API取得失敗", e);
    }
}

    // 天気ごとのアイコン対応表
    function getIcon(w: WeatherMain): string {
        switch (w) {
            case "Clear":
                return "/icons/sunny.png";
            case "Clouds":
                return "/icons/cloudy.png";
            case "Rain":
            case "Drizzle":
                return "/icons/rainy.png";
            default:
                return "/icons/default.png";
        }
    }

    return (
        <img src={iconSrc} alt={weatherMain} width={120} />
    );
}