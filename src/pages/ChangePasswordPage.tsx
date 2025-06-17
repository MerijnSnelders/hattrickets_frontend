import { useEffect, useState } from "react";
import { changePassword } from "@/services/loginService"
import Swal from "sweetalert2";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

export default function ChangePasswordPage() {
  const [email, setEmail] = useState("");
  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const handleSubmit = async () => {

    try {
      await changePassword({ email, oldPassword, newPassword });
      Swal.fire("Success", "Password changed!", "success");
      setOldPassword("");
      setNewPassword("");
    } catch {
      Swal.fire("Error", "Incorrect old password", "error");
    }
  };

  return (
    <div className={cn("flex flex-col gap-6 mt-3 items-center")}>
      <Card>
        <CardHeader className="text-center">
          <CardTitle className="text-xl">Change password</CardTitle>

        </CardHeader>
        <CardContent>
          <form>
            <div className="grid gap-6">
              <div className="grid gap-6">
                <div className="grid gap-3">
                  <Label htmlFor="email">Email</Label>
                  <Input
                    id="email"
                    type="email"
                    placeholder="m@example.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                </div>
                <div className="grid gap-3">
                  <div className="flex items-center">
                    <Label htmlFor="password">Old Password</Label>
                  </div>
                  <Input id="password" type="password" value={oldPassword} onChange={(e) => setOldPassword(e.target.value)}/>
                </div>
                <div className="grid gap-3">
                  <div className="flex items-center">
                    <Label htmlFor="password">New Password</Label>
                  </div>
                  <Input id="password" type="password" value={newPassword} onChange={(e) => setNewPassword(e.target.value)}/>
                </div>
                <Button type="submit" className="w-full" onClick={(e) => { e.preventDefault(); handleSubmit()}}>
                  Change password
                </Button>
              </div>
            </div>
          </form>
        </CardContent>
      </Card>
      <div className="text-muted-foreground *:[a]:hover:text-primary text-center text-xs text-balance *:[a]:underline *:[a]:underline-offset-4">
        By clicking continue, you agree to our <a href="#">Terms of Service</a>{" "}
        and <a href="#">Privacy Policy</a>.
      </div>
    </div>
  );
}
