document.getElementById("loginForm")?.addEventListener("submit", function(e) {
    e.preventDefault();
    
    const role = document.getElementById("role").value;

    // Role-based redirection
    if (role === "student") {
        window.location.href = "dashboard/student-dashboard.html";
    } else if (role === "faculty") {
        window.location.href = "dashboard/faculty-dashboard.html";
    } else if (role === "admin") {
        window.location.href = "dashboard/admin-dashboard.html";
    }
});