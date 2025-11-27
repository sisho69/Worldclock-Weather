import WorldClockList from "./components/worldclocklist";
import WeatherIcon from "./components/weathericon";

export default function App() {

  // 都市表示リスト
  const cities = ["Tokyo", "London", "New_York", "Sydney"];
  return(
    <>
  <WorldClockList />

  {/* 天気カードまとめ */}
  <div
    style={{
      display: "flex",
      gap: "20px",
      flexWrap: "wrap",
      marginTop: "20px",
    }}
    >
      {cities.map((city) => (
        key={city}
        style={{
          background: "#222",
          padding: "16px",
          borderRadius: "12px",
          color: "white",
          textAlign: "center",
        }}
      >
      <h3>{city}</h3>
      <WeatherIcon CITY={city} delayMs={200} />
    </div>
      ))}
    </div>
  </>
  );
}