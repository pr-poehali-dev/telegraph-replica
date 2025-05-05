
import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Upload, Link as LinkIcon } from "lucide-react";

interface MediaUploadDialogProps {
  type: "image" | "video";
  onMediaInsert: (mediaUrl: string) => void;
  children: React.ReactNode;
}

const MediaUploadDialog = ({ type, onMediaInsert, children }: MediaUploadDialogProps) => {
  const [mediaUrl, setMediaUrl] = useState("");
  const [localFile, setLocalFile] = useState<File | null>(null);
  const [isUploading, setIsUploading] = useState(false);
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setLocalFile(e.target.files[0]);
    }
  };

  const handleUrlSubmit = () => {
    if (mediaUrl.trim()) {
      onMediaInsert(mediaUrl);
      setMediaUrl("");
      setIsDialogOpen(false);
    }
  };

  const handleFileUpload = async () => {
    if (!localFile) return;
    
    setIsUploading(true);
    
    // Здесь в реальном приложении был бы код загрузки файла на сервер
    // В этом демо мы создаем локальный Object URL
    try {
      const objectUrl = URL.createObjectURL(localFile);
      onMediaInsert(objectUrl);
      setLocalFile(null);
      setIsDialogOpen(false);
    } catch (error) {
      console.error("Ошибка при обработке файла:", error);
    } finally {
      setIsUploading(false);
    }
  };

  return (
    <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>
            {type === "image" ? "Добавить изображение" : "Добавить видео"}
          </DialogTitle>
        </DialogHeader>
        
        <Tabs defaultValue="url" className="mt-4">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="url">По ссылке</TabsTrigger>
            <TabsTrigger value="upload">Загрузить</TabsTrigger>
          </TabsList>
          
          <TabsContent value="url" className="mt-4 space-y-4">
            <div className="space-y-2">
              <Label htmlFor="mediaUrl">URL {type === "image" ? "изображения" : "видео"}</Label>
              <div className="flex gap-2">
                <Input 
                  id="mediaUrl" 
                  value={mediaUrl} 
                  onChange={(e) => setMediaUrl(e.target.value)}
                  placeholder={type === "image" ? "https://example.com/image.jpg" : "https://youtu.be/example"}
                />
                <Button 
                  size="sm" 
                  onClick={handleUrlSubmit}
                  disabled={!mediaUrl.trim()}
                >
                  <LinkIcon className="h-4 w-4 mr-1" /> Вставить
                </Button>
              </div>
            </div>
          </TabsContent>
          
          <TabsContent value="upload" className="mt-4 space-y-4">
            <div className="space-y-2">
              <Label htmlFor="mediaFile">Выберите файл</Label>
              <Input 
                id="mediaFile" 
                type="file" 
                accept={type === "image" ? "image/*" : "video/*"}
                onChange={handleFileChange}
              />
              <Button 
                className="w-full" 
                onClick={handleFileUpload}
                disabled={!localFile || isUploading}
              >
                <Upload className="h-4 w-4 mr-1" /> 
                {isUploading ? "Загрузка..." : "Загрузить"}
              </Button>
            </div>
          </TabsContent>
        </Tabs>
      </DialogContent>
    </Dialog>
  );
};

export default MediaUploadDialog;
