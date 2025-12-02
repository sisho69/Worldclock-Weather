export function getWeatherIcon(weather: string): string {
    const lowerweather = weather.toLowerCase();

    switch (lowerweather) {
        case "clear":
        case "sunny":
            return "/icons/sunny.png";
        case "clouds":
        case "cloudy":
            return "/icons/cloudy.png";
        case "rain":
             return "/icons/rainy.png";
        case "drizzle":
            return "/icons/rainy.png";
        default:
            return "/icons/cloudy.png";
        case "night":  // timegradientとの連携用
            return "/icons/night.png";
        case "morning":  
            return "/icons/sunny.png";
        case "day":  
            return "/icons/sunny.png";
        case "evening":
            return "/icons/cloudy.png";
    }
}