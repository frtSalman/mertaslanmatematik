import { Outlet } from "react-router-dom";
import Sidebar from "./Sidebar";
import Header from "./Header";

function AppLayout() {
  return (
    <div className="grid grid-rows-[auto_auto_1fr] grid-cols-1 min-h-screen bg-gradient-to-br from-orange-200 via-green-200 to-blue-200 md:grid-cols-[250px_auto] md:grid-rows-[auto_1fr]">
      <div className="md:row-span-2 ">
        <Sidebar />
      </div>

      <div className="md:col-start-2">
        <Header />
      </div>

      <div className="relative flex-col bg-emerald-50/95 md:col-start-2">
        <div
          className="absolute inset-0 z-0 
          bg-[url('/mert_aslan_logo.png')] 
          bg-center bg-no-repeat bg-contain
          opacity-50 
          backdrop-blur-sm
          filter blur-[5px]"
        />

        <div className="relative z-10 rounded-lg">
          <div
            className="p-4 overflow-auto max-h-[70vh] md:max-h-[87vh] max-w-full m-auto
          [&::-webkit-scrollbar:vertical]:w-0 
          [&::-webkit-scrollbar-thumb:vertical]:bg-transparent

          
          [&::-webkit-scrollbar]:h-4
        [&::-webkit-scrollbar-track]:bg-orange-100
        [&::-webkit-scrollbar-thumb]:bg-orange-400/80
        [&::-webkit-scrollbar-thumb:hover]:bg-orange-500"
          >
            <Outlet />
          </div>
        </div>
      </div>
    </div>
  );
}

export default AppLayout;
