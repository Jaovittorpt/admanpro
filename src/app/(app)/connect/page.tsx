import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Facebook } from "lucide-react";
import Link from "next/link";

export default function ConnectPage() {
  return (
    <div className="flex flex-col gap-6">
      <div>
        <h2 className="font-headline text-3xl font-semibold tracking-tight">
          Connect to Facebook
        </h2>
        <p className="text-sm text-muted-foreground">
          Connect your Facebook Business account to get started.
        </p>
      </div>

      <Card className="mx-auto w-full max-w-md">
        <CardHeader className="text-center">
          <div className="flex justify-center">
            <Facebook className="h-12 w-12 text-primary" />
          </div>
          <CardTitle className="font-headline pt-4">Connect your Account</CardTitle>
          <CardDescription>
            You need to connect your Facebook Business account to allow AdMan Pro to access your ad accounts and data.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Button className="w-full" asChild>
            <Link href="/api/auth/facebook">
                Connect to Facebook
            </Link>
          </Button>
        </CardContent>
      </Card>
    </div>
  );
}
