"use client";

export const Ninja = ({
  onHit,
}: {
  onHit: () => Promise<{ secret: string } | { error: string }>;
}) => {
  return (
    <button
      onClick={async () => {
        const data = await onHit();
        if ("secret" in data) {
          alert(data.secret);
        } else if ("error" in data) {
          alert(data.error);
        }
      }}
      type="button"
      className="ninja"
    >
      🥷 Hit a protected endpoint
    </button>
  );
};
