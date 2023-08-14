
import { ComponentHeaderProps } from "../models/componenetHeaderProps";
import Mask from "./mask";

function ComponentWithHeader({ title, children }: ComponentHeaderProps) {
  return (
    <div className={`w-full h-full flex flex-col`}>
      <div className="p-4 sticky top-0 left-0  z-20 bg-slate-100 pl-9">
        <h2 className="text-xl   font-semibold ">{title}</h2>
      </div>
      <div className="p-9 pt-0 flex-1">{children}</div>
    </div>
  );
}

export default ComponentWithHeader;
