import Header from "./header";
import { Children } from "../models/children";

function Layout({ children }: Children) {
  return (
    <div className="h-full w-full flex-col flex items-center justify-center bg-[#302650]">
      <Header />
      <div className="flex-1 w-full rounded-tl-[30px] mt-2 overflow-hidden">
        {children}
      </div>
    </div>
  );
}

export default Layout;
