import WorldClock from "./worldClock";

export default function WorldClockList() {
    const cities = [
        { city: "東京", timezone: "Asia/Tokyo"},
        { city: "ロンドン", timezone: "Europe/London"},
        { city: "ニューヨーク", timezone: "America/New_York"},
        { city: "シドニー", timezone: "Australia/Sydney"},
    ];

    return (
        <div
            style={{
                display: "flex",
                flexDirection: "column", //縦並びにする
                alignItems: "center",
                gap: "16px", // カード間の隙間
                minHeight: "100vh",
                justifyContent: "center",
                backgroundColor: "#111"
            }}
            >
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