const getTitleFromPath = (pathName: string): string | undefined => {
  const match = pathName.match(/\/[^/]+\/admin_/);
  if (match && match.index !== undefined) {
    const parts = pathName.slice(match.index + match[0].length).split("/");
    console.log(parts, "parts");
    return parts[1] || "Dashboard"; // Return the segment after the admin ID or "Dashboard" if not present
  }
  return undefined; // Add a return statement for cases where the condition is not met
};

export default getTitleFromPath;
