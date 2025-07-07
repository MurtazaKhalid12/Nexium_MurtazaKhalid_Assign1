"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import quotesData from "@/data/quotes.json";

export default function QuoteGenerator() {
  const [topic, setTopic] = useState("");
  const [quotes, setQuotes] = useState<{ text: string; author: string }[]>([]);
  const [error, setError] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const lowercaseTopic = topic.toLowerCase();
    
    if (quotesData[lowercaseTopic as keyof typeof quotesData]) {
      setQuotes(quotesData[lowercaseTopic as keyof typeof quotesData]);
      setError("");
    } else {
      setError("No quotes found for this topic. Try 'life', 'love', or 'success'.");
      setQuotes([]);
    }
  };

  return (
    <main className="flex min-h-screen flex-col items-center p-8 md:p-24">
      <div className="w-full max-w-2xl space-y-8">
        <h1 className="text-3xl md:text-4xl font-bold text-center">Quote Generator</h1>
        
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="flex flex-col md:flex-row gap-2">
            <Input
              type="text"
              value={topic}
              onChange={(e) => setTopic(e.target.value)}
              placeholder="Enter a topic (e.g., life, love, success)"
              className="flex-1"
            />
            <Button type="submit" className="w-full md:w-auto">Get Quotes</Button>
          </div>
          {error && <p className="text-red-500 text-sm">{error}</p>}
        </form>

        {quotes.length > 0 && (
          <div className="space-y-4">
            <h2 className="text-xl md:text-2xl font-semibold">Quotes about {topic}</h2>
            <div className="grid gap-4 md:grid-cols-1 lg:grid-cols-3">
              {quotes.map((quote, index) => (
                <Card key={index} className="h-full">
                  <CardHeader>
                    <CardTitle className="text-lg">Quote {index + 1}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="mb-2 italic">"{quote.text}"</p>
                    <p className="text-muted-foreground text-right">— {quote.author}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        )}
      </div>
    </main>
  );
}