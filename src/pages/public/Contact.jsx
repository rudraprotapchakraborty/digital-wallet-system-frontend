import React, { useState } from "react";
import Input from "../../components/ui/Input";
import Button from "../../components/ui/Button";
import toast from "react-hot-toast";

const Contact = () => {
  const [form, setForm] = useState({ name: "", email: "", message: "" });

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
    <section className="page">
      <h1>Contact us</h1>
      <form className="form" onSubmit={handleSubmit}>
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
        <div className="field">
          <label className="field-label">Message</label>
          <textarea
            className="field-input"
            name="message"
            rows={4}
            value={form.message}
            onChange={handleChange}
          />
        </div>
        <Button type="submit">Send message</Button>
      </form>
    </section>
  );
};

export default Contact;
