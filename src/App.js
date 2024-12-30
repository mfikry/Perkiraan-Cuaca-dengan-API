import { useEffect, useState } from "react";
import "./App.css";
import humidity from "./assets/humidity.png";
import rain from "./assets/rain.png";
import wind from "./assets/wind.png";

function App() {
  const [input, setInput] = useState("");
  const [term, setTerm] = useState("Jakarta");
  const [data, setData] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetch(
      `https://api.openweathermap.org/data/2.5/weather?q=${term}&appid=ff89d2aba6518cdcc3bdb4563ea5800a&units=metric`
    )
      .then((response) => response.json())
      .then((datas) => {
        if (datas.cod === "404") {
          setError("City not found. Please try another city.");
          setData(null);
        } else {
          setData(datas);
          setError(null);
        }
      })
      .catch(() => {
        setError("An error occurred. Please try again later.");
        setData(null);
      });
  }, [term]);

  // Optional Chaining (?.) untuk semua akses properti objek data, data.weather, dan data.main untuk menghindari kesalahan saat properti tidak ada.
  // Pengecekan gambar: Jika data.weather?.[0]?.icon tidak ada, maka gambar default (default.png) akan ditampilkan.
  // Error handling: Menambahkan catch pada fetch untuk menangani kesalahan API (misalnya jika permintaan gagal atau jika kota tidak ditemukan).

  // Menampilkan loading jika data belum tersedia
  // if (!data) {
  //   return <div>Loading...</div>; // Tampilkan loading ketika data belum ada
  // }

  return (
    <div className="flex h-screen justify-center items-center bg-with-image ">
      <div
        className={`${
          data && data.weather[0].icon.slice(-1) === "n"
            ? "bg-malam"
            : "bg-siang"
        } w-[500px] h-[600px] rounded-[50px] p-8 transition ease-in-out delay-1500 hover:-translate-y-1 hover:scale-110 duration-300 shadow-lg shadow-rose-950`}
      >
        <div className="flex justify-between items-center gap-3">
          <input
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                setTerm(input); // Set kota berdasarkan input
                setInput(""); // Kosongkan input
              }
            }}
            type="text"
            placeholder="Search"
            className="py-2 px-4  rounded-full text-[14px] text-slate-400 w-full outline-none focus:shadow-lg focus:shadow-slate-500"
          />
          <div
            onClick={() => {
              setTerm(input);
              setInput("");
            }}
            className="bg-white rounded-full p-2 hover:scale-110 cursor-pointer"
          >
            <svg
              className="text-slate-400 w-[20px]"
              data-name="Layer 1"
              fill="currentcolor"
              id="Layer_1"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <title />
              <path d="M16.57,16.15A9,9,0,1,0,15,17.46h0l6.25,6.25,1.42-1.42Zm-3-.14a7.07,7.07,0,1,1,1.56-1.28A6.88,6.88,0,0,1,13.59,16Z" />
            </svg>
          </div>
        </div>

        <div className="flex justify-center mt-5">
          {data?.weather?.[0]?.icon ? (
            <img
              width={150}
              height={150}
              src={require(`./assets/${data.weather[0].icon}.png`)}
              alt="weather icon"
            />
          ) : (
            <p className="text-white">Error! icon...</p>
          )}
        </div>

        <div className="flex justify-center mt-1 text-[70px] text-white font-bold ">
          {data?.main?.temp ? `${data.main.temp} °C` : "Error!..."}
        </div>

        <div className="mt-[-10px] font-display text-white flex flex-col justify-center items-center">
          <div className="text-[40px] font-bold">
            {data?.name || "Error!..."}
          </div>
          <div className="text-[24px]">Precipitations</div>
          <div className="flex gap-6">
            <span>
              Min:{" "}
              {data?.main?.temp_min ? `${data.main.temp_min} °C` : "Error!..."}
            </span>
            <span>
              Max:{" "}
              {data?.main?.temp_max ? `${data.main.temp_max} °C` : "Error!..."}
            </span>
          </div>
        </div>

        <div className="mt-10 p-4 relative rounded-full flex justify-between">
          <div className="absolute top-0 bottom-0 left-0 right-0 bg-[#001026] opacity-30 w-full rounded-full"></div>
          <div className=" flex z-10 text-white gap-2 text-[20px]">
            <img src={rain} className="opacity-100" width={30} alt="" />
            <span>
              {data?.main?.humidity ? `${data.main.humidity}%` : "Error!..."}
            </span>
          </div>
          <div className=" flex z-10 text-white gap-2 text-[20px]">
            <img src={humidity} className="opacity-100" width={30} alt="" />
            <span>
              {data?.clouds?.all ? `${data.clouds.all}%` : "Error!..."}
            </span>
          </div>
          <div className=" flex z-10 text-white gap-2 text-[20px]">
            <img src={wind} className="opacity-100" width={30} alt="" />
            <span>
              {data?.wind?.speed ? `${data.wind.speed} km/h` : "Error!..."}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
