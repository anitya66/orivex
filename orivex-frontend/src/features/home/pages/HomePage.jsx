import Button from "@/components/ui/Button/Button";
import Card from "@/components/ui/Card/Card";
import CardHeader from "@/components/ui/Card/CardHeader";
import CardContent from "@/components/ui/Card/CardContent";
import Input from "@/components/ui/Input/Input";

function HomePage() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-slate-950 p-6">
      <Card className="w-full max-w-md">

        <CardHeader>
          <h1 className="text-3xl font-bold text-white">
            Welcome to ORIVEX
          </h1>

          <p className="mt-2 text-slate-400">
            Premium Freelance Marketplace
          </p>
        </CardHeader>

        <CardContent>

          <div className="space-y-4">

            <Input placeholder="Email" />

            <Input
              type="password"
              placeholder="Password"
            />

            <Button className="w-full">
              Login
            </Button>

          </div>

        </CardContent>

      </Card>
    </div>
  );
}

export default HomePage;