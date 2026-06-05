
export default function Footer() {
  return (
    <footer className=" border-t border-border py-8">
      <div className="container mx-auto px-4">
        <div className="flex flex-col items-center gap-4 text-center">
          <div className="flex items-center gap-2 text-foreground">
            <span className="text-xl font-mr-de-haviland" style={{ fontFamily: "Ephesis, cursive", fontWeight: 400 }}>Amali & Ashen</span>
          </div>
          <p className="font-paragraph text-sm text-muted-foreground">
            December 13, 2025
          </p>
          <p className="font-paragraph text-xs text-muted-foreground">
            © 2026 wedding-invitation-68o0.onrender.com
          </p>
        </div>
      </div>
    </footer>
  );
}
