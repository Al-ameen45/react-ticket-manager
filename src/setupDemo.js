const setupDemoUser = () => {
  const users = JSON.parse(localStorage.getItem("ticketapp_users") || "[]");

  if (!users.find((u) => u.email === "demo@ticket.com")) {
    users.push({
      id: "demo_user_1",
      name: "Demo User",
      email: "demo@ticket.com",
      password: "demo123",
    });
    localStorage.setItem("ticketapp_users", JSON.stringify(users));
    console.log("✅ Demo user created: demo@ticket.com / demo123");
  }

  const tickets = JSON.parse(localStorage.getItem("ticketapp_tickets") || "[]");

  if (tickets.length === 0) {
    const demoTickets = [
      {
        id: "ticket_demo_1",
        title: "Welcome to Ticket Manager",
        description:
          "This is a sample ticket to help you get started. Feel free to edit or delete it!",
        status: "open",
        priority: "medium",
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      },
      {
        id: "ticket_demo_2",
        title: "Fix navigation bug",
        description:
          "Users reported issues with the navigation menu on mobile devices.",
        status: "in_progress",
        priority: "high",
        createdAt: new Date(Date.now() - 86400000).toISOString(),
        updatedAt: new Date().toISOString(),
      },
      {
        id: "ticket_demo_3",
        title: "Update documentation",
        description: "Add more examples to the user guide.",
        status: "closed",
        priority: "low",
        createdAt: new Date(Date.now() - 172800000).toISOString(),
        updatedAt: new Date(Date.now() - 43200000).toISOString(),
      },
    ];
    localStorage.setItem("ticketapp_tickets", JSON.stringify(demoTickets));
    console.log("✅ Demo tickets created");
  }
};

setupDemoUser();
