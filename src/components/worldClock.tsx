import { useEffect, useState, useCallback } from "react";
import TimeGradient from "./timeGradient";

    type Props = {
        city: string; //表示用都市名
        timezone: string; //APIで使うタイムゾーン
    };

    export default function WorldClock({ city, timezone }: Props) {
        const [time, setTime] = useState<Date | null>(null);
        const [error, setError] = useState<string | null>(null);

        // 時間帯を返す関数
        function getTimeofDay(date: Date): string {
            const hour = date.getHours();

            if (hour >=5 && hour < 11) return "morning";
            if (hour >=11 && hour < 17) return "day";
            if (hour >= 17 && hour <20) return "evening";
            return "night";
        }

        // 初回API呼び出し
        const fetchTime = useCallback(() => {
            fetch(`https://timeapi.io/api/Time/current/zone?timeZone=${timezone}`)
                .then((res) => {
                    if (!res.ok) throw new Error(`HTTPエラー: ${res.status}`);
                    return res.json();
                })
                .then((data) => {
                    setTime(new Date(data.dateTime));
                    setError(null);
                })
                .catch((err) => {
                    console.error("API取得エラー:", err);
                    setError("時刻の取得に失敗しました");
                });
        }, [timezone]);

        // 1秒ごとに時刻を進める
        useEffect(() => {
            fetchTime(); //初回実行
            const interval = setInterval(fetchTime, 60000);
            return () => clearInterval(interval);
        }, [fetchTime]);

        if (error) {
            return (
                <div
                style={{
                    border: "1px solid red",
                    borderRadius: "8px",
                    padding: "12px",
                    margin: "10px",
                    width: "220px",
                    textAlign: "center",
               }}
               >
                <h2>{city}</h2>
                <p style={{ color: "red"}}>{error}</p>
               </div>
            );
        }

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
            <div
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