import { useState, useRef } from "react");
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { Bold, Italic, Link as LinkIcon, Heading1, Heading2, Quote, 
         Image as ImageIcon, Video, AlignLeft, AlignCenter, AlignRight } from "lucide-react";
import MediaUploadDialog from "@/components/MediaUploadDialog";
import ColorPicker from "@/components/ColorPicker";
import FontSizeSelect from "@/components/FontSizeSelect";

const TelegraphEditor = () => {
  const [title, setTitle] = useState(""");
  const [author, setAuthor] = useState(""");
  const [content, setContent] = useState(""");
  const editorRef = useRef<HTMLDivElement>(null);

  const formatText = (format: string) => {
    document.execCommand(format);
    if (editorRef.current) {
      editorRef.current.focus();
    }
  };

  const insertHeading = (level: number) => {
    document.execCommand("formatBlock", false, `h${level}`);
    if (editorRef.current) {
      editorRef.current.focus();
    }
  };

  const insertQuote = () => {
    document.execCommand("formatBlock", false, "blockquote");
    if (editorRef.current) {
      editorRef.current.focus();
    }
  };

  const insertLink = () => {
    const url = prompt("Введите URL ссылки:");
    if (url) {
      document.execCommand("createLink", false, url);
    }
    if (editorRef.current) {
      editorRef.current.focus();
    }
  };

  const changeTextColor = (color: string) => {
    document.execCommand("foreColor", false, color);
    if (editorRef.current) {
      editorRef.current.focus();
    }
  };

  const changeFontSize = (size: string) => {
    document.execCommand("fontSize", false, "7");
    const fontElements = document.getElementsByTagName("font");
    for (let i = fontElements.length - 1; i >= 0; i--) {
      if (fontElements[i].size === "7") {
        fontElements[i].removeAttribute("size");
        fontElements[i].style.fontSize = size;
      }
    }
    if (editorRef.current) {
      editorRef.current.focus();
    }
  };

  const alignText = (alignment: string) => {
    document.execCommand("justify" + alignment);
    if (editorRef.current) {
      editorRef.current.focus();
    }
  };

  const insertMedia = (type: "image" | "video", mediaUrl: string) => {
    let htmlToInsert = "";
    
    if (type === "image") {
      htmlToInsert = `<figure class="tl_figure"><img src="${mediaUrl}" class="tl_image" /><figcaption class="tl_caption"></figcaption></figure>`;
    } else if (type === "video") {
      // Определяем, является ли ссылка YouTube, Vimeo и т.д. или локальным файлом
      if (mediaUrl.includes("youtube.com") || mediaUrl.includes("youtu.be")) {
        // Обрабатываем YouTube URL
        const videoId = mediaUrl.includes("youtu.be") 
          ? mediaUrl.split("/").pop() 
          : new URLSearchParams(new URL(mediaUrl).search).get("v");
        
        htmlToInsert = `<div class="tl_video_container"><iframe src="https://www.youtube.com/embed/${videoId}" frameborder="0" allowfullscreen></iframe></div>`;
      } else if (mediaUrl.startsWith("blob:") || mediaUrl.startsWith("http")) {
        // Обрабатываем локальный видеофайл или прямую ссылку на видео
        htmlToInsert = `<div class="tl_video_container"><video controls src="${mediaUrl}" class="tl_video"></video></div>`;
      }
    }
    
    if (htmlToInsert && editorRef.current) {
      document.execCommand("insertHTML", false, htmlToInsert);
      editorRef.current.focus();
    }
  };

  const handlePublish = () => {
    alert("Текст опубликован (демо)");
    // В полноценной версии здесь будет отправка данных на сервер
  };

  return (
    <div className="min-h-screen bg-white">
      <header className="bg-blue-600 text-white py-4 mb-6">
        <div className="max-w-2xl mx-auto px-4">
          <h1 className="text-2xl font-bold">Почитай-ка</h1>
          <p className="text-sm text-blue-100">Создавайте и делитесь интересными статьями</p>
        </div>
      </header>
      <div className="max-w-2xl mx-auto px-4 pb-8">
        <main className="tl_article">
          <header className="mb-8">
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Заголовок"
              className="w-full text-4xl font-bold mb-4 outline-none border-none"
            />
            <div className="text-gray-500">
              <input
                type="text"
                value={author}
                onChange={(e) => setAuthor(e.target.value)}
                placeholder="Автор"
                className="outline-none border-none bg-transparent"
              />
              <span className="mx-1">•</span>
              <time>{new Date().toLocaleDateString('ru-RU', { year: 'numeric', month: 'long', day: 'numeric' })}</time>
            </div>
          </header>

          <div className="formatting-toolbar mb-4 flex flex-wrap gap-1 bg-gray-50 p-2 rounded-md">
            <TooltipProvider>
              <div className="flex gap-1 mr-2">
                <Tooltip>
                  <TooltipTrigger asChild>
                    <Button variant="outline" size="icon" onClick={() => formatText("bold")}>
                      <Bold className="h-4 w-4" />
                    </Button>
                  </TooltipTrigger>
                  <TooltipContent>Жирный (Ctrl+B)</TooltipContent>
                </Tooltip>
                
                <Tooltip>
                  <TooltipTrigger asChild>
                    <Button variant="outline" size="icon" onClick={() => formatText("italic")}>
                      <Italic className="h-4 w-4" />
                    </Button>
                  </TooltipTrigger>
                  <TooltipContent>Курсив (Ctrl+I)</TooltipContent>
                </Tooltip>
                
                <Tooltip>
                  <TooltipTrigger asChild>
                    <Button variant="outline" size="icon" onClick={insertLink}>
                      <LinkIcon className="h-4 w-4" />
                    </Button>
                  </TooltipTrigger>
                  <TooltipContent>Ссылка (Ctrl+K)</TooltipContent>
                </Tooltip>
              </div>
              
              <Separator orientation="vertical" className="h-8" />
              
              <div className="flex gap-1 mr-2">
                <Tooltip>
                  <TooltipTrigger asChild>
                    <Button variant="outline" size="icon" onClick={() => insertHeading(1)}>
                      <Heading1 className="h-4 w-4" />
                    </Button>
                  </TooltipTrigger>
                  <TooltipContent>Заголовок</TooltipContent>
                </Tooltip>
                
                <Tooltip>
                  <TooltipTrigger asChild>
                    <Button variant="outline" size="icon" onClick={() => insertHeading(2)}>
                      <Heading2 className="h-4 w-4" />
                    </Button>
                  </TooltipTrigger>
                  <TooltipContent>Подзаголовок</TooltipContent>
                </Tooltip>
                
                <Tooltip>
                  <TooltipTrigger asChild>
                    <Button variant="outline" size="icon" onClick={insertQuote}>
                      <Quote className="h-4 w-4" />
                    </Button>
                  </TooltipTrigger>
                  <TooltipContent>Цитата</TooltipContent>
                </Tooltip>
              </div>
              
              <Separator orientation="vertical" className="h-8" />
              
              <div className="flex gap-1 mr-2">
                <Tooltip>
                  <TooltipTrigger asChild>
                    <FontSizeSelect onSelectSize={changeFontSize} />
                  </TooltipTrigger>
                  <TooltipContent>Размер текста</TooltipContent>
                </Tooltip>
                
                <Tooltip>
                  <TooltipTrigger asChild>
                    <ColorPicker onSelectColor={changeTextColor} />
                  </TooltipTrigger>
                  <TooltipContent>Цвет текста</TooltipContent>
                </Tooltip>
              </div>
              
              <Separator orientation="vertical" className="h-8" />
              
              <div className="flex gap-1 mr-2">
                <Tooltip>
                  <TooltipTrigger asChild>
                    <Button variant="outline" size="icon" onClick={() => alignText("Left")}>
                      <AlignLeft className="h-4 w-4" />
                    </Button>
                  </TooltipTrigger>
                  <TooltipContent>По левому краю</TooltipContent>
                </Tooltip>
                
                <Tooltip>
                  <TooltipTrigger asChild>
                    <Button variant="outline" size="icon" onClick={() => alignText("Center")}>
                      <AlignCenter className="h-4 w-4" />
                    </Button>
                  </TooltipTrigger>
                  <TooltipContent>По центру</TooltipContent>
                </Tooltip>
                
                <Tooltip>
                  <TooltipTrigger asChild>
                    <Button variant="outline" size="icon" onClick={() => alignText("Right")}>
                      <AlignRight className="h-4 w-4" />
                    </Button>
                  </TooltipTrigger>
                  <TooltipContent>По правому краю</TooltipContent>
                </Tooltip>
              </div>
              
              <Separator orientation="vertical" className="h-8" />
              
              <div className="flex gap-1">
                <Tooltip>
                  <TooltipTrigger asChild>
                    <MediaUploadDialog 
                      type="image" 
                      onMediaInsert={(url) => insertMedia("image", url)}
                    >
                      <Button variant="outline" size="icon">
                        <ImageIcon className="h-4 w-4" />
                      </Button>
                    </MediaUploadDialog>
                  </TooltipTrigger>
                  <TooltipContent>Вставить изображение</TooltipContent>
                </Tooltip>
                
                <Tooltip>
                  <TooltipTrigger asChild>
                    <MediaUploadDialog 
                      type="video" 
                      onMediaInsert={(url) => insertMedia("video", url)}
                    >
                      <Button variant="outline" size="icon">
                        <Video className="h-4 w-4" />
                      </Button>
                    </MediaUploadDialog>
                  </TooltipTrigger>
                  <TooltipContent>Вставить видео</TooltipContent>
                </Tooltip>
              </div>
            </TooltipProvider>
          </div>

          <div
            ref={editorRef}
            contentEditable
            className="tl_article_content min-h-[300px] focus:outline-none text-lg leading-relaxed"
            onInput={(e) => setContent((e.target as HTMLDivElement).innerHTML)}
            placeholder="Текст статьи..."
          />

          <div className="mt-8 flex justify-end">
            <Button onClick={handlePublish} className="bg-blue-600 hover:bg-blue-700 text-white">
              Опубликовать
            </Button>
          </div>
        </main>
      </div>
    </div>
  );
};

export default TelegraphEditor;