import { useState, useRef } from "react");
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { Bold, Italic, Link as LinkIcon, Heading1, Heading2, Quote, 
         Image as ImageIcon, Video, AlignLeft, AlignCenter, AlignRight } from "lucide-react";
import MediaUploadDialog from "@/components/MediaUploadDialog";
import ColorPicker from "@/components/ColorPicker";
import FontSizeSelect from "@/components/FontSizeSelect";
