import React from "react";
import { fourColumn } from "../../utilities/fourColumn";

const FourColumn = () => {
  return (
    <div className="section-container grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 justify-between gap-8">
      {fourColumn.map((column, index) => (
        <div key={index} className="text-center space-y-8">
          {/* icon all */}
          <div className="flex justify-center">
            <img src={column.icon} alt="icon" />
          </div>

          {/* description */}
          <div className="flex flex-col items-center gap-4">
            <h2 className="font-medium text-xl">{column.title}</h2>
            <h2 className="text-sm text-center md:w-3/4">{column.description}</h2>
          </div>
        </div>
      ))}
    </div>
  );
};

export default FourColumn;
