import { useEffect, useState} from "react";
import TimeGradient from "./timeGradient";

    type Props = {
        city: string; //表示用都市名
        timezone: string; //APIで使うタイムゾーン
    };

    export default function WorldClock({ city, timezone }: Props) {
        const [time, setTime] = useState<Date | null>(null);

        // 時間帯を返す関数
        function getTimeofDay(date: Date): string {
            const hour = date.getHours();

            if (hour >=5 && hour < 11) return "morning";
            if (hour >=11 && hour < 17) return "day";
            if (hour >= 17 && hour <20) return "evening";
            return "night";
        }

        // タイムゾーン取得
        const updateTime = () => {
            const now = new Date();
            setTime(now);
        };


        // 1秒ごとに時刻を進める
        useEffect(() => {
            updateTime(); //初回実行
            const interval = setInterval(updateTime, 1000);
            return () => clearInterval(interval);
        }, []);

        const localTime = time
            ? time.toLocaleTimeString("ja-JP", { hour12: false})
        : "読み込み中...";

        const localDate = time
        ? time.toLocaleDateString("ja-JP", {
            year: "numeric",
            month: "2-digit",
            day: "2-digit",
        })
        : "";

        // 時間帯を計算
        const timeofDay = time ? getTimeofDay(time) : "day";
        
        return (
            <TimeGradient timezone={timezone} timeofDay={timeofDay}> 
            <div /* カードのカラー情報 */
            style={{
                borderRadius: "12px",
                padding: "16px",
                margin: "12px",
                width: "220px",
                textAlign: "center",
                background: "transparent",
            }}
        >
            <h2>{city}</h2>
            <p>{localDate}</p>
            <p>{localTime}</p>
        </div>
        </TimeGradient>
        );
    }