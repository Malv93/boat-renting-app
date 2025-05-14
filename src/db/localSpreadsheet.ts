import { format } from "date-fns";
import * as XLSX from "xlsx";

type BookingSlot = "morning" | "afternoon";

export type BookingsByBoat = Record<string, Record<string, BookingSlot[]>>;

// Used to load data uploading a file from the form
export async function loadBookingsFromSheet(
  file: File
): Promise<BookingsByBoat> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = (e) => {
      const data = new Uint8Array(e.target!.result as ArrayBuffer);
      // const workbook = XLSX.read(data, { type: "array" });
      const workbook = XLSX.read(data, { type: "array" });
      const sheet = workbook.Sheets["boat-rentals"];
      const rows: {
        date: string;
        "morning-afternoon": string;
        boat: string;
      }[] = XLSX.utils.sheet_to_json(sheet);

      const bookings: BookingsByBoat = {};

      rows.forEach((row) => {
        const date = row.date;
        const slot = row["morning-afternoon"] as BookingSlot;
        const boat = row.boat;

        if (!bookings[boat]) bookings[boat] = {};
        if (!bookings[boat][date]) bookings[boat][date] = [];

        if (!bookings[boat][date].includes(slot)) {
          bookings[boat][date].push(slot);
        }
      });

      resolve(bookings);
    };
    reader.onerror = reject;
    reader.readAsArrayBuffer(file);
  });
}

// Convert excel date serial number to date: https://stackoverflow.com/questions/16229494/converting-excel-date-serial-number-to-date-using-javascript
function excelDateToJSDate(date: string): Date {
  const dateNumber = Number(date)
  return new Date(Math.round((dateNumber - 25569)*86400*1000));
}

// Load mockup data from a static file
export async function loadExcelData(): Promise<BookingsByBoat> {
  const response = await fetch("/data/boat-renting-app.xlsx");
  const arrayBuffer = await response.arrayBuffer();

  const workbook = XLSX.read(arrayBuffer, { type: "array" });
  const worksheet = workbook.Sheets["boat-rentals"];
  const rows: {
    date: string;
    "morning-afternoon": string;
    boat: string;
  }[] = XLSX.utils.sheet_to_json(worksheet);
  console.log(rows, "the rows");

  const bookings: BookingsByBoat = {};

  rows.forEach((row) => {
    const date = format(excelDateToJSDate(row.date), "yyyy-MM-dd");
    const slot = row["morning-afternoon"] as BookingSlot;
    const boat = row.boat;

    if (!bookings[boat]) bookings[boat] = {};
    if (!bookings[boat][date]) bookings[boat][date] = [];

    if (!bookings[boat][date].includes(slot)) {
      bookings[boat][date].push(slot);
    }
  });

  return bookings;
}
