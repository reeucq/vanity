import React, { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { getPainting, generateAIDescription } from "@/requests";
import { useParams } from "react-router-dom";
import { Button } from "./ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
  CardFooter,
} from "./ui/card";

const SinglePaintingView = ({ className }) => {
  const { id } = useParams();
  const [aiDescription, setAIDescription] = useState(null);
  const [isGenerating, setIsGenerating] = useState(false);
  const [error, setError] = useState(null);

  const {
    data: painting,
    isLoading,
    isError,
    error: paintingError,
  } = useQuery({
    queryKey: ["painting", id],
    queryFn: () => getPainting(id),
  });

  const handleGenerateDescription = async () => {
    setIsGenerating(true);
    setError(null);
    try {
      const data = await generateAIDescription(id);
      setAIDescription(data.description);
    } catch (err) {
      setError(err.message || "Failed to generate AI description");
    } finally {
      setIsGenerating(false);
    }
  };

  if (isLoading) return <div className="p-4">Loading...</div>;
  if (isError)
    return (
      <div className="p-4 text-red-500">Error: {paintingError.message}</div>
    );

  return (
    <main className={`w-full max-w-7xl mx-auto p-4 ${className}`}>
      <div className="flex flex-col lg:flex-row gap-6">
        <div className="lg:w-1/2">
          <div className="rounded-lg overflow-hidden shadow-lg">
            <img
              src={`/paintings/${painting.filename}`}
              alt={painting.name}
              className="w-full h-auto object-contain"
            />
          </div>
        </div>
        <div className="lg:w-1/2">
          <Card>
            <CardHeader>
              <CardTitle className="text-2xl font-bold">
                {painting.name}
              </CardTitle>
              <CardDescription>
                {painting.year} | {painting.made_at} | {painting.size}
              </CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-gray-700">{painting.description}</p>
              {aiDescription && (
                <div className="mt-4">
                  <h3 className="text-lg font-semibold">
                    AI-Generated Description:
                  </h3>
                  <p className="text-gray-700">{aiDescription}</p>
                </div>
              )}
            </CardContent>
            <CardFooter>
              <Button
                onClick={handleGenerateDescription}
                disabled={isGenerating}
              >
                {isGenerating ? "Generating..." : "Generate AI Description"}
              </Button>
            </CardFooter>
          </Card>
          {isGenerating && (
            <p className="mt-2 text-center text-gray-600">
              Generating AI description... This may take a few moments.
            </p>
          )}
          {error && (
            <p className="mt-2 text-center text-red-500">
              Error generating description: {error}
            </p>
          )}
        </div>
      </div>
    </main>
  );
};

export default SinglePaintingView;
