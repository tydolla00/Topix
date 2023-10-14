"use client";
import { Scores, topix } from "@prisma/client";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from "@/shadcn/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/shadcn/ui/tabs";
import { Label } from "@/shadcn/ui/label";
import { Avatar, AvatarImage } from "@/shadcn/ui/avatar";

export default function Scores({
  scores,
  topix,
}: {
  scores: Scores[];
  topix: topix[];
}) {
  return (
    <Tabs defaultValue="highscore" className="w-[400px]">
      <TabsList className="grid w-full grid-cols-2">
        <TabsTrigger value="highscore">High Scores</TabsTrigger>
        <TabsTrigger value="topics">Topics</TabsTrigger>
      </TabsList>
      <TabsContent value="highscore">
        <Card>
          <CardHeader>
            <CardTitle>High Scores</CardTitle>
            <CardDescription>
              Here are the players with the highest scores!
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-2">
            {scores.map((item) => (
              <div key={item.id}>
                <div className="space-y-1 space-x-1 flex">
                  <Avatar>
                    <AvatarImage
                      className="w-20 rounded-full"
                      alt="Profile Pic"
                      src="/harry-potter.png"
                    />
                  </Avatar>
                  <Label id="username">{item.user}</Label>
                  <Label id="points" className="ml-auto text-amber-400">
                    {item.score} pts
                  </Label>
                </div>
                <div className="h-0.5 bg-slate-500 w-full" />
              </div>
            ))}
          </CardContent>
        </Card>
      </TabsContent>
      <TabsContent value="topics">
        <Card>
          <CardHeader>
            <CardTitle>Topics Covered</CardTitle>
            <CardDescription>
              Topics covered in this game are...
            </CardDescription>
          </CardHeader>
          <CardContent>
            <ul className="list-disc m-2 font-semibold">
              {topix.map((item) => (
                <li key={item.id}>{item.title}</li>
              ))}
            </ul>
          </CardContent>
        </Card>
      </TabsContent>
    </Tabs>
  );
}
