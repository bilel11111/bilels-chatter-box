import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ChessGame } from "./ChessGame";
import { TicTacToeGame } from "./TicTacToeGame";
import { DailyQuotes } from "./DailyQuotes";
import { Navigation } from "./Navigation";
import { Gamepad2, Quote, Trophy } from "lucide-react";

export const GamesLayout = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background/95 to-secondary/20 p-4 relative">
      <Navigation />
      <div className="max-w-6xl mx-auto space-y-6">
        <div className="text-center space-y-2">
          <h1 className="text-4xl font-bold bg-gradient-to-r from-primary to-primary/70 bg-clip-text text-transparent">
            Games & Quotes
          </h1>
          <p className="text-muted-foreground">
            Challenge yourself with games and get inspired with daily quotes
          </p>
        </div>

        <Tabs defaultValue="games" className="w-full">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="games" className="flex items-center gap-2">
              <Gamepad2 className="w-4 h-4" />
              Games
            </TabsTrigger>
            <TabsTrigger value="quotes" className="flex items-center gap-2">
              <Quote className="w-4 h-4" />
              Daily Quotes
            </TabsTrigger>
          </TabsList>

          <TabsContent value="games" className="space-y-6">
            <div className="grid md:grid-cols-2 gap-6">
              <Card className="shadow-lg border-primary/20">
                <CardHeader className="text-center">
                  <CardTitle className="flex items-center justify-center gap-2">
                    <Trophy className="w-5 h-5 text-primary" />
                    Chess
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <ChessGame />
                </CardContent>
              </Card>

              <Card className="shadow-lg border-primary/20">
                <CardHeader className="text-center">
                  <CardTitle className="flex items-center justify-center gap-2">
                    <Trophy className="w-5 h-5 text-primary" />
                    Tic-Tac-Toe
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <TicTacToeGame />
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="quotes">
            <DailyQuotes />
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};