
import { useState, useRef, useEffect } from "react";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Button } from "@/components/ui/button";
import { CircleDot } from "lucide-react";

interface ColorPickerProps {
  onSelectColor: (color: string) => void;
}

const colors = [
  { name: "Чёрный", value: "#000000" },
  { name: "Тёмно-серый", value: "#444444" },
  { name: "Серый", value: "#888888" },
  { name: "Красный", value: "#ff0000" },
  { name: "Оранжевый", value: "#ff8800" },
  { name: "Жёлтый", value: "#ffcc00" },
  { name: "Зелёный", value: "#00cc00" },
  { name: "Голубой", value: "#00ccff" },
  { name: "Синий", value: "#0066ff" },
  { name: "Фиолетовый", value: "#8800ff" },
  { name: "Розовый", value: "#ff00cc" },
  { name: "Коричневый", value: "#884400" }
];

const ColorPicker = ({ onSelectColor }: ColorPickerProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const [currentColor, setCurrentColor] = useState("#000000");
  const popoverRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (popoverRef.current && !popoverRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    }
    
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const handleColorSelect = (color: string) => {
    setCurrentColor(color);
    onSelectColor(color);
    setIsOpen(false);
  };

  return (
    <Popover open={isOpen} onOpenChange={setIsOpen}>
      <PopoverTrigger asChild>
        <Button 
          variant="outline" 
          size="icon"
          className="relative"
          onClick={() => setIsOpen(true)}
        >
          <div 
            className="h-4 w-4 rounded-full" 
            style={{ backgroundColor: currentColor }}
          />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-64 p-2" ref={popoverRef}>
        <div className="grid grid-cols-4 gap-1">
          {colors.map((color) => (
            <Button
              key={color.value}
              variant="outline"
              className="relative h-8 w-8 rounded-md p-0"
              style={{ backgroundColor: color.value }}
              onClick={() => handleColorSelect(color.value)}
              title={color.name}
            >
              {currentColor === color.value && (
                <CircleDot className="h-4 w-4 text-white drop-shadow-[0_0_2px_rgba(0,0,0,0.5)]" />
              )}
            </Button>
          ))}
        </div>
      </PopoverContent>
    </Popover>
  );
};

export default ColorPicker;
