// // app/browsers/[id]/client.tsx


// "use client";

// import { useState } from "react";

// interface BrowserPageClientProps {
//   initialData: string;
// }

// export function BrowserPageClient({ initialData }: BrowserPageClientProps) {
//   const browser = JSON.parse(initialData);

//   const isWindowsAvailable = browser.platforms.includes("windows");
//   const isMacAvailable = browser.platforms.includes("macos");

//   const [globalPlatform, setGlobalPlatform] = useState<"windows" | "mac">(
//     isMacAvailable ? "mac" : "windows"
//   );

//   return (
//     <div className="py-6">
//       <div className="mb-8">
//         <img src={browser.icon} alt={browser.name} className="w-16 h-16" />
//         <h1 className="text-4xl font-bold">{browser.name}</h1>
//         <p className="text-gray-500">{browser.description}</p>
//       </div>

//       <div className="flex gap-4 mb-6">
//         <button
//           onClick={() => isWindowsAvailable && setGlobalPlatform("windows")}
//           disabled={!isWindowsAvailable}
//           className={`px-4 py-2 rounded ${
//             globalPlatform === "windows" ? "bg-blue-600 text-white" : "bg-gray-200"
//           }`}
//         >
//           Windows
//         </button>
//         <button
//           onClick={() => isMacAvailable && setGlobalPlatform("mac")}
//           disabled={!isMacAvailable}
//           className={`px-4 py-2 rounded ${
//             globalPlatform === "mac" ? "bg-blue-600 text-white" : "bg-gray-200"
//           }`}
//         >
//           macOS
//         </button>
//       </div>

//       {browser.groups.map((group: any) => (
//         <div key={group.title} className="mb-8">
//           <h2 className="text-2xl font-bold mb-4">{group.title}</h2>
//           <ul>
//             {group.shortcuts.map((shortcut: any) => (
//               <li key={shortcut.id} className="mb-2">
//                 <span className="font-mono bg-gray-100 px-2 py-1 rounded">
//                   {shortcut.platforms[globalPlatform].join(" + ")}
//                 </span>{" "}
//                 - {shortcut.description}
//               </li>
//             ))}
//           </ul>
//         </div>
//       ))}
//     </div>
//   );
// }





// "use client";

// import { useState } from "react";
// import { ShortcutGroup } from "@/components/shortcut-group";
// import { Search } from "lucide-react";
// import { UnifiedSidebar } from "@/components/unified-sidebar";

// interface BrowserPageClientProps {
//     initialData: string;
// }

// export function BrowserShortcutPageClient({ initialData }: BrowserPageClientProps) {
//     const browser = JSON.parse(initialData);

//     const [platform, setPlatform] = useState<"windows" | "mac">(() =>
//         browser.platforms.includes("macos") ? "mac" : "windows"
//     );
//     const [searchQuery, setSearchQuery] = useState("");
//     const [filteredGroups, setFilteredGroups] = useState(() => browser.groups);

//     const sections = browser.groups?.map((group: any) => ({
//         id: group.title.toLowerCase().replace(/\s+/g, "-"),
//         title: group.title,
//     })) || [];

//     const handleSearch = (query: string) => {
//         const lowerCaseQuery = query.toLowerCase();
//         setSearchQuery(query);

//         if (!query) {
//             setFilteredGroups(browser.groups);
//             return;
//         }

//         const newFilteredGroups = browser.groups
//             .map((group: any) => ({
//                 ...group,
//                 shortcuts: group.shortcuts.filter(
//                     (shortcut: any) =>
//                         shortcut.description.toLowerCase().includes(lowerCaseQuery) ||
//                         shortcut.keys.join(" ").toLowerCase().includes(lowerCaseQuery)
//                 ),
//             }))
//             .filter((group: any) => group.shortcuts.length > 0);

//         setFilteredGroups(newFilteredGroups);
//     };

