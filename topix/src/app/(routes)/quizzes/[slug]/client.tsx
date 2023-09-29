"use client";
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
const data = [
  { user: "Ty", points: 99 },
  { user: "Josh", points: 30 },
  { user: "Zach", points: 69 },
  { user: "Ed", points: 10 },
  { user: "Jeff", points: 12 },
];
export const TabCard = () => (
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
          {data.map((item) => (
            <>
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
                  {item.points} pts
                </Label>
              </div>
              <div className="h-0.5 bg-slate-500 w-full" />
            </>
          ))}
        </CardContent>
      </Card>
    </TabsContent>
    <TabsContent value="topics">
      <Card>
        <CardHeader>
          <CardTitle>Topics Covered</CardTitle>
          <CardDescription>Topics covered in the quiz are...</CardDescription>
        </CardHeader>
        <CardContent>
          <ul className="list-disc m-2 font-semibold">
            <li>Super Bowl Winners</li>
            <li>Record Holders</li>
            <li>Iconic Moments</li>
            <li>Goat?</li>
            <li>Rules</li>
            <li>and many more...</li>
          </ul>
        </CardContent>
      </Card>
    </TabsContent>
  </Tabs>
);
