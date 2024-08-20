import { Button } from "@/components/ui/button";

export default function Card({ title, description, price, photoUrl }) {
  return (
    <div className="bg-background rounded-lg shadow-md overflow-hidden w-full max-w-sm">
      <div className="relative">
        <img
          src={photoUrl}
          alt="Product Image"
          width="400"
          height="300"
          className="w-full h-60 object-cover"
          style={{ aspectRatio: "400/300", objectFit: "cover" }}
        />
        <div className="absolute top-4 right-4">
          <Button variant="ghost" size="icon" className="rounded-full">
            <HeartIcon className="w-5 h-5 text-muted-foreground" />
          </Button>
        </div>
      </div>
      <div className="p-6 space-y-4">
        <div className="space-y-2">
          <h3 className="text-lg font-semibold">{title}</h3>
          <p className="text-muted-foreground">{description}</p>
        </div>
        <div className="flex items-center justify-between">
          <span className="text-2xl font-bold">{price}</span>
          <Button size="sm">Add to Cart</Button>
        </div>
      </div>
    </div>
  );
}

function HeartIcon(props) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z" />
    </svg>
  );
}
