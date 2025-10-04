export function TypingIndicator() {
  return (
    <div className="flex items-center gap-1 px-4 py-2 rounded-lg bg-muted w-fit typing-dots">
      <span className="w-2 h-2 rounded-full bg-muted-foreground" />
      <span className="w-2 h-2 rounded-full bg-muted-foreground" />
      <span className="w-2 h-2 rounded-full bg-muted-foreground" />
    </div>
  );
}
