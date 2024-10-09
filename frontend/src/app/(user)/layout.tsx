

export interface loggedUserLayoutProps {
  children: React.ReactNode | React.ReactNode[]
}

export default function loggedUserLayout({ children }: loggedUserLayoutProps) {
  return (
    <>
      {children}
    </>
  );
}