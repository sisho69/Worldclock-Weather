import { useEffect, useState, useRef} from "react";
import { getWeatherIcon } from "../utils/weatherUtils"; 

type WeatherMain = 
| "Clear" 
| "Clouds" 
| "Rain" 
| "Snow" 
| "Drizzle" 
| "Thunderstorm" 
| string;


// OpenWeatherMap APIのレスポンス型
type weatherAPIResponse = {
    weather: { main: WeatherMain }[];
};

type Props = {
    CITY: string;
    delayMs?: number; // API叩き遅延
};

const API_KEY = "46661e20cbe4ed1befb7d8b5dfe3a068";

export default function WeatherIcon({ CITY, delayMs = 0 }: Props) {
    const [weatherMain, setWeatherMain] = useState<WeatherMain>("Clear");
    const [iconSrc, setIconSrc] = useState("/icons/default.png");

    // メモリキャッシュ
    const cacheRef = useRef<{
        data: weatherAPIResponse;
        timestamp: number;
    } | null>(null);

    useEffect(() => { 
        fetchWeather();
    }, [CITY]);

    async function fetchWeather() {
        // API呼び出し遅延
        await new Promise(res => setTimeout(res,delayMs));

        // メモリキャッシュチェック
        const CACHE_TIME = 10 * 60 * 1000; // 10分

        if (
            cacheRef.current && Date.now() - cacheRef.current.timestamp < CACHE_TIME) {
            const main: WeatherMain = cacheRef.current.data.weather[0].main;
            setWeatherMain(main);
            setIconSrc(getWeatherIcon(main));
            return;
        }
    
    // API呼び出し
    try {
        const url = `https://api.openweathermap.org/data/2.5/weather?q=${CITY}&appid=${API_KEY}`;
        const res = await fetch(url);

        if (!res.ok) {
            throw new Error(`HTTP error! status: ${res.status}`);
        }

        const data = await res.json();
        const main: WeatherMain = data.weather[0].main;

        setWeatherMain(main);
        setIconSrc(getWeatherIcon(main));

        // メモリキャッシュ保存
        cacheRef.current = {
            data: data,
            timestamp: Date.now()
        };
    } catch (e) {
        console.error("天気API取得失敗:", e);
        // デフォルト値を設定
        setWeatherMain("Clear");
        setIconSrc(getWeatherIcon("Clear"));
    }
}

    return <img src={iconSrc} alt={weatherMain} width={120} />;
}