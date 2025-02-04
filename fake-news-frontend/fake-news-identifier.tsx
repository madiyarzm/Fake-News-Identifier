"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Upload, Search, Newspaper } from "lucide-react";

export default function FakeNewsIdentifier() {
  const [newsText, setNewsText] = useState("");
  const [newsImage, setNewsImage] = useState<File | null>(null);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Submitted:", { newsText, newsImage });
    setNewsText("");
    setNewsImage(null);
  };

  return (
    <Card className="w-full max-w-2xl mx-auto bg-white/10 backdrop-blur-md border-blue-500/50 shadow-xl animate-fade-in-up">
      <CardHeader className="space-y-1">
        <CardTitle className="text-3xl font-bold text-center text-white flex items-center justify-center">
          <Newspaper className="mr-2 h-8 w-8 text-blue-400" />
          Analyze Content
        </CardTitle>
        <p className="text-blue-200 text-center">
          Input text or upload an image to check for potential misinformation
        </p>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="space-y-2">
            <Label htmlFor="news-text" className="text-blue-100">
              News Text
            </Label>
            <Textarea
              id="news-text"
              placeholder="Enter the news text here..."
              value={newsText}
              onChange={(e) => setNewsText(e.target.value)}
              className="min-h-[120px] bg-blue-900/50 border-blue-500/50 text-blue-100 placeholder-blue-300/50 focus:ring-blue-400"
              required
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="news-image" className="text-blue-100">
              News Image
            </Label>
            <div className="flex items-center space-x-2">
              <Input
                id="news-image"
                type="file"
                accept="image/*"
                onChange={(e) => setNewsImage(e.target.files?.[0] || null)}
                className="flex-1 bg-blue-900/50 border-blue-500/50 text-blue-100 file:bg-blue-700 file:text-blue-100 file:border-0 file:rounded-md"
              />
              <Button
                type="button"
                variant="outline"
                size="icon"
                className="bg-blue-700 hover:bg-blue-600 text-blue-100"
              >
                <Upload className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </form>
      </CardContent>
      <CardFooter className="flex justify-end px-6 pb-6">
        <Button
          type="submit"
          className="bg-blue-500 hover:bg-blue-400 text-white px-8 py-2 rounded-full font-semibold transition-all duration-300 ease-in-out transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-opacity-50 shadow-lg animate-pulse"
        >
          <Search className="mr-2 h-4 w-4" />
          Analyze
        </Button>
      </CardFooter>
    </Card>
  );
}
