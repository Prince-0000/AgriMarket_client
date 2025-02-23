// import FarmerPage from "./page";
export default function FarmerLayout({children}: Readonly<{
  children: React.ReactNode;
}>) {
    return (
     <div>
      Farmer Layout
      {children}
     </div>
    );
  }