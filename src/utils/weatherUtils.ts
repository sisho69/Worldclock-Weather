export function getWeatherIcon(w: string): string {
    switch (w) {
        case "Clear":
        case "sunny":
            return "/icons/sunny.png";
        case "Clouds":
        case "cloudy":
            return "/icons/cloudy.png";
        case "Rain":
        case "Drizzle":
            return "/icons/rainy.png";
        default:
            return "/icons/default.png";
    }
}