//     return (
//         <div className="flex gap-8">
//             <div className="flex-1">
//                 <div className="py-1">
//                     {/* Header Section */}
//                     <div className="flex items-start gap-10 mb-8">
//                         <div className="relative w-20 h-20 shrink-0 bg-gray-100 rounded-lg p-2">
//                             <img
//                                 src={browser.icon}
//                                 alt={browser.name}
//                                 className="w-full h-full object-contain"
//                                 loading="eager"
//                                 decoding="sync"
//                             />
//                         </div>

//                         <div className="flex-1">
//                             <div className="flex items-center justify-between mb-4">
//                                 <h1 className="text-4xl font-bold tracking-tight">{browser.name}</h1>
//                                 <div className="flex gap-2">
//                                     {browser.platforms?.includes("windows") && (
//                                         <button
//                                             onClick={() => setPlatform("windows")}
//                                             className={`px-4 py-2 rounded-lg flex items-center gap-2 transition duration-200 ${platform === "windows"
//                                                     ? "bg-blue-600 text-white"
//                                                     : "bg-gray-100 text-gray-700 hover:bg-blue-100 hover:text-blue-600"
//                                                 }`}
//                                         >
//                                             <img
//                                                 src="https://api.iconify.design/bi:windows.svg"
//                                                 alt="Windows"
//                                                 className="w-5 h-5"
//                                                 loading="eager"
//                                             />
//                                             <span>Windows</span>
//                                         </button>
//                                     )}
//                                     {browser.platforms?.includes("macos") && (
//                                         <button
//                                             onClick={() => setPlatform("mac")}
//                                             className={`px-4 py-2 rounded-lg flex items-center gap-2 transition duration-200 ${platform === "mac"
//                                                     ? "bg-gray-500 text-white"
//                                                     : "bg-gray-100 text-gray-700 hover:bg-gray-300 hover:text-gray-800"
//                                                 }`}
//                                         >
//                                             <img
//                                                 src="https://api.iconify.design/bi:apple.svg"
//                                                 alt="macOS"
//                                                 className="w-5 h-5"
//                                                 loading="eager"
//                                             />
//                                             <span>macOS</span>
//                                         </button>
//                                     )}
//                                 </div>
//                             </div>
//                             <p className="text-gray-500">{browser.description}</p>
//                         </div>
//                     </div>

//                     {/* Search Bar */}
//                     <div className="relative mb-6">
//                         <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
//                             <Search className="h-5 w-5 text-gray-400" />
//                         </div>
//                         <input
//                             type="text"
//                             placeholder="Search shortcuts..."
//                             value={searchQuery}
//                             onChange={(e) => handleSearch(e.target.value)}
//                             className="block w-full pl-10 pr-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
//                         />
//                     </div>

//                     {/* Shortcut Groups */}
//                     <div className="space-y-12">
//                         {filteredGroups.length > 0 ? (
//                             filteredGroups.map((group: any) => (
//                                 <section key={group.title}>
//                                     <h2
//                                         id={group.title.toLowerCase().replace(/\s+/g, "-")}
//                                         className="text-2xl font-bold mb-4"
//                                     >
//                                         {group.title}
//                                     </h2>
//                                     <ShortcutGroup
//                                         key={group.title}
//                                         group={group}
//                                         platform={platform}
//                                         setPlatform={setPlatform}
//                                     />
//                                 </section>
//                             ))
//                         ) : (
//                             <p className="text-gray-500">No shortcuts match your search.</p>
//                         )}
//                     </div>
//                 </div>
//             </div>

//             {/* Sidebar */}
//             <UnifiedSidebar sections={sections} />
//         </div>
//     );
// }

// // app/browsers/[id]/client.tsx


"use client";

