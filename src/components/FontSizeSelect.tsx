
import { useState } from "react";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Button } from "@/components/ui/button";
import { ChevronDown } from "lucide-react";

interface FontSizeSelectProps {
  onSelectSize: (size: string) => void;
}

const fontSizes = [
  { name: "Очень маленький", value: "x-small" },
  { name: "Маленький", value: "small" },
  { name: "Обычный", value: "medium" },
  { name: "Большой", value: "large" },
  { name: "Очень большой", value: "x-large" },
  { name: "Огромный", value: "xx-large" }
];

const FontSizeSelect = ({ onSelectSize }: FontSizeSelectProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const [currentSize, setCurrentSize] = useState("medium");

  const handleSizeSelect = (size: string) => {
    setCurrentSize(size);
    onSelectSize(size);
    setIsOpen(false);
  };

  const getDisplaySize = (size: string) => {
    return fontSizes.find(item => item.value === size)?.name || "Обычный";
  };

  return (
    <Popover open={isOpen} onOpenChange={setIsOpen}>
      <PopoverTrigger asChild>
        <Button variant="outline" className="h-9 text-xs flex gap-1 px-2">
          <span className="truncate max-w-[70px]">{getDisplaySize(currentSize)}</span>
          <ChevronDown className="h-3 w-3" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-48 p-1">
        <div className="flex flex-col gap-1">
          {fontSizes.map((size) => (
            <Button
              key={size.value}
              variant={currentSize === size.value ? "secondary" : "ghost"}
              className="justify-start font-normal text-left"
              onClick={() => handleSizeSelect(size.value)}
            >
              <span style={{ fontSize: size.value }}>{size.name}</span>
            </Button>
          ))}
        </div>
      </PopoverContent>
    </Popover>
  );
};

export default FontSizeSelect;
