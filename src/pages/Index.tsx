
import { useState, useRef } from "react";
import { Button } from "@/components/ui/button";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { Bold, Italic, Link as LinkIcon, Heading1, Heading2, Quote, Image } from "lucide-react";

const TelegraphEditor = () => {
  const [title, setTitle] = useState("");
  const [author, setAuthor] = useState("");
  const [content, setContent] = useState("");
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

  const handlePublish = () => {
    alert("Текст опубликован (демо)");
    // В полноценной версии здесь будет отправка данных на сервер
  };

  return (
    <div className="min-h-screen bg-white">
      <div className="max-w-2xl mx-auto px-4 py-8">
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

          <div className="formatting-toolbar mb-4 flex space-x-1">
            <TooltipProvider>
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
              
              <Tooltip>
                <TooltipTrigger asChild>
                  <Button variant="outline" size="icon" disabled>
                    <Image className="h-4 w-4" />
                  </Button>
                </TooltipTrigger>
                <TooltipContent>Изображение (в разработке)</TooltipContent>
              </Tooltip>
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