import { useState } from "react";
import { ShortcutGroup } from "@/components/shortcut-group";
import { Search } from "lucide-react";
import { UnifiedSidebar } from "@/components/unified-sidebar";
import { CategoryItem, ShortcutGroup as ShortcutGroupType } from "@/data/types";;
import { browsers } from "@/data/browsers"; // Import browsers data
import Link from "next/link";


interface BrowserPageClientProps {
  initialData: string;
  relatedBrowsers: ReadonlyArray<CategoryItem>;
}

export function BrowserShortcutPageClient({ initialData, relatedBrowsers }: BrowserPageClientProps) {
  const browser = JSON.parse(initialData) as CategoryItem;

  const platforms: ReadonlyArray<string> = browser.platforms || [];
  const isWindowsAvailable = platforms.includes("windows");
  const isMacAvailable = platforms.includes("macos");

  const [platform, setPlatform] = useState<"windows" | "mac">(() =>
    isMacAvailable ? "mac" : "windows"
  );

  const [searchQuery, setSearchQuery] = useState("");

  const [filteredGroups, setFilteredGroups] = useState<ShortcutGroupType[]>(
    () => (browser.groups || []) as ShortcutGroupType[]
  );

  const sections = (browser.groups || []).map((group) => ({
    id: group.title.toLowerCase().replace(/\s+/g, "-"),
    title: group.title,
  }));

  const handleSearch = (query: string) => {
    const lowerCaseQuery = query.toLowerCase();
    setSearchQuery(query);

    if (!query) {
      setFilteredGroups((browser.groups || []) as ShortcutGroupType[]);
      return;
    }

    const newFilteredGroups = (browser.groups || [])
      .map((group) => ({
        ...group,
        shortcuts: group.shortcuts.filter(
          (shortcut) =>
            shortcut.description.toLowerCase().includes(lowerCaseQuery) ||
            shortcut.keys.join(" ").toLowerCase().includes(lowerCaseQuery)
        ),
      }))
      .filter((group) => group.shortcuts.length > 0) as ShortcutGroupType[];

    setFilteredGroups(newFilteredGroups);
  };


  return (
    <div className="flex flex-col lg:flex-row gap-8">
      <div className="flex-1 px-4 sm:px-6 lg:px-8">
        <div className="py-5">
          {/* Header Section */}
          <div className="flex flex-col sm:flex-row items-center gap-6 sm:gap-6 mb-8">
            <div className="relative w-24 h-24 sm:w-20 sm:h-20 shrink-0 bg-gray-100 rounded-lg p-2 mx-auto sm:mx-0">
              <img
                src={browser.icon}
                alt={browser.name}
                className="w-full h-full object-contain"
                loading="eager"
                decoding="sync"
              />
            </div>

            <div className="flex-1">
              <div className="flex flex-col sm:flex-row items-center sm:items-center justify-between gap-4 mb-4">
                {/* H1 Section */}
                <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-center sm:text-left flex-1 max-w-lg">
                  {browser.shortcutpageName}
                </h1>

                {/* Buttons Section */}
                <div className="flex gap-2 w-full sm:w-auto justify-center sm:justify-end sm:items-center">
                  <button
                    onClick={() => isWindowsAvailable && setPlatform("windows")}
                    disabled={!isWindowsAvailable}
                    className={`px-4 py-2 rounded-lg flex items-center gap-2 transition duration-200 ${platform === "windows"
                      ? "bg-blue-600 text-white"
                      : "bg-gray-100 text-gray-700 hover:bg-blue-100 hover:text-blue-600"
                      } ${!isWindowsAvailable && "bg-gray-200 text-gray-400 cursor-not-allowed"}`}
                  >
                    <img
                      src="https://api.iconify.design/bi:windows.svg"
                      alt="Windows"
                      className="w-5 h-5"
                    />
                    <span>Windows</span>
                  </button>
                  {/* macOS Button */}
                  <button
                    onClick={() => isMacAvailable && setPlatform("mac")}
                    disabled={!isMacAvailable}
                    className={`px-4 py-2 rounded-lg flex items-center gap-2 transition duration-200 ${platform === "mac"
                      ? "bg-gray-500 text-white"
                      : "bg-gray-100 text-gray-700 hover:bg-gray-300 hover:text-gray-800"
                      } ${!isMacAvailable && "bg-gray-200 text-gray-400 cursor-not-allowed"}`}
                  >
                    <img
                      src="https://api.iconify.design/bi:apple.svg"
                      alt="macOS"
                      className="w-5 h-5"
                    />
                    <span>macOS</span>
                  </button>
                </div>
              </div>

              {/* Description Section */}
              <p className="text-gray-500 text-sm sm:text-base text-center sm:text-left">
                {browser.description}
              </p>
              {/* Description Section */}


              {/* Official URL Section */}
              {browser.officialURL && (
                <p className="text-gray-500 text-sm sm:text-base text-center sm:text-left mt-2">
                  Official URL:{" "}
                  <a
                    href={browser.officialURL}
                    target="_blank"
                    rel="nofollow noopener noreferrer"
                    className="text-blue-600 hover:underline"
                  >
                    {browser.officialURL}
                  </a>
                </p>
              )}
            </div>
          </div>



          {/* Search Bar */}
          <div className="relative mb-6">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <Search className="h-5 w-5 text-gray-400" />
            </div>
            <input
              type="text"
              placeholder="Search shortcuts..."
              value={searchQuery}
              onChange={(e) => handleSearch(e.target.value)}
              className="block w-full pl-10 pr-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>

          {/* Shortcuts Groups */}
          <div className="space-y-12">
            {filteredGroups.length > 0 ? (
              filteredGroups.map((group: ShortcutGroupType) => (
                <section key={group.title}>
                  <h2
                    id={group.title.toLowerCase().replace(/\s+/g, "-")}
                    className="text-2xl font-bold mb-4"
                  >
                    {group.title}
                  </h2>
                  <ShortcutGroup
                    key={group.title}
                    group={group as ShortcutGroupType} // Explicitly cast group to ShortcutGroupType
                    platform={platform}
                    setPlatform={setPlatform}
                    isWindowsAvailable={isWindowsAvailable}
                    isMacAvailable={isMacAvailable}
                  />
                </section>
              ))
            ) : (
              <p className="text-gray-500">No shortcuts match your search.</p>
            )}
          </div>

          {/* Related Browsers Section */}
          <div className="mt-12">
            <h2 className="text-2xl font-bold mb-6">Related Browsers</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
              {relatedBrowsers.map((relatedBrowser) => (
                <Link
                  key={relatedBrowser.id}
                  href={`/browsers/${relatedBrowser.id}`}
                  className="bg-gray-100 p-4 rounded-lg shadow hover:shadow-lg transition"
                >
                  <div className="cursor-pointer">
                    <img
                      src={relatedBrowser.icon}
                      alt={relatedBrowser.name}
                      className="w-16 h-16 mx-auto mb-4"
                    />
                    <h3 className="text-lg font-semibold text-center">
                      {relatedBrowser.name}
                    </h3>
                    <p className="text-gray-500 text-sm text-center">
                      {relatedBrowser.description}
                    </p>
                  </div>
                </Link>
              ))}
            </div>
          </div>

        </div>
      </div>
      {/* Sidebar */}
      <UnifiedSidebar
        sections={sections}
        details={{
          name: browser.name, // Dynamically add browser name
          description: browser.description, // Dynamically add browser description
        }}
        popularItems={Object.values(browsers)
          .filter((b) => b.id !== browser.id) // Exclude the current browser
          .sort(() => 0.5 - Math.random()) // Shuffle the array
          .slice(0, 5) // Select the top 5
          .map((b) => ({
            id: b.id,
            name: b.name,
            icon: b.icon,
            link: `/browsers/${b.id}`, // Generate the link
          }))}
      />


    </div >
  );
}
