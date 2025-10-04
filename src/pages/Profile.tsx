import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { useAuth } from "@/contexts/AuthContext";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";

export default function Profile() {
  const { user } = useAuth();

  const getInitials = (email: string) => {
    return email.substring(0, 2).toUpperCase();
  };

  return (
    <div className="container max-w-4xl py-8 space-y-6">
      <div>
        <h1 className="text-3xl font-bold gradient-text">Profile</h1>
        <p className="text-muted-foreground">Manage your account settings</p>
      </div>

      <Card className="glass-card">
        <CardHeader>
          <CardTitle>Account Information</CardTitle>
          <CardDescription>Your profile details and settings</CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="flex items-center gap-4">
            <Avatar className="h-20 w-20">
              <AvatarFallback className="bg-gradient-to-br from-primary to-accent text-white text-xl">
                {user?.email ? getInitials(user.email) : "??"}
              </AvatarFallback>
            </Avatar>
            <div>
              <p className="font-medium">{user?.email}</p>
              <p className="text-sm text-muted-foreground">
                Account created: {user?.created_at ? new Date(user.created_at).toLocaleDateString() : "Unknown"}
              </p>
            </div>
          </div>

          <div className="space-y-4">
            <div className="space-y-2">
              <Label>Email</Label>
              <Input value={user?.email || ""} disabled />
            </div>

            <div className="space-y-2">
              <Label>User ID</Label>
              <Input value={user?.id || ""} disabled className="font-mono text-xs" />
            </div>
          </div>
        </CardContent>
      </Card>

      <Card className="glass-card">
        <CardHeader>
          <CardTitle>API Configuration</CardTitle>
          <CardDescription>
            Connect your FastAPI backend for research capabilities
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label>Backend API URL</Label>
            <Input
              placeholder="http://localhost:8000"
              defaultValue={import.meta.env.VITE_API_BASE || ""}
              disabled
            />
            <p className="text-xs text-muted-foreground">
              Configure this in your environment variables (VITE_API_BASE)
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
