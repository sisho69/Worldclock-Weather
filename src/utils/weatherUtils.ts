export function getWeatherIcon(weather: string): string {
    const base = import.meta.env.BASE_URL || '/'; // 画像参照用
    const lowerweather = weather.toLowerCase();

    switch (lowerweather) {
        case "clear":
        case "sunny":
            return `${base}/icons/sunny.png`; // ${base}でgithub pageで参照させる
        case "clouds":
        case "cloudy":
            return `${base}/icons/cloudy.png`;
        case "rain":
             return `${base}/icons/rainy.png`;
        case "drizzle":
            return `${base}/icons/rainy.png`;
        default:
            return `${base}/icons/cloudy.png`;
        case "night":  // timegradientとの連携用
            return `${base}/icons/night.png`;
        case "morning":  
            return `${base}/icons/sunny.png`;
        case "day":  
            return `${base}/icons/sunny.png`;
        case "evening":
            return `${base}/icons/cloudy.png`;
    }
}