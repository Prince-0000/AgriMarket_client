
// import FarmerPage from "./page";
export default function FarmerLayout({children}: Readonly<{
  children: React.ReactNode;
}>) {
    return (
      <div className="flex min-h-screen">


        {children}

    </div>
    );
  }