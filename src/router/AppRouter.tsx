// import type { RouteConfig } from "@/types/types";
// import { Suspense } from "react";
// import { Routes, Route } from "react-router-dom";
// //
// import { adminRoutes, authRoutes, publicRoutes } from "./routes";
// import AppLayout from "@/components/layouts/AppLayout";
// import Spinner from "@/components/common/Spinner";

// function renderRoutes(routeConfigs: RouteConfig[]) {
//   return routeConfigs.map((route, index) => (
//     <Route
//       key={route.path + index}
//       path={route.path}
//       element={
//         <Suspense fallback={<div className="h-screen w-full"><Spinner /></div>}>{route.element}</Suspense>
//       }
//     >
//       {route.children && renderRoutes(route.children)}
//     </Route>
//   ));
// }

// export function AppRouter(){
//     return (
//         <Routes>
//           <Route >
//             {renderRoutes(publicRoutes)}
//           </Route>
//           <Route element={<AppLayout />}>
//             {renderRoutes(adminRoutes)}
//           </Route>
//           <Route>
//             {renderRoutes(authRoutes)}
//           </Route>
//         </Routes>
//     )
// }
