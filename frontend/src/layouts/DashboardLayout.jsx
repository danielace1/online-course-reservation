import { Link, Outlet } from "react-router";
import { useAuthStore } from "../store/useAuthStore";

const DashboardLayout = () => {
  const { user, logout } = useAuthStore();

  const getLinks = () => {
    if (user.role === "student") {
      return [
        { name: "My Courses", path: "/courses" },
        { name: "Profile", path: "/profile" },
      ];
    }

    if (user.role === "instructor") {
      return [
        { name: "Dashboard", path: "/dashboard" },
        { name: "Create Course", path: "/create-course" },
      ];
    }

    if (user.role === "admin") {
      return [
        { name: "Admin Dashboard", path: "/admin" },
        { name: "Manage Users", path: "/admin/users" },
      ];
    }
  };

  return (
    <div className="flex min-h-screen bg-black text-white">
      {/* Sidebar */}
      <div className="w-64 bg-gray-900 p-6">
        <h2 className="text-xl font-bold mb-6">Panel</h2>

        <div className="flex flex-col gap-4">
          {getLinks().map((link) => (
            <Link key={link.path} to={link.path}>
              {link.name}
            </Link>
          ))}
        </div>

        <button onClick={logout} className="mt-10 text-red-400">
          Logout
        </button>
      </div>

      {/* Content */}
      <div className="flex-1 p-8">
        <Outlet />
      </div>
    </div>
  );
};

export default DashboardLayout;
