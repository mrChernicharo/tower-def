import { Outlet } from "react-router-dom";

export function Root() {
  return (
    <>
      <div>Root</div>

      <Outlet />
    </>
  );
}
