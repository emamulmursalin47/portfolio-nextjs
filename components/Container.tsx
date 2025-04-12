import { cn } from "@/lib/utils";

const Container = ({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) => {
  return (
    <div className={cn(
      "w-full max-w-[194+20px] mx-auto",
      "px-4 sm:px-6 md:px-8 lg:px-10 xl:px-12", // Responsive padding
      className
    )}>
      {children}
    </div>
  );
};

export default Container;