import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { GoogleLogin } from "@react-oauth/google"
import { useState } from "react"
import { googleLogin, login, saveToken } from "@/services/loginService"
import {AuthRequest} from "@/types/auth"
import { useNavigate } from 'react-router-dom';
import { Link } from "react-router-dom"


export function LoginForm({
  className,
  ...props
}: React.ComponentProps<"div">) {

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const GoogleLoginImpl = async(token: string | undefined) => {
    if (!token) {
      console.error("Geen token ontvangen van Google");
      return;
    }

    try {
      const response = await googleLogin(token); 
      console.log("Backend response:", response);
      saveToken(response.token);

      navigate('/');
      window.location.reload();
    } catch (err) {
      console.error("Fout bij backend login", err);
    }
  };

  const Login = async () =>{
    try{
    const request: AuthRequest = {
      email: email,
      password: password
    }
      const response = await login(request)
      saveToken(response.token);
      navigate('/');
      window.location.reload();
    }
    catch (err: any) {
      console.error("Login failed: " + (err.response?.data?.message || err.message));
    }
  };

  return (
    <div className={cn("flex flex-col gap-6", className)} {...props}>
      <Card>
        <CardHeader className="text-center">
          <CardTitle className="text-xl">Welcome back</CardTitle>
          <CardDescription>
            Login with Google
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form>
            <div className="grid gap-6">
              <div className="flex flex-col gap-4">   
              <GoogleLogin theme="outline" size="large" text="signin_with"
                onSuccess={async (credentialResponse) => {
                    console.log("Login Success:", credentialResponse);
                    const token = credentialResponse.credential;
                    GoogleLoginImpl(token)
                  }
                }
                onError={() => {
                  console.error("Login Failed");
                  }
                }
                useOneTap={false} // optioneel: zet op true voor automatische popup
                /> 
              </div>
              <div className="flex items-center justify-center gap-2 text-sm text-muted-foreground my-4">
                <div className="flex-grow border-t border-border" />
                <span className="px-1 bg-background">Or continue with</span>
                <div className="flex-grow border-t border-border" />
              </div>
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
                    <Label htmlFor="password">Password</Label>
                    <Link
                      to={"/changePassword"}
                      className="ml-auto text-sm underline-offset-4 hover:underline"
                    >
                      Change password
                    </Link>
                  </div>
                  <Input id="password" type="password" value={password} onChange={(e) => setPassword(e.target.value)}/>
                </div>
                <Button type="submit" className="w-full" onClick={(e) => { e.preventDefault(); Login()}}>
                  Login
                </Button>
              </div>
              <div className="text-center text-sm">
                Don&apos;t have an account?{" "}
                <Link to={"/register"} className="underline underline-offset-4">
                  register
                </Link>
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
  )
}
{/* <GoogleLogin theme="outline" size="large" text="signin_with"
                onSuccess={async (credentialResponse) => {
                    console.log("Login Success:", credentialResponse);
                    const token = credentialResponse.credential;
                    GoogleLoginImpl(token)
                  }
                }
                onError={() => {
                  console.error("Login Failed");
                  }
                }
                useOneTap={false} // optioneel: zet op true voor automatische popup
                />    */}