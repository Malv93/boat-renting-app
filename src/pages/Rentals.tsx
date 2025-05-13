import { useState } from "react";
import { useNavigate } from "react-router";
import {
  format,
  addMonths,
  subMonths,
  startOfMonth,
  endOfMonth,
  startOfWeek,
  endOfWeek,
  addDays,
  isSameMonth,
  isSameDay,
  isBefore,
} from "date-fns";
import { it } from "date-fns/locale";

// Mock data: booked dates by boat
const mockBookedDates: Record<string, string[]> = {
  "RS Zest": ["2025-05-15", "2025-05-20", "2025-06-03", "2025-06-10"],
  "RS Quest": ["2025-05-16", "2025-06-01", "2025-06-05", "2025-06-12"],
  "RS CAT14": ["2025-05-18", "2025-06-08", "2025-06-15"],
};

export default function RentalsPage() {
  const navigate = useNavigate();
  const today = new Date();
  const [selectedBoat, setSelectedBoat] = useState("");
  const [currentMonth, setCurrentMonth] = useState(startOfMonth(today));
  const [formData, setFormData] = useState({
    date: "",
    name: "",
    surname: "",
    tessera: "",
    email: "",
  });

  const boats = ["RS Zest", "RS Quest", "RS CAT14"];

  const handleBoatChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedBoat(e.target.value);
    setFormData({ ...formData, date: "" });
  };

  const handleFormChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    alert("Prenotazione effettuata con successo!");
    navigate("/");
  };

  const isBooked = (date: Date) =>
    selectedBoat &&
    mockBookedDates[selectedBoat]?.includes(format(date, "yyyy-MM-dd"));

  const isAvailable = (date: Date) =>
    selectedBoat && !isBooked(date) && !isBefore(date, today);

  const renderCalendar = () => {
    const monthStart = startOfMonth(currentMonth);
    const monthEnd = endOfMonth(currentMonth);
    const startDate = startOfWeek(monthStart, { weekStartsOn: 1 });
    const endDate = endOfWeek(monthEnd, { weekStartsOn: 1 });

    const days = [];
    let day = startDate;

    while (day <= endDate) {
      days.push(new Date(day));
      day = addDays(day, 1);
    }

    return (
      <>
        {/* Month Navigation */}
        <div className="flex justify-between items-center mb-4">
          <button
            onClick={() => setCurrentMonth(subMonths(currentMonth, 1))}
            className="text-blue-700 hover:underline"
          >
            ← Mese precedente
          </button>
          <h2 className="text-lg font-semibold">
            {format(currentMonth, "MMMM yyyy", { locale: it })}
          </h2>
          <button
            onClick={() => setCurrentMonth(addMonths(currentMonth, 1))}
            className="text-blue-700 hover:underline"
          >
            Mese successivo →
          </button>
        </div>

        {/* Weekdays */}
        <div className="grid grid-cols-7 text-center font-medium text-gray-600 mb-2">
          {["Lun", "Mar", "Mer", "Gio", "Ven", "Sab", "Dom"].map((day) => (
            <div key={day}>{day}</div>
          ))}
        </div>

        {/* Days Grid */}
        <div className="grid grid-cols-7 text-center gap-1 text-sm">
          {days.map((date) => {
            const dateStr = format(date, "yyyy-MM-dd");
            const isDateBooked = isBooked(date);
            const isDateAvailable = isAvailable(date);
            const isCurrentMonth = isSameMonth(date, currentMonth);
            const isToday = isSameDay(date, today);

            return (
              <button
                key={dateStr}
                type="button"
                disabled={!isCurrentMonth || !isDateAvailable}
                onClick={() =>
                  setFormData((prev) => ({ ...prev, date: dateStr }))
                }
                className={`py-2 border rounded transition text-xs
                  ${!isCurrentMonth ? "text-gray-400" : ""}
                  ${
                    isDateBooked
                      ? "bg-red-100 text-red-700 cursor-not-allowed"
                      : ""
                  }
                  ${
                    isDateAvailable
                      ? "bg-green-100 hover:bg-green-200 text-green-700"
                      : ""
                  }
                  ${formData.date === dateStr ? "ring-2 ring-blue-600" : ""}`}
              >
                {format(date, "d")}
                {isToday && (
                  <div className="text-[10px] text-blue-500">oggi</div>
                )}
              </button>
            );
          })}
        </div>
      </>
    );
  };

  return (
    <div className="max-w-3xl mx-auto px-4 py-20 text-blue-900">
      <h1 className="text-3xl font-bold mb-8 text-center">Prenota una barca</h1>

      {/* Boat Selector */}
      <div className="mb-8">
        <label className="block font-medium mb-1" htmlFor="boat">
          Seleziona la barca
        </label>
        <select
          name="boat"
          id="boat"
          required
          value={selectedBoat}
          onChange={handleBoatChange}
          className="w-full border border-gray-300 rounded px-4 py-2"
        >
          <option value="">-- Scegli una barca --</option>
          {boats.map((b) => (
            <option key={b} value={b}>
              {b}
            </option>
          ))}
        </select>
      </div>

      {/* Calendar */}
      {selectedBoat && <div className="mb-12">{renderCalendar()}</div>}

      {/* Rental Form */}
      {selectedBoat && (
        <form
          onSubmit={handleSubmit}
          className="space-y-6 bg-white p-6 rounded-2xl shadow"
        >
          {/* Selected Date */}
          <div>
            <label className="block font-medium mb-1" htmlFor="date">
              Data selezionata
            </label>
            <input
              type="text"
              name="date"
              id="date"
              readOnly
              value={
                formData.date
                  ? format(new Date(formData.date), "dd MMMM yyyy", {
                      locale: it,
                    })
                  : ""
              }
              className="w-full border border-gray-300 rounded px-4 py-2 bg-gray-100"
            />
          </div>

          {/* User Info */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block font-medium mb-1" htmlFor="name">
                Nome
              </label>
              <input
                type="text"
                name="name"
                required
                value={formData.name}
                onChange={handleFormChange}
                className="w-full border border-gray-300 rounded px-4 py-2"
              />
            </div>
            <div>
              <label className="block font-medium mb-1" htmlFor="surname">
                Cognome
              </label>
              <input
                type="text"
                name="surname"
                required
                value={formData.surname}
                onChange={handleFormChange}
                className="w-full border border-gray-300 rounded px-4 py-2"
              />
            </div>
          </div>

          <div>
            <label className="block font-medium mb-1" htmlFor="tessera">
              Numero Tessera LNI
            </label>
            <input
              type="text"
              name="tessera"
              required
              value={formData.tessera}
              onChange={handleFormChange}
              className="w-full border border-gray-300 rounded px-4 py-2"
            />
          </div>

          <div>
            <label className="block font-medium mb-1" htmlFor="email">
              Email
            </label>
            <input
              type="email"
              name="email"
              required
              value={formData.email}
              onChange={handleFormChange}
              className="w-full border border-gray-300 rounded px-4 py-2"
            />
          </div>

          {/* Submit */}
          <div className="text-center pt-4">
            <button
              type="submit"
              disabled={!formData.date}
              className="bg-blue-800 hover:bg-blue-700 text-white font-medium px-6 py-3 rounded-full transition disabled:opacity-50"
            >
              Prenota
            </button>
          </div>
        </form>
      )}
    </div>
  );
}
