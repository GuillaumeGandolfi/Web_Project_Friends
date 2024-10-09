

export interface loggedAdminLayoutProps {
  children: React.ReactNode | React.ReactNode[]
}

export default function loggedAdminLayout({ children }: loggedAdminLayoutProps) {
  return (
    <>
      {children}
    </>
  );
}