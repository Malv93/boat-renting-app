import { useEffect, useState } from "react";
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
  isAfter,
  isBefore,
} from "date-fns";
import { it } from "date-fns/locale";
import { loadExcelData, type BookingsByBoat } from "../db/localSpreadsheet";

// Mock data: booked dates by boat
const mockBookedDates: Record<
  string,
  Record<string, ("morning" | "afternoon")[]>
> = {
  "RS Zest": {
    "2025-05-15": ["morning", "afternoon"],
    "2025-05-20": ["morning"],
    "2025-06-03": ["afternoon"],
  },
  "RS Quest": {
    "2025-05-16": ["afternoon"],
    "2025-06-01": ["morning", "afternoon"],
    "2025-06-05": ["morning"],
  },
  "RS CAT14": {
    "2025-05-18": ["morning"],
    "2025-06-08": ["afternoon"],
    "2025-06-15": ["morning", "afternoon"],
  },
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
    timeSlot: "",
  });
  const [bookings, setBookings] = useState<BookingsByBoat>({});

    useEffect(() => {
    loadExcelData()
      .then((json) => {
        setBookings(json);
        console.log("Loaded Excel Data:", json);
      })
      .catch((err) => {
        console.error("Error loading Excel:", err);
      });
  }, []);

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

  const getBookingsForDate = (date: Date): ("morning" | "afternoon")[] => {
    const dateStr = format(date, "yyyy-MM-dd");
    return selectedBoat && bookings[selectedBoat]?.[dateStr]
      ? bookings[selectedBoat][dateStr]
      : [];
  };

  const isFullyBooked = (date: Date): boolean => {
    const bookings = getBookingsForDate(date);
    return bookings.includes("morning") && bookings.includes("afternoon");
  };

  const isPartiallyAvailable = (date: Date): boolean => {
    const bookings = getBookingsForDate(date);
    return bookings.length < 2 && isAfter(date, today);
  };

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
            const isDateBooked = isFullyBooked(date);
            const isDateAvailable = isPartiallyAvailable(date);
            const isCurrentMonth = isSameMonth(date, currentMonth);
            const isInThePast = isBefore(date, today);

            return (
              <button
                key={dateStr}
                type="button"
                disabled={!isCurrentMonth || !isDateAvailable || isInThePast}
                onClick={() =>
                  setFormData((prev) => ({ ...prev, date: dateStr }))
                }
                className={`py-2 border rounded transition text-xs
                  ${!isCurrentMonth || isInThePast ? "text-gray-400" : ""}
                  ${
                    isDateBooked && isCurrentMonth
                      ? "bg-red-100 text-red-700 cursor-not-allowed"
                      : ""
                  }
                  ${
                    isDateAvailable && isCurrentMonth
                      ? "bg-green-100 hover:bg-green-200 text-green-700"
                      : ""
                  }
                  ${formData.date === dateStr ? "ring-2 ring-blue-600" : ""}`}
              >
                {format(date, "d")}
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

      {formData.date && (
        <div>
          <label className="block font-medium mb-1">
            Fascia oraria disponibile
          </label>
          <div className="flex gap-4">
            {["morning", "afternoon"].map((slot) => {
              const bookedSlots = getBookingsForDate(new Date(formData.date));
              const disabled = bookedSlots.includes(
                slot as "morning" | "afternoon"
              );

              return (
                <label
                  key={slot}
                  className={`flex items-center gap-2 ${
                    disabled ? "text-gray-400" : ""
                  }`}
                >
                  <input
                    type="radio"
                    name="timeSlot"
                    value={slot}
                    disabled={disabled}
                    checked={formData.timeSlot === slot}
                    onChange={(e) =>
                      setFormData({ ...formData, timeSlot: e.target.value })
                    }
                  />
                  {slot === "morning" ? "Mattina" : "Pomeriggio"}
                </label>
              );
            })}
          </div>
        </div>
      )}

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
              disabled={!formData.date || !formData.timeSlot}
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
