import { motion } from "framer-motion";
import {
  Target,
  Eye,
  Sparkles,
  Users,
  Rocket,
  ShieldCheck,
} from "lucide-react";
import { Link } from "react-router";

const About = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-[#0b0b1f] via-[#12122a] to-[#0b0b1f] text-white relative overflow-hidden">
      {/* Background Glow */}
      <div className="absolute w-[600px] h-[600px] bg-purple-600/20 rounded-full blur-3xl -top-60 -left-60"></div>
      <div className="absolute w-[500px] h-[500px] bg-indigo-600/20 rounded-full blur-3xl -bottom-60 -right-60"></div>

      {/* HERO */}
      <section className="relative z-10 max-w-6xl mx-auto px-6 pt-36 pb-24 text-center">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <h1 className="text-5xl md:text-6xl font-bold tracking-tight mb-6">
            Empowering Learning for the Future
          </h1>
          <p className="text-gray-400 max-w-3xl mx-auto text-lg">
            We build high-quality, accessible, and beautifully designed learning
            experiences to help individuals grow their skills and accelerate
            their careers.
          </p>
        </motion.div>
      </section>

      {/* MISSION / VISION */}
      <section className="relative z-10 max-w-6xl mx-auto px-6 pb-24 grid md:grid-cols-2 gap-10">
        {[
          {
            icon: <Target size={26} />,
            title: "Our Mission",
            desc: "To make premium education accessible to everyone through innovative design and world-class content.",
          },
          {
            icon: <Eye size={26} />,
            title: "Our Vision",
            desc: "To become a global platform that transforms the way people learn, grow, and achieve their goals.",
          },
        ].map((item, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.2 }}
            viewport={{ once: true }}
            className="bg-white/5 backdrop-blur-xl border border-white/10 p-10 rounded-3xl hover:shadow-2xl hover:shadow-purple-600/30 transition"
          >
            <div className="w-14 h-14 flex items-center justify-center rounded-xl bg-gradient-to-r from-purple-600 to-indigo-600 mb-6">
              {item.icon}
            </div>
            <h3 className="text-2xl font-semibold mb-4">{item.title}</h3>
            <p className="text-gray-400">{item.desc}</p>
          </motion.div>
        ))}
      </section>

      {/* STATS */}
      <section className="relative z-10 max-w-6xl mx-auto px-6 pb-24">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-10 text-center">
          {[
            { number: "10K+", label: "Active Students" },
            { number: "250+", label: "Premium Courses" },
            { number: "50+", label: "Expert Instructors" },
            { number: "4.9", label: "Average Rating" },
          ].map((stat, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ delay: index * 0.1 }}
              viewport={{ once: true }}
              className="space-y-2"
            >
              <h2 className="text-4xl font-bold bg-gradient-to-r from-purple-400 to-indigo-400 bg-clip-text text-transparent">
                {stat.number}
              </h2>
              <p className="text-gray-400">{stat.label}</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* WHY CHOOSE US */}
      <section className="relative z-10 max-w-6xl mx-auto px-6 pb-28">
        <h2 className="text-4xl font-bold text-center mb-16">Why Choose Us</h2>

        <div className="grid md:grid-cols-3 gap-10">
          {[
            {
              icon: <Sparkles size={22} />,
              title: "Premium Design",
              desc: "Beautifully structured courses with engaging learning experience.",
            },
            {
              icon: <Rocket size={22} />,
              title: "Career Focused",
              desc: "Practical skills designed to help you grow professionally.",
            },
            {
              icon: <ShieldCheck size={22} />,
              title: "Trusted Platform",
              desc: "Secure, reliable and loved by thousands of learners worldwide.",
            },
          ].map((item, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.15 }}
              viewport={{ once: true }}
              whileHover={{ y: -8 }}
              className="bg-white/5 border border-white/10 p-8 rounded-3xl backdrop-blur-xl transition hover:shadow-xl hover:shadow-purple-600/20"
            >
              <div className="w-12 h-12 flex items-center justify-center rounded-lg bg-gradient-to-r from-purple-600 to-indigo-600 mb-5">
                {item.icon}
              </div>
              <h3 className="text-xl font-semibold mb-3">{item.title}</h3>
              <p className="text-gray-400 text-sm">{item.desc}</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className="relative z-10 max-w-4xl mx-auto px-6 pb-32 text-center">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="bg-gradient-to-r from-purple-600 to-indigo-600 rounded-3xl p-14 shadow-2xl"
        >
          <h2 className="text-3xl font-bold mb-6">
            Start Your Learning Journey Today
          </h2>
          <p className="mb-8 text-purple-100">
            Join thousands of learners building their future with us.
          </p>
          <Link to="/courses" className="inline-block">
            <button className="px-8 py-3 bg-white text-black font-semibold rounded-full hover:scale-105 transition cursor-pointer">
              Explore Courses
            </button>
          </Link>
        </motion.div>
      </section>
    </div>
  );
};

export default About;
