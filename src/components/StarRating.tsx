import { Star } from "lucide-react";

interface StarRatingProps {
  count?: number;
  className?: string;
}

export function StarRating({ count = 5, className = "" }: StarRatingProps) {
  return (
    <div className={`flex items-center gap-1 ${className}`}>
      {Array.from({ length: count }).map((_, i) => (
        <Star
          key={i}
          className="h-4 w-4 fill-yellow-400 text-yellow-400"
        />
      ))}
    </div>
  );
}
