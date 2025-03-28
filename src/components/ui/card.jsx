import { cn } from "@/lib/utils";

export function Card({ className, children }) {
  return (
    <div className={cn("rounded-lg border bg-white p-4 shadow-sm", className)}>
      {children}
    </div>
  );
}

export function CardHeader({ className, children }) {
  return (
    <div className={cn("mb-4 flex items-center", className)}>{children}</div>
  );
}

export function CardTitle({ className, children }) {
  return <h2 className={cn("text-lg font-semibold", className)}>{children}</h2>;
}

export function CardContent({ className, children }) {
  return (
    <div className={cn("text-sm text-gray-600", className)}>{children}</div>
  );
}
