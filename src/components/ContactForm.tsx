"use client";

import React, { useActionState } from "react";
import { useFormStatus } from "react-dom";
import { sendEmail } from "@/app/actions/sendEmail";
import { motion } from "framer-motion";
import { Send, CheckCircle2, AlertCircle, Loader2 } from "lucide-react";

function SubmitButton() {
  const { pending } = useFormStatus();

  return (
    <button
      type="submit"
      disabled={pending}
      className="w-full py-3.5 rounded-xl bg-sky-500 hover:bg-sky-400 text-slate-950 font-bold text-sm transition-all flex items-center justify-center gap-2.5 shadow-lg shadow-sky-500/25 disabled:opacity-50 disabled:cursor-not-allowed"
    >
      {pending ? (
        <>
          <Loader2 className="w-4 h-4 animate-spin" /> Sending...
        </>
      ) : (
        <>
          Send Message <Send className="w-4 h-4" />
        </>
      )}
    </button>
  );
}

export default function ContactForm() {
  const [state, formAction] = useActionState(sendEmail, {
    success: false,
    error: null,
  });

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      className="max-w-xl mx-auto p-8 rounded-2xl border border-slate-800 bg-slate-900/50 backdrop-blur-md space-y-6"
    >
      <div className="space-y-2 text-center">
        <h3 className="text-2xl font-bold text-slate-100">Get In Touch</h3>
        <p className="text-sm text-slate-400">
          Have a project in mind or an open role? Drop me a message below.
        </p>
      </div>

      <form action={formAction} className="space-y-4">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <input
            type="text"
            name="name"
            required
            placeholder="Your Name"
            className="w-full px-4 py-3 rounded-xl bg-slate-950 border border-slate-800 text-slate-100 placeholder:text-slate-500 text-sm focus:outline-none focus:border-sky-500 transition-colors"
          />
          <input
            type="email"
            name="email"
            required
            placeholder="name@example.com"
            className="w-full px-4 py-3 rounded-xl bg-slate-950 border border-slate-800 text-slate-100 placeholder:text-slate-500 text-sm focus:outline-none focus:border-sky-500 transition-colors"
          />
        </div>

        <textarea
          name="message"
          required
          rows={5}
          placeholder="Write your message here..."
          className="w-full px-4 py-3 rounded-xl bg-slate-950 border border-slate-800 text-slate-100 placeholder:text-slate-500 text-sm focus:outline-none focus:border-sky-500 transition-colors resize-none"
        />

        <SubmitButton />

        {/* Status Messages */}
        {state.success && (
          <motion.div
            initial={{ opacity: 0, y: -5 }}
            animate={{ opacity: 1, y: 0 }}
            className="p-3 rounded-xl bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-xs font-semibold flex items-center gap-2 justify-center"
          >
            <CheckCircle2 className="w-4 h-4" /> Message sent successfully! I will get back to you soon.
          </motion.div>
        )}

        {state.error && (
          <motion.div
            initial={{ opacity: 0, y: -5 }}
            animate={{ opacity: 1, y: 0 }}
            className="p-3 rounded-xl bg-rose-500/10 border border-rose-500/20 text-rose-400 text-xs font-semibold flex items-center gap-2 justify-center"
          >
            <AlertCircle className="w-4 h-4" /> {state.error}
          </motion.div>
        )}
      </form>
    </motion.div>
  );
}
