import WorldClock from "./worldClock"
import "./Worldclocklist.css"

export default function WorldClockList() {
    const cities = [
        { city: "東京", timezone: "Asia/Tokyo"},
        { city: "ロンドン", timezone: "Europe/London"},
        { city: "ニューヨーク", timezone: "America/New_York"},
        { city: "シドニー", timezone: "Australia/Sydney"},
    ];

    return (
        <div className="worldClockContainer">
            {cities.map((item) => (
                    <WorldClock
                    key={item.timezone}
                    city={item.city}
                    timezone={item.timezone}
                />
                ))}
            </div>
    );
    }