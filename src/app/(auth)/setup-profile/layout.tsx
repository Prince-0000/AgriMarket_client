export default function layout({children}: Readonly<{
    children: React.ReactNode;
  }>) {
      return (
       <div>
        Setup Layout
        {children}
       </div>
      );
    }