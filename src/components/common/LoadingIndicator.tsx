import React from "react";
import { ProjectHiveLogo } from "../../AppIcons/appIcons";

export const LoadingIndiacator = () => {
  return (
    <div className="flex items-center justify-center py-10">
      <ProjectHiveLogo className={"w-20 h-20 stroke-white animate-spin"} />
    </div>
  );
};
