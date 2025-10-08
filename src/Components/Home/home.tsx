"use client";

export default function HomeComponent() {
  

  return (
    <div className=" bg-gray-50">
    
      {/* Hero */}
<section className="relative font-serif bg-gradient-to-br from-gray-100 to-gray-200 py-16 md:py-28 px-6 text-center">
  <div className="max-w-4xl mx-auto">
    <h1 className="text-2xl md:text-6xl text-teal-700 font-extrabold mb-6 animate-fadeIn">
      Manage Employees with Power & Precision
    </h1>
    <p className="text-lg md:text-xl mb-8">
      A complete Employee Management System to create, view, update, and analyze your workforce with real-time queries and automation.
    </p>
    <div className="space-x-4">
      <a
        href="/signup"
        className="px-8 py-3 rounded-xl bg-white text-cyan-700 font-semibold shadow-lg hover:scale-105 transition animate-pulse"
      >
        Try It Free
      </a>
      <a
        href="/login"
        className="px-8 py-3 rounded-xl bg-teal-500 text-white font-semibold shadow-lg hover:bg-teal-600 transition"
      >
        Login
      </a>
    </div>
  </div>
</section>

{/* Problem */}
<section className="py-20 px-6 bg-white text-center">
  <h2 className="text-2xl md:text-4xl font-bold mb-6">
    Tired of manual HR processes and scattered data?
  </h2>
  <p className="text-gray-600 md:text-lg max-w-3xl mx-auto">
    Stop wasting time switching between spreadsheets and tools. Our Employee Management System lets you handle every aspect of employee data—from creation to analytics—in one dashboard.
  </p>
</section>

{/* Features */}
<section className="py-20 px-6 bg-gray-50">
  <div className="max-w-6xl mx-auto text-center mb-16">
    <h2 className="text-2xl md:text-4xl font-bold mb-4">Core Functionalities</h2>
    <p className="text-gray-600">
      Designed for HR teams, admins, and managers to control and visualize employee data efficiently.
    </p>
  </div>
  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10 max-w-6xl mx-auto">
    {[
      {
        title: "Employee CRUD Operations",
        desc: "Easily create, update, and delete employee records with a few clicks.",
      },
      {
        title: "Advanced Multi-Query Search",
        desc: "Filter employees by department, role, salary range, and more in real-time.",
      },
      {
        title: "Data Table with Sorting",
        desc: "View employees in a sleek, sortable, and paginated table interface.",
      },
      {
        title: "Dynamic Data Validation",
        desc: "Ensure data integrity with Zod-based backend validation.",
      },
      {
        title: "Secure API Integration",
        desc: "Built with Node.js and Express for fast and secure operations.",
      },
      {
        title: "Real-Time Updates",
        desc: "Instantly reflect changes in the UI using React Query and Axios.",
      },
    ].map((f, i) => (
      <div
        key={i}
        className="bg-white rounded-2xl p-8 shadow-md hover:shadow-2xl hover:scale-105 transition"
      >
        <h3 className="text-xl font-semibold mb-3 text-teal-700">
          {f.title}
        </h3>
        <p className="text-gray-600">{f.desc}</p>
      </div>
    ))}
  </div>
</section>

{/* How It Works */}
<section className="py-20 px-6 bg-white text-center">
  <h2 className="text-2xl md:text-4xl font-bold mb-12">How It Works</h2>
  <div className="grid grid-cols-1 md:grid-cols-3 gap-10 max-w-6xl mx-auto">
    {[
      {
        step: "1",
        title: "Add or Import Employees",
        desc: "Create employee records manually or import data in bulk.",
      },
      {
        step: "2",
        title: "Query & Manage Data",
        desc: "Filter by multiple fields to quickly find and analyze specific employees.",
      },
      {
        step: "3",
        title: "Edit, Delete & Sync",
        desc: "Instantly update or remove records, synced across all views in real-time.",
      },
    ].map((s, i) => (
      <div
        key={i}
        className="p-8 bg-gray-50 rounded-2xl shadow-md hover:shadow-xl hover:scale-105 transition"
      >
        <span className="text-2xl md:text-4xl font-bold text-cyan-600">
          {s.step}
        </span>
        <h3 className="text-xl font-semibold mt-4 mb-2">{s.title}</h3>
        <p className="text-gray-600">{s.desc}</p>
      </div>
    ))}
  </div>
</section>

{/* Stats */}
<section className="py-20 px-6 bg-gradient-to-r from-teal-600 to-cyan-600 text-white text-center">
  <div className="grid grid-cols-1 md:grid-cols-3 gap-10 max-w-6xl mx-auto">
    {[
      { number: "5K+", label: "Employees Managed" },
      { number: "1.5K+", label: "Queries Processed Daily" },
      { number: "99.9%", label: "Data Accuracy" },
    ].map((s, i) => (
      <div
        key={i}
        className="p-6 rounded-xl bg-white/10 backdrop-blur-md hover:scale-105 transition"
      >
        <h3 className="text-2xl md:text-4xl font-bold">{s.number}</h3>
        <p className="text-cyan-100">{s.label}</p>
      </div>
    ))}
  </div>
</section>

{/* Testimonials */}
<section className="py-20 px-6 bg-white">
  <div className="max-w-5xl mx-auto text-center mb-12">
    <h2 className="text-2xl md:text-4xl font-bold">What Our Users Say</h2>
  </div>
  <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
    {[
      {
        name: "Farah, HR Manager",
        text: "Managing 200+ employees has never been this smooth. The real-time search and table are life-savers!",
      },
      {
        name: "Tan, Admin Officer",
        text: "I can update or delete employee data instantly. No reloads. Just works perfectly!",
      },
      {
        name: "Rina, Project Lead",
        text: "Finally a system where data handling feels effortless and modern.",
      },
    ].map((t, i) => (
      <div
        key={i}
        className="p-8 border rounded-xl shadow-md bg-gray-50 hover:scale-105 transition"
      >
        <p className="text-gray-700 italic mb-4">“{t.text}”</p>
        <h4 className="font-semibold text-teal-600">{t.name}</h4>
      </div>
    ))}
  </div>
</section>

{/* Pricing */}
<section className="py-20 px-6 bg-gray-50 text-center">
  <h2 className="text-2xl md:text-4xl font-bold mb-12">
    Choose a Plan That Fits Your Team
  </h2>
  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10 max-w-6xl mx-auto">
    {[
      {
        plan: "Starter",
        price: "$0",
        features: ["Up to 20 Employees", "Basic CRUD", "Email Support"],
      },
      {
        plan: "Professional",
        price: "$10/mo",
        features: [
          "Unlimited Employees",
          "Advanced Query Filters",
          "Real-Time Sync",
        ],
      },
      {
        plan: "Enterprise",
        price: "$25/mo",
        features: [
          "Custom Reports",
          "Multi-Admin Access",
          "Dedicated Cloud Hosting",
        ],
      },
    ].map((p, i) => (
      <div
        key={i}
        className="p-8 border rounded-2xl shadow-lg bg-white hover:scale-105 transition"
      >
        <h3 className="text-2xl font-bold mb-2">{p.plan}</h3>
        <p className="text-3xl font-extrabold mb-4">{p.price}</p>
        <ul className="space-y-2 text-gray-600">
          {p.features.map((f, idx) => (
            <li key={idx}>✓ {f}</li>
          ))}
        </ul>
        <button className="mt-6 px-6 py-3 rounded-lg bg-cyan-600 text-white font-semibold hover:bg-cyan-700 transition">
          Choose {p.plan}
        </button>
      </div>
    ))}
  </div>
</section>

{/* Final CTA */}
<section className="py-20 px-6 bg-gradient-to-r from-teal-600 to-cyan-600 text-white text-center">
  <h2 className="text-2xl md:text-4xl font-bold mb-6">
    Ready to Control Your Workforce Efficiently?
  </h2>
  <p className="mb-8 text-lg text-cyan-100">
    Simplify data handling, automate reports, and manage employees faster than ever.
  </p>
  <a
    href="/signup"
    className="px-10 py-4 rounded-xl bg-white text-cyan-700 font-semibold shadow-lg hover:scale-105 transition"
  >
    Get Started Now
  </a>
</section>

    </div>
  );
}
