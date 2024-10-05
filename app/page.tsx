"use client";

import GithubIcon from "@/components/icons/github-icon";
import XIcon from "@/components/icons/x-icon";
import Logo from "@/components/logo";
import Spinner from "@/components/spinner";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Slider } from "@/components/ui/slider";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import imagePlaceholder from "@/public/image-placeholder.png";
import { useQuery } from "@tanstack/react-query";
import { useDebounce } from "@uidotdev/usehooks";
import Image from "next/image";
import { useState } from "react";

const imageStyles = [
  "no preference in style",
  "pop art",
  "pixel art",
  "cartoon",
  "cyberpunk",
  "anime",
  "photorealism",
  "comics",
  "illustration",
  "watercolor",
  "oil painting",
  "papercraft",
  "marker illustration",
  "risograph",
  "high key",
  "low key",
  "bokeh",
  "golden hour"
];

const samplePrompts = [
  "A serene landscape with a misty mountain range at sunrise",
  "A futuristic cityscape with flying cars and neon lights",
  "A whimsical treehouse in an enchanted forest with magical creatures"
];

const roundToNearest64 = (value: number) => Math.round(value / 64) * 64;

export default function Home() {
  const [prompt, setPrompt] = useState("");
  const [userAPIKey, setUserAPIKey] = useState("");
  const [width, setWidth] = useState(512);
  const [height, setHeight] = useState(512);
  const [steps, setSteps] = useState(3);
  const [imageStyle, setImageStyle] = useState("");
  const [customStyle, setCustomStyle] = useState("");
  const debouncedPrompt = useDebounce(prompt, 300);

  const { data: image, isFetching } = useQuery({
    placeholderData: (previousData) => previousData,
    queryKey: [debouncedPrompt, width, height, steps, imageStyle, customStyle],
    queryFn: async () => {
      let res = await fetch("/api/generateImages", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ 
          prompt, 
          userAPIKey, 
          width, 
          height, 
          steps, 
          imageStyle: imageStyle === "other" ? customStyle : imageStyle 
        }),
      });

      if (!res.ok) {
        throw new Error(await res.text());
      }
      return (await res.json()) as {
        b64_json: string;
        timings: { inference: number };
      };
    },
    enabled: !!debouncedPrompt.trim(),
    staleTime: Infinity,
    retry: false,
  });

  let isDebouncing = prompt !== debouncedPrompt;

  const handleDownload = () => {
    if (image && image.b64_json) {
      const link = document.createElement('a');
      link.href = `data:image/png;base64,${image.b64_json}`;
      link.download = 'generated-image.png';
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    }
  };

  const handleSamplePrompt = (samplePrompt: string) => {
    setPrompt(samplePrompt);
  };

  return (
    <div className="flex h-full flex-col px-5 bg-background text-foreground font-geist">
      <header className="flex justify-between items-center py-6 bg-primary text-primary-foreground rounded-b-lg shadow-md animate-fade-in">
        <Logo className="w-48 h-auto text-background" />
        <div className="max-w-xs">
          <label className="text-xs font-medium">
            [Optional] Add your{" "}
            <a
              href="https://api.together.xyz/settings/api-keys"
              target="_blank"
              className="underline underline-offset-4 transition hover:text-secondary"
            >
              Together API Key
            </a>{" "}
          </label>
          <Input
            placeholder="API Key"
            type="password"
            value={userAPIKey}
            className="mt-1 bg-background text-foreground placeholder:text-muted-foreground"
            onChange={(e) => setUserAPIKey(e.target.value)}
          />
        </div>
      </header>

      <div className="flex justify-center mt-10">
        <form className="w-full max-w-2xl animate-slide-in">
          <fieldset>
            <div className="relative">
              <Textarea
                rows={4}
                spellCheck={false}
                placeholder="Describe your image..."
                required
                value={prompt}
                onChange={(e) => setPrompt(e.target.value)}
                className="w-full resize-none border-border bg-card text-card-foreground px-4 py-3 text-base placeholder-muted-foreground rounded-lg shadow-sm transition-shadow focus:shadow-md"
              />
              <div
                className={`${isFetching || isDebouncing ? "flex" : "hidden"} absolute bottom-3 right-3 items-center justify-center`}
              >
                <Spinner className="size-4" />
              </div>
            </div>
            <div className="mt-3 flex justify-start space-x-2">
              {samplePrompts.map((samplePrompt, index) => (
                <Button
                  key={index}
                  variant="outline"
                  size="sm"
                  onClick={() => handleSamplePrompt(samplePrompt)}
                  className="text-xs"
                  title={samplePrompt}
                >
                  {samplePrompt.slice(0, 20)}...
                </Button>
              ))}
            </div>
            <div className="mt-6 space-y-5">
              <div>
                <label className="text-sm font-medium">Width: {width}px</label>
                <Slider
                  min={64}
                  max={1408}
                  step={64}
                  value={[width]}
                  onValueChange={(value) => setWidth(roundToNearest64(value[0]))}
                  className="mt-2"
                />
              </div>
              <div>
                <label className="text-sm font-medium">Height: {height}px</label>
                <Slider
                  min={64}
                  max={1408}
                  step={64}
                  value={[height]}
                  onValueChange={(value) => setHeight(roundToNearest64(value[0]))}
                  className="mt-2"
                />
              </div>
              <div>
                <label className="text-sm font-medium">Steps: {steps}</label>
                <Slider
                  min={1}
                  max={10}
                  step={1}
                  value={[steps]}
                  onValueChange={(value) => setSteps(value[0])}
                  className="mt-2"
                />
              </div>
              <div>
                <label className="text-sm font-medium">Image Style</label>
                <Select value={imageStyle} onValueChange={setImageStyle}>
                  <SelectTrigger className="mt-2 w-full">
                    <SelectValue placeholder="Select an image style" />
                  </SelectTrigger>
                  <SelectContent>
                    {imageStyles.map((style) => (
                      <SelectItem key={style} value={style}>
                        {style}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              {imageStyle === "other" && (
                <div>
                  <label className="text-sm font-medium">Custom Style</label>
                  <Input
                    type="text"
                    placeholder="Enter custom style..."
                    value={customStyle}
                    onChange={(e) => setCustomStyle(e.target.value)}
                    className="mt-2 w-full bg-card text-card-foreground placeholder:text-muted-foreground"
                  />
                </div>
              )}
            </div>
          </fieldset>
        </form>
      </div>

      <div className="flex w-full grow flex-col items-center justify-center pb-8 pt-8 text-center">
        {!image || !prompt ? (
          <div className="max-w-xl md:max-w-4xl lg:max-w-3xl animate-fade-in">
            <h1 className="text-3xl font-bold md:text-4xl lg:text-5xl text-primary mb-4">
              Generate images in real-time
            </h1>
            <p className="mt-4 text-balance text-lg md:text-xl lg:text-2xl text-muted-foreground">
              Enter a prompt and generate images in milliseconds as you type.
              Powered by Flux on Together AI.
            </p>
          </div>
        ) : (
          <div className="mt-8 flex w-full max-w-4xl justify-center animate-fade-in">
            <div className="relative group">
              <Image
                placeholder="blur"
                blurDataURL={imagePlaceholder.blurDataURL}
                width={width}
                height={height}
                src={`data:image/png;base64,${image.b64_json}`}
                alt=""
                className={`${isFetching ? "animate-pulse" : ""} max-w-full rounded-lg object-cover shadow-lg transition-shadow duration-300 hover:shadow-xl`}
              />
              <Button
                onClick={handleDownload}
                className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-accent text-accent-foreground hover:bg-accent/90"
              >
                Download Image
              </Button>
            </div>
          </div>
        )}
      </div>

      <div className="my-12 p-8 bg-accent text-accent-foreground rounded-lg shadow-lg animate-slide-in">
        <h2 className="text-2xl font-bold mb-4">New Feature Showcase</h2>
        <p className="text-lg">This remixed version adds height and width sliders, a step slider, an image style selection, and a download button on image hover.</p>
      </div>

      <footer className="mt-16 w-full items-center pb-10 text-center md:mt-4 md:flex md:justify-between md:pb-5 md:text-sm lg:text-base">
        <p>
          Powered by{" "}
          <a
            href="https://www.dub.sh/together-ai"
            target="_blank"
            className="underline underline-offset-4 transition hover:text-secondary"
          >
            Together.ai
          </a>{" "}
          &{" "}
          <a
            href="https://dub.sh/together-flux"
            target="_blank"
            className="underline underline-offset-4 transition hover:text-secondary"
          >
            Flux
          </a>
        </p>

        <div className="mt-8 flex items-center justify-center md:mt-0 md:justify-between md:gap-6">
          <p className="hidden whitespace-nowrap md:block">
            Remixed from{" "}
            <a
              href="https://github.com/Nutlope/blinkshot"
              target="_blank"
              className="underline underline-offset-4 transition hover:text-secondary"
            >
              Nutlope&apos;s Blinkshot
            </a>
          </p>

          <div className="flex gap-6 md:gap-4">
            <a href="https://github.com/Nutlope/blinkshot" target="_blank">
              <Button
                variant="outline"
                size="sm"
                className="inline-flex items-center gap-2 hover:bg-primary hover:text-primary-foreground transition-colors duration-300"
              >
                <GithubIcon className="size-4" />
                Original GitHub
              </Button>
            </a>
            <a href="https://x.com/nutlope" target="_blank">
              <Button
                size="sm"
                variant="outline"
                className="inline-flex items-center gap-2 hover:bg-primary hover:text-primary-foreground transition-colors duration-300"
              >
                <XIcon className="size-3" />
                Original Creator
              </Button>
            </a>
          </div>
        </div>
      </footer>
    </div>
  );
}
