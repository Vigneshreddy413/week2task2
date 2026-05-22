export default function SkeletonLoader({ fullScreen = false }) {
  return (
    <div className={`${fullScreen ? 'min-h-screen' : ''} grid gap-4 p-6`}>
      {[1, 2, 3, 4].map((item) => (
        <div
          key={item}
          className="h-24 rounded-2xl bg-[linear-gradient(110deg,#e5eefb_8%,#f8fbff_18%,#e5eefb_33%)] bg-[length:200%_100%] animate-shimmer dark:bg-[linear-gradient(110deg,#0f172a_8%,#1e293b_18%,#0f172a_33%)]"
        />
      ))}
    </div>
  );
}
