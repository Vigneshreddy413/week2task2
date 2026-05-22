import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion';
import { ArrowUpRight } from 'lucide-react';
import { useEffect } from 'react';

function AnimatedNumber({ value }) {
  const motionValue = useMotionValue(0);
  const spring = useSpring(motionValue, { duration: 1400, bounce: 0 });
  const rounded = useTransform(spring, (latest) => Math.round(latest).toLocaleString());

  useEffect(() => {
    motionValue.set(value);
  }, [motionValue, value]);

  return <motion.span>{rounded}</motion.span>;
}

export default function StatCard({ label, value, trend, icon: Icon, gradient }) {
  return (
    <motion.div
      whileHover={{ y: -6, scale: 1.01 }}
      className={`relative overflow-hidden rounded-2xl p-5 text-white shadow-xl ${gradient}`}
    >
      <div className="absolute -right-8 -top-8 h-28 w-28 rounded-full bg-white/15" />
      <div className="relative flex items-start justify-between">
        <div>
          <p className="text-sm font-medium text-white/78">{label}</p>
          <h3 className="mt-3 text-3xl font-extrabold tracking-normal">
            <AnimatedNumber value={value} />
          </h3>
        </div>
        <div className="rounded-2xl bg-white/18 p-3 backdrop-blur">
          <Icon size={24} />
        </div>
      </div>
      <div className="relative mt-5 flex items-center gap-2 text-sm font-semibold text-white/88">
        <ArrowUpRight size={16} />
        {trend} vs last month
      </div>
    </motion.div>
  );
}
