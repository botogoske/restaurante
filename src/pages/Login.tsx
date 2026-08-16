import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";

const loginSchema = z.object({
  email: z.string().email("Email inválido"),
  senha: z.string().min(6, "A senha deve ter pelo menos 6 caracteres"),
});

type LoginFormData = z.infer<typeof loginSchema>;

interface LoginProps {
  onLogin: () => void;
}

export default function Login({ onLogin }: LoginProps) {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormData>({
    resolver: zodResolver(loginSchema),
    defaultValues: { email: "", senha: "" },
  });

  const onSubmit = async (data: LoginFormData) => {
    setLoading(true);
    try {
      if (data.email === "admin@restaurante.com" && data.senha === "123456") {
        onLogin();
        navigate("/");
      } else {
        alert("Email ou senha incorretos");
      }
    } catch {
      alert("Falha ao fazer login");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-background flex items-center justify-center px-6">
      <div className="w-full max-w-md">
        <div className="text-center mb-10">
          <div className="w-[88px] h-[88px] rounded-3xl bg-primary flex items-center justify-center mx-auto mb-5 shadow-xl shadow-primary/25">
            <svg
              className="w-10 h-10 text-white"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={1.8}
                d="M3 3h18v18H3zM8 12h8M12 8v8"
              />
            </svg>
          </div>
          <h1 className="text-3xl font-bold text-foreground tracking-tight">
            RestauranteApp
          </h1>
          <p className="text-base text-muted-foreground mt-2 tracking-tight">
            Sistema de Gestão
          </p>
        </div>

        <Card variant="elevated">
          <CardHeader>
            <CardTitle>Bem-vindo de volta</CardTitle>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
              <Controller
                control={control}
                name="email"
                render={({ field }) => (
                  <Input
                    label="Email"
                    placeholder="seu@email.com"
                    type="email"
                    autoComplete="email"
                    error={errors.email?.message}
                    {...field}
                  />
                )}
              />
              <Controller
                control={control}
                name="senha"
                render={({ field }) => (
                  <Input
                    label="Senha"
                    placeholder="••••••"
                    type="password"
                    autoComplete="current-password"
                    error={errors.senha?.message}
                    {...field}
                  />
                )}
              />
              <Button type="submit" loading={loading} fullWidth>
                Entrar
              </Button>
              <div className="text-center">
                <button
                  type="button"
                  onClick={() => navigate("/funcionarios/novo")}
                  className="text-[13px] font-semibold text-primary hover:underline cursor-pointer bg-transparent border-none"
                >
                  Criar conta de funcionário
                </button>
              </div>
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
