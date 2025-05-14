import { Spinner } from "@/components/Spinner";

export default function LoadingPlanner() {
  return (
    <div className="grid place-items-center p-6">
      <div className="grid h-full min-h-0 place-items-center p-6">
        <div className="grid justify-items-center gap-3">
          <Spinner />
        </div>
      </div>
    </div>
  );
}
