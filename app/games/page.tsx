// import { Gamepad2 } from "lucide-react";
// import { Card } from "@/components/ui/card";
// import Link from "next/link";

// const games = [
//   {
//     id: "minecraft",
//     name: "Minecraft",
//     icon: "/icons/games/minecraft.svg",
//     description: "Building and survival game shortcuts",
//   },
//   {
//     id: "valorant",
//     name: "Valorant",
//     icon: "/icons/games/valorant.svg",
//     description: "Tactical shooter game shortcuts",
//   },
//   {
//     id: "rocket-league",
//     name: "Rocket League",
//     icon: "/icons/games/rocket-league.svg",
//     description: "Soccer car game shortcuts",
//   },
//   {
//     id: "counter-strike-2",
//     name: "Counter-Strike 2",
//     icon: "/icons/games/counter-strike-2.svg",
//     description: "Tactical FPS game shortcuts",
//   },
//   {
//     id: "fortnite",
//     name: "Fortnite",
//     icon: "/icons/games/fortnite.svg",
//     description: "Battle royale game shortcuts",
//   },
//   {
//     id: "portal-2",
//     name: "Portal 2",
//     icon: "/icons/games/portal-2.svg",
//     description: "Puzzle game shortcuts",
//   },
//   {
//     id: "grand-theft-auto-v",
//     name: "Grand Theft Auto V",
//     icon: "/icons/games/gta5.svg",
//     description: "Open world game shortcuts",
//   },
//   {
//     id: "cyberpunk-2077",
//     name: "Cyberpunk 2077",
//     icon: "/icons/games/cyberpunk-2077.svg",
//     description: "RPG game shortcuts",
//   },
//   {
//     id: "world-of-warcraft",
//     name: "World of Warcraft",
//     icon: "/icons/games/world-of-warcraft.svg",
//     description: "MMORPG game shortcuts",
//   },
//   {
//     id: "elden-ring",
//     name: "Elden Ring",
//     icon: "/icons/games/elden-ring.svg",
//     description: "Action RPG game shortcuts",
//   },
// ];


// export default function GamesPage() {
//   return (
//     <div className="container py-10 ">
//       <div className="flex items-center gap-4 mb-8">
//         <Gamepad2 className="h-10 w-10" />
//         <div>
//           <h1 className="text-3xl font-bold tracking-tight">Game Controls</h1>
//           <p className="text-muted-foreground">
//             Keyboard and controller shortcuts for popular games
//           </p>
//         </div>
//       </div>

//       <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
//         {games.map((game) => (
//           <Link key={game.id} href={`/games/${game.id}`}>
//             <Card className="p-6 hover:shadow-lg transition-shadow">
//               <div className="flex items-center gap-4">
//                 <img
//                   src={game.icon}
//                   alt={game.name}
//                   className="w-12 h-12 object-cover rounded"
//                 />
//                 <div>
//                   <h2 className="font-semibold">{game.name}</h2>
//                   <p className="text-sm text-muted-foreground">
//                     {game.description}
//                   </p>
//                 </div>
//               </div>
//             </Card>
//           </Link>
//         ))}
//       </div>
//     </div>
//   );
// }




// app/games/page.tsx
"use client";

import { useState } from "react";
import { Search, Gamepad2, X } from "lucide-react";
import Link from "next/link";
import { games } from "@/data/games";
import { Card } from "@/components/ui/card";
import { cn } from "@/lib/utils";

// Pre-compute the games array
const gamesArray = Object.values(games);

export default function GamesPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [isFocused, setIsFocused] = useState(false);

  const filteredGames = searchQuery
    ? gamesArray.filter(game => 
        game.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        game.description.toLowerCase().includes(searchQuery.toLowerCase())
      )
    : gamesArray;

  return (
    <div className="py-10">
      {/* Header Section with Search */}
      <div className="flex justify-between items-start mb-12">
        {/* Title and Description */}
        <div className="flex items-start gap-4">
          <Gamepad2 className="h-12 w-12" />
          <div>
            <h1 className="text-3xl font-bold">Game Controls</h1>
            <p className="text-gray-500 text-lg">
              Keyboard and controller shortcuts for popular games
            </p>
          </div>
        </div>

        {/* Enhanced Search Bar */}
        <div className="relative w-72 group">
          <div 
            className={cn(
              "relative flex items-center transition-all duration-300",
              isFocused && "scale-105"
            )}
          >
            <Search 
              className={cn(
                "absolute left-3 w-5 h-5 transition-all duration-300",
                isFocused ? "text-blue-500" : "text-gray-400"
              )} 
            />
            <input
              type="text"
              placeholder="Search games..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              onFocus={() => setIsFocused(true)}
              onBlur={() => setIsFocused(false)}
              className={cn(
                "w-full pl-10 pr-4 py-2.5 border rounded-lg",
                "bg-white/80 backdrop-blur-sm",
                "transition-all duration-300 ease-in-out",
                "placeholder:text-gray-400 placeholder:transition-opacity",
                "focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500",
                isFocused ? "shadow-lg border-blue-500" : "border-gray-200 shadow-sm",
                "hover:border-gray-300"
              )}
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery("")}
                className={cn(
                  "absolute right-3 p-1 rounded-full",
                  "text-gray-400 hover:text-gray-600",
                  "hover:bg-gray-100 transition-colors",
                  "focus:outline-none focus:ring-2 focus:ring-blue-500/50"
                )}
              >
                <X className="w-4 h-4" />
              </button>
            )}
          </div>
          
          {/* Optional: Search Results Count */}
          {searchQuery && (
            <div className="absolute -bottom-6 left-0 text-sm text-gray-500 transition-opacity">
              {filteredGames.length} result{filteredGames.length !== 1 ? 's' : ''}
            </div>
          )}
        </div>
      </div>

      {/* Grid Layout */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredGames.length > 0 ? (
          filteredGames.map((game) => (
            <Link key={game.id} href={`/games/${game.id}`}>
              <Card className="p-6 hover:shadow-lg transition-shadow">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 shrink-0">
                    <img
                      src={game.icon}
                      alt={game.name}
                      className="w-full h-full rounded object-contain"
                      loading="eager"
                      decoding="sync"
                    />
                  </div>
                  <div>
                    <h2 className="font-semibold">{game.name}</h2>
                    <p className="text-base text-muted-foreground">
                      {game.description}
                    </p>
                  </div>
                </div>
              </Card>
            </Link>
          ))
        ) : (
          <p className="text-center text-gray-500 col-span-full">
            No games found matching your search.
          </p>
        )}
      </div>
    </div>
  );
}