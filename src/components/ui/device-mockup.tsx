"use client";

interface DeviceMockupProps {
  type: "phone" | "laptop";
  children: React.ReactNode;
  className?: string;
}

export default function DeviceMockup({ type, children, className = "" }: DeviceMockupProps) {
  if (type === "phone") {
    return (
      <div className={`device-phone ${className}`}>
        <div className="relative h-full pt-10 pb-6 px-1.5">
          {children}
        </div>
      </div>
    );
  }

  return (
    <div className={className}>
      <div className="device-laptop">
        <div className="relative h-full p-3">
          {children}
        </div>
      </div>
      <div className="device-laptop-base" />
    </div>
  );
}
