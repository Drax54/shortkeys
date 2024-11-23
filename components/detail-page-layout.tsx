// //components/detail-page-layout.tsx

// // components/detail-page-layout.tsx
// "use client";

// import { useState, useEffect } from "react";
// import { SoftwarePageClient } from "@/app/software/[id]/client";
// import { UnifiedSidebar } from "@/components/unified-sidebar";

// interface DetailPageLayoutProps {
//   app: any; // You might want to type this properly based on your data structure
// }

// export function DetailPageLayout({ app }: DetailPageLayoutProps) {
//   const [sections, setSections] = useState<{ id: string; title: string }[]>([]);

//   useEffect(() => {
//     if (app?.groups) {
//       const groupSections = app.groups.map((group: any) => ({
//         id: group.title.toLowerCase().replace(/\s+/g, "-"),
//         title: group.title,
//       }));
//       setSections(groupSections);
//     }
//   }, [app]);

//   return (
//     <div className="container flex gap-8">
//       <div className="flex-1">
//         <SoftwarePageClient app={app} sections={sections} />
//       </div>
//       <UnifiedSidebar initialSections={sections} />
//     </div>
//   );
// }





// components/detail-page-layout.tsx
"use client";

import { SoftwarePageClient } from "@/app/software/[id]/client";
import { ReactNode } from "react";
import { UnifiedSidebar } from "@/components/unified-sidebar";
import { Application } from "@/types/shortcut";


interface DetailPageLayoutProps {
  app: Application; // Update with proper typing if available
}

interface Section {
  id: string;
  title: string;
}

// interface SoftwarePageClientProps {
//   app: any;
//   sections: Section[];
//   initialData: any; // Ensure this property is included to avoid TS errors
// }
export default function DetailPageLayout({ app }: DetailPageLayoutProps) {
  // Convert groups to sections
  const sections: Section[] = app.groups.map((group) => ({
    id: group.title.toLowerCase().replace(/\s+/g, "-"),
    title: group.title,
  }));

  return (
    <div className="flex gap-8">
      <div className="flex-1">
        <div className="py-5">
          <SoftwarePageClient initialData={JSON.stringify(app)} />
        </div>
      </div>

      {/* Sidebar */}
      <UnifiedSidebar sections={sections} />
    </div>
  );
}