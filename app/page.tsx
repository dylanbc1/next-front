import { LoginButton } from "@/components/auth/login-button";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { Poppins } from "next/font/google";

const font = Poppins({
  subsets: ["latin"],
  weight: ["600", "800"],
});

export default function Home() {
  return (
    <main className="relative flex h-full flex-col items-center justify-center">
      <video
        autoPlay
        loop
        muted
        className="absolute w-full h-full object-cover"
      >
        <source src="/video/5510387-hd_1920_1080_30fps.mp4" type="video/mp4" />
      </video>
      <div className="relative z-10 space-y-6 text-center">
        <h1
          className={cn(
            "text-8xl font-extrabold text-white drop-shadow-lg",
            font.className
          )}
        >
          Staynest
        </h1>
        <p className="text-white text-2xl font-light">
          Juan Jose Lopez, Dylan Bermudez, Sara Cardona
        </p>
        <div className="mt-6">
          <LoginButton mode="modal" asChild>
            <Button variant="secondary" size="lg"  className="px-8 py-4 text-xl font-bold bg-white text-blue-800 rounded-full shadow-lg hover:bg-gray-100"
          >
              Sign in
            </Button>
          </LoginButton>
        </div>
      </div>
    </main>
  );
}