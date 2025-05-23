import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Users, LogIn } from "lucide-react";
import Link from "next/link";

export default function HomePage() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-background p-4">
      <Card className="w-full max-w-md shadow-xl">
        <CardHeader className="text-center">
          <div className="mx-auto mb-4 p-3 rounded-full bg-primary text-primary-foreground w-fit">
            <Users size={48} />
          </div>
          <CardTitle className="text-3xl font-bold">MUN Attendance Tracker</CardTitle>
          <CardDescription className="text-lg">
            Welcome to the Model United Nations Attendance Management System.
          </CardDescription>
        </CardHeader>
        <CardContent className="flex flex-col space-y-4">
          <Link href="/public/attendance" passHref legacyBehavior>
            <Button variant="outline" size="lg" className="w-full">
              <Users className="mr-2 h-5 w-5" />
              View Public Attendance
            </Button>
          </Link>
          <Link href="/admin/login" passHref legacyBehavior>
            <Button variant="default" size="lg" className="w-full">
              <LogIn className="mr-2 h-5 w-5" />
              Admin Login
            </Button>
          </Link>
        </CardContent>
      </Card>
      <footer className="mt-8 text-center text-sm text-muted-foreground">
        <p>&copy; {new Date().getFullYear()} MUN Organizers. All rights reserved.</p>
      </footer>
    </div>
  );
}
