export default function ConsumerLayout({children}: Readonly<{
    children: React.ReactNode;
  }>) {
      return (
       <div>
        Consumer Layout
        {children}
       </div>
      );
    }