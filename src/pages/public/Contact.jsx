import React, { useState } from "react";
import { useTheme } from "../../context/ThemeContext";
import Input from "../../components/ui/Input";
import Button from "../../components/ui/Button";
import toast from "react-hot-toast";

const Contact = () => {
  const { theme } = useTheme();
  const dark = theme === "dark";

  const [form, setForm] = useState({
    name: "",
    email: "",
    message: "",
  });

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!form.name || !form.email || !form.message) {
      return toast.error("Please fill in all fields.");
    }

    toast.success("Thanks for your message! We'll get back soon.");
    setForm({ name: "", email: "", message: "" });
  };

  return (
    <section
      className={`min-h-screen pt-32 ${
        dark ? "bg-neutral-950" : "bg-white"
      }`}
    >
      <div className="mx-auto max-w-xl px-6 pb-20">
        {/* Heading */}
        <h1
          className={`text-4xl font-extrabold tracking-tight ${
            dark ? "text-white" : "text-black"
          }`}
        >
          Contact us
        </h1>

        <p
          className={`mt-4 text-lg ${
            dark ? "text-gray-100" : "text-gray-700"
          }`}
        >
          Have a question, feedback, or need help? Send us a message and we’ll
          respond as soon as possible.
        </p>

        {/* Form */}
        <form onSubmit={handleSubmit} className="mt-10 space-y-6">
          <Input
            label="Full name"
            name="name"
            value={form.name}
            onChange={handleChange}
          />

          <Input
            label="Email"
            name="email"
            type="email"
            value={form.email}
            onChange={handleChange}
          />

          {/* Message */}
          <div>
            <label
              className={`block text-sm font-medium ${
                dark ? "text-gray-100" : "text-gray-700"
              }`}
            >
              Message
            </label>
            <textarea
              name="message"
              rows={4}
              value={form.message}
              onChange={handleChange}
              className={`mt-1 w-full rounded-lg border px-3 py-2 text-sm transition focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                dark
                  ? "border-neutral-700 bg-neutral-900 text-white"
                  : "border-gray-300 bg-white text-black"
              }`}
            />
          </div>

          <Button type="submit">Send message</Button>
        </form>
      </div>
    </section>
  );
};

export default Contact;
