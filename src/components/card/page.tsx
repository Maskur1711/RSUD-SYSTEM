import React, { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { BedSingle, ChevronLeft, ChevronRight } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

export default function CardRuangan() {
  const [selectedRoom, setSelectedRoom] = useState<string | null>(null);
  const [currentFloor, setCurrentFloor] = useState<number>(1);

  const roomsPerFloor = 12;
  const totalFloors = 10;

  const pasienList = [
    "Budi Santoso",
    "Siti Aminah",
    "Andi Wijaya",
    "Dewi Lestari",
    "Rizky Pratama",
    "Mira Kurnia",
  ];

  const rooms = Array.from({ length: roomsPerFloor }, (_, i) => {
    const available = i % 2 === 0;
    return {
      name: `Ruangan ${i + 1} - Lantai ${currentFloor}`,
      available,
      pasien: available ? pasienList[i % pasienList.length] : null,
    };
  });
  const handlePrev = () => {
    if (currentFloor > 1) setCurrentFloor(currentFloor - 1);
  };

  const handleNext = () => {
    if (currentFloor < totalFloors) setCurrentFloor(currentFloor + 1);
  };

  const renderPageNumbers = () => {
    const pages = [];
    const showDots = totalFloors > 3;

    if (!showDots) {
      for (let i = 1; i <= totalFloors; i++) {
        pages.push(i);
      }
    } else {
      if (currentFloor <= 2) {
        pages.push(1, 2, 3, "...");
      } else if (currentFloor >= totalFloors - 1) {
        pages.push("...", totalFloors - 2, totalFloors - 1, totalFloors);
      } else {
        pages.push(
          "...",
          currentFloor - 1,
          currentFloor,
          currentFloor + 1,
          "..."
        );
      }
    }

    return pages.map((page, index) =>
      typeof page === "number" ? (
        <Button
          key={index}
          variant={currentFloor === page ? "default" : "outline"}
          onClick={() => setCurrentFloor(page)}
          className="px-4"
        >
          {page}
        </Button>
      ) : (
        <span key={index} className="px-2 text-gray-500">
          {page}
        </span>
      )
    );
  };

  return (
    <div className="container mx-auto p-6">
      <h1 className="text-2xl font-bold mb-6">
        Daftar Ruangan - Lantai {currentFloor}
      </h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {rooms.map((room, index) => (
          <Dialog key={index}>
            {room.available ? (
              <DialogTrigger asChild>
                <Card
                  onClick={() => setSelectedRoom(room.name)}
                  className="group cursor-pointer rounded-2xl border p-4 shadow-sm transition-all duration-300 hover:shadow-xl hover:scale-[1.02]"
                >
                  <CardHeader className="flex flex-col items-start gap-2 p-0 pb-2">
                    <div className="flex items-center gap-3">
                      <div className="rounded-full bg-blue-100 p-3">
                        <BedSingle className="text-blue-600 h-6 w-6" />
                      </div>
                      <CardTitle className="text-lg font-semibold">
                        {room.name}
                      </CardTitle>
                    </div>
                  </CardHeader>
                  <CardContent className="pt-2">
                    <span className="text-sm text-green-600 font-medium">
                      Tersedia - {room.pasien}
                    </span>
                  </CardContent>
                </Card>
              </DialogTrigger>
            ) : (
              <Card className="group rounded-2xl border p-4 shadow-sm opacity-70">
                <CardHeader className="flex flex-col items-start gap-2 p-0 pb-2">
                  <div className="flex items-center gap-3">
                    <div className="rounded-full bg-gray-200 p-3">
                      <BedSingle className="text-gray-500 h-6 w-6" />
                    </div>
                    <CardTitle className="text-lg font-semibold">
                      {room.name}
                    </CardTitle>
                  </div>
                </CardHeader>
                <CardContent className="pt-2">
                  <span className="text-sm text-red-600 font-medium">
                    Tidak Tersedia
                  </span>
                </CardContent>
              </Card>
            )}

            <DialogContent>
              <DialogHeader>
                <DialogTitle>Isi Data {selectedRoom}</DialogTitle>
              </DialogHeader>
              <form className="space-y-4">
                <Input placeholder="Nama Lengkap" required />
                <Input placeholder="Penanggung Jawab" required />
                <Input placeholder="Dokter yang Menangani" required />
                <Select required>
                  <SelectTrigger>
                    <SelectValue placeholder="Pilih Tipe Kamar" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="VIP">VIP</SelectItem>
                    <SelectItem value="Non VIP">Non VIP</SelectItem>
                  </SelectContent>
                </Select>
                <Button type="submit">Simpan</Button>
              </form>
            </DialogContent>
          </Dialog>
        ))}
      </div>

      <div className="flex justify-center mt-8">
        <div className="flex items-center gap-2 ">
          <Button
            variant="outline"
            size="icon"
            onClick={handlePrev}
            disabled={currentFloor === 1}
            className="cursor-pointer"
          >
            <ChevronLeft className="h-4 w-4" />
          </Button>
          <span className="px-2">Previous</span>

          {renderPageNumbers()}

          <span className="px-2">Next</span>
          <Button
            variant="outline"
            size="icon"
            onClick={handleNext}
            disabled={currentFloor === totalFloors}
            className="cursor-pointer"
          >
            <ChevronRight className="h-4 w-4" />
          </Button>
        </div>
      </div>
    </div>
  );
}
