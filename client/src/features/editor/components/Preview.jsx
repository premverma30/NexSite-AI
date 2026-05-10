import React, { memo } from "react";

const Preview = memo(({ code }) => {
  return (
    <iframe
      className="flex-1 w-full bg-white"
      srcDoc={code}
      sandbox="allow-scripts allow-forms"
      title="Live Preview"
    />
  );
});

Preview.displayName = "Preview";
export default Preview;
