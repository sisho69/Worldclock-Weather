import  React from "react";
import { getWeatherIcon } from "../utils/weatherUtils";

type Props = {
    timezone: string;
    timeofDay: "sunny" | "cloudy" | "Rain" | "Snowy" | "Drizzle" | "Thunderstorm"| string;
    children?: React.ReactNode;
}

const TimeGradient = ({ timezone, timeofDay, children }: Props) => {
    const now = new Date();
    const formatter = new Intl.DateTimeFormat("ja-JP", {
        hour: "numeric",
        timeZone: timezone,
        hour12: false,
    });
    const hour = parseInt(formatter.format(now), 10);

let gradient = ""; //時間帯ごとのグラデーションを定義

if (hour >= 4 && hour < 7) {
    gradient = "linear-gradient(135deg, #5bbbd3ff, #2a5298)"; // 明け方
} else if (hour >= 7 && hour < 11) {  
    gradient = "linear-gradient(135deg, #5a90ecff, #fda085)"; // 朝
} else if (hour >= 11 && hour < 17) {
    gradient = "linear-gradient(135deg, #89f7fe, #66a6ff)";  // 昼
} else if (hour >= 17 && hour < 21) {
    gradient = "linear-gradient(135deg, #d6796dff, #576ff5ff)";  // 夕方
} else {
    gradient = "linear-gradient(135deg, #141e30, #243b55)"; // 夜
}

const cardStyle: React.CSSProperties = {
    background: gradient,
    borderRadius: "12px",
    padding: "2rem",
    color: "white",
    transition: "background 2s ease-in-out",
    position: "relative",
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
};

return (
    <div style={cardStyle} className="time-gradient">
        {/*メインコンテンツ*/}
        <div style={{ flex: 1, zIndex: 1 }}>
            {children}
        </div>


        {/*背景アイコン用画像*/}
            <img
                src={getWeatherIcon(timeofDay)}
                alt=""
                style={{
                    width: "100px",
                    opacity: 0.7,
                    pointerEvents: "none",
                }}
        />
    </div>
    );
};

export default TimeGradient;