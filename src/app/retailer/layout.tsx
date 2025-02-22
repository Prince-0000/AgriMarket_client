export default function RetailerLayout({children}: Readonly<{
    children: React.ReactNode;
  }>) {
      return (
       <div>
        Retailer Layout
        {children}
       </div>
      );
    }