"use client";
import NavigateNextIcon from "@mui/icons-material/NavigateNext";
import Breadcrumbs from "@mui/material/Breadcrumbs";
import Link from "@mui/material/Link";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import { useRouter } from "next/navigation";

interface Path {
  path: string;
}

export default function BreadCrumbs({ path }: Path) {
  const router = useRouter();

  // Function to map pathnames to breadcrumb titles
  const getBreadcrumbTitle = (segment: string) => {
    if (segment.startsWith("admin_")) {
      return "Home"; // Replace the dynamic admin ID with "Home"
    }
    return segment.charAt(0).toUpperCase() + segment.slice(1); // Capitalize other segments
  };

  // Split the path and remove empty segments
  const pathSegments = path.split("/").filter((segment) => segment !== "");

  // Remove the first segment if it's "admin"
  if (pathSegments[0] === "admin") {
    pathSegments.shift();
  }

  // Generate dynamic breadcrumbs
  const breadcrumbs = pathSegments.map((segment, index) => {
    const isLast = index === pathSegments.length - 1;
    const segmentPath = `/${pathSegments.slice(0, index + 1).join("/")}`;

    return isLast ? (
      <Typography key={index} sx={{ color: "text.primary" }}>
        {getBreadcrumbTitle(segment)}
      </Typography>
    ) : (
      <Link
        underline="hover"
        key={index}
        color="inherit"
        href={segmentPath}
        onClick={(e) => {
          e.preventDefault();
          router.push(segmentPath);
        }}
      >
        {getBreadcrumbTitle(segment)}
      </Link>
    );
  });

  return (
    <Stack spacing={2}>
      <Breadcrumbs
        separator={<NavigateNextIcon fontSize="small" />}
        aria-label="breadcrumb"
      >
        {breadcrumbs}
      </Breadcrumbs>
    </Stack>
  );
}
