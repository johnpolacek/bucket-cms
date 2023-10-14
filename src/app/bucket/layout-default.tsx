import { BrandImage } from "./src/views/brand/BrandImage";
import { AdminFooter } from "./src/views/admin/AdminFooter";
import BucketProvider from "./src/views/providers/BucketProvider";

export default async function BucketLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const hasSession = false; // TODO: update this to use auth

  return (
    <div className="flex flex-col grow justify-start items-center relative w-full h-full bg-white">
      {hasSession || process.env.NODE_ENV === "development" ? (
        <BucketProvider>{children}</BucketProvider>
      ) : (
        <div className="w-screen h-screen flex flex-col justify-center items-center p-8 gap-2">
          <BrandImage />
          <p className="pb-8 italic opacity-70">
            Authentication required for access
          </p>
        </div>
      )}
      <AdminFooter
        showAuthenticationWarning={
          hasSession && process.env.NODE_ENV === "development"
        }
      />
    </div>
  );
}
