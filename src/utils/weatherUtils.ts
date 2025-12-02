export function getWeatherIcon(weather: string): string {
    switch (weather) {
        case "Clear":
        case "sunny":
            return `./icons/${weather}.png`;
        case "Clouds":
        case "cloudy":
            return `./icons/${weather}.png`;
        case "Rain":
        case "Drizzle":
            return `./icons/${weather}.png`;
        default:
            return `./icons/${weather}.png`;
    }
}