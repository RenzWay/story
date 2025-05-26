export function getActivePathname() {
  const rute = location.hash.replace("#", "");
  return rute || "/";
}

function extractPathname(pathname) {
  const splitName = pathname.split("/");

  return {
    resource: splitName[1] || null,
    id: splitName[2] || null,
  };
}

function constructRouteSegment(segment) {
  let pathname = "";

  if (segment.resource) {
    pathname += `/${segment.resource}`;
  }

  if (segment.id) {
    pathname += "/:id";
  }

  return pathname || "/";
}

export function getActiveRoute() {
  const path = getActivePathname();
  const segment = extractPathname(path);

  return constructRouteSegment(segment);
}
