
import AdminLoginForm from "@/components/auth/AdminLoginForm";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button"; // Added Button
import { ShieldCheck, ArrowLeft } from "lucide-react"; // Added ArrowLeft
import Link from "next/link"; // Added Link

export default function AdminLoginPage() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-background p-4">
      <Card className="w-full max-w-md shadow-xl">
        <CardHeader className="text-center">
          <div className="mx-auto mb-4 p-3 rounded-full bg-primary text-primary-foreground w-fit">
            <ShieldCheck size={48} />
          </div>
          <CardTitle className="text-3xl font-bold">Admin Access</CardTitle>
          <CardDescription className="text-lg">
            MUN Attendance Tracker
          </CardDescription>
        </CardHeader>
        <CardContent>
          <AdminLoginForm />
        </CardContent>
      </Card>
      <Link href="/" passHref legacyBehavior>
        <Button variant="ghost" className="mt-8 text-muted-foreground hover:text-foreground">
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back to Home
        </Button>
      </Link>
    </div>
  );
}
