import  React from "react";

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
    gradient = "linear-gradient(135deg, #f093fb, #f5576c)";
} else {
    gradient = "linear-gradient(135deg, #141e30, #243b55)";
}

const cardStyle: React.CSSProperties = {
    background: gradient,
    borderRadius: "12px",
    padding: "2rem",
    color: "white",
    transition: "background 2s ease-in-out",
};

const iconPath: Record<Props["timeofDay"], string> = {
    sunny: "/icons/sunny.png",
    morning: "/icons/morning.png",
    day: "/icons/day.png",
    evening: "/icons/evening.png",
    night: "/icons/night.png",
};

return (
    <div style={cardStyle} className="time-gradient">
        {/*背景アイコン用画像*/}
        <img
            src={iconPath[timeofDay]}
            alt=""
            style={{
                position: "absolute",
                bottom: "8px",
                right: "8px",
                width: "80px",
                opacity: "0.25", //半透明
                pointerEvents: "none"                
            }}
        />

        {/* メインコンテンツ */}
        {children}
    </div>
    );
};

export default TimeGradient;