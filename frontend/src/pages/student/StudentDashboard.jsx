import StudentSidebar from "./StudentSidebar";

const StudentDashboard = () => {
  return (
    <div className="flex h-screen">
      <StudentSidebar />
      <main className="flex-1 bg-gray-100 p-6 overflow-y-auto">
        {/* Dashboard content here */}
        <h1 className="text-3xl font-bold mb-4">Welcome to Your Dashboard</h1>
      </main>
    </div>
  );
};

export default StudentDashboard;
