'use client';

import { useState, useEffect } from 'react';
import { toast } from 'sonner';
import {
    Activity,
    CheckCircle,
    XCircle,
    AlertTriangle,
    RefreshCw,
    Server,
    Database,
    Key,
    Globe,
    Shield,
    Clock
} from 'lucide-react';
import { LoadingScreen } from '@/components/ui/loading-screen';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { cn } from '@/lib/utils';

interface HealthCheckData {
    status: 'HEALTHY' | 'UNHEALTHY' | 'ERROR';
    timestamp: string;
    checks: {
        auth?: { status: string; userId?: string; error?: string };
        database?: { status: string; connection?: string; error?: string };
        portfolioQuery?: { status: string; count?: number; error?: string };
        schema?: { status: string; tables?: any[]; error?: string };
        executeWithRetry?: { status: string; duration?: number; working?: boolean; error?: string };
        environmentVariables?: {
            status: string;
            variables: Record<string, boolean>;
            missing: string[];
            databaseUrlFormat?: string;
            error?: string;
        };
        clerkDetailed?: {
            status: string;
            duration?: number;
            hasUserId?: boolean;
            userRole?: string;
            isAdmin?: boolean;
            error?: string;
        };
        [key: string]: any;
    };
}

export default function SystemHealthPage() {
    const [data, setData] = useState<HealthCheckData | null>(null);
    const [loading, setLoading] = useState(true);
    const [lastUpdated, setLastUpdated] = useState<Date | null>(null);

    const fetchHealth = async () => {
        try {
            setLoading(true);
            const response = await fetch('/api/admin/health');
            const healthData = await response.json();
            setData(healthData);
            setLastUpdated(new Date());

            if (response.ok && healthData.status === 'HEALTHY') {
                toast.success('Sistema operacional e saudável');
            } else {
                toast.error('Sistema apresenta problemas');
            }
        } catch (error) {
            console.error('Failed to fetch health data:', error);
            toast.error('Falha ao conectar com serviço de diagnóstico');
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchHealth();
    }, []);

    const StatusIcon = ({ status }: { status: string }) => {
        if (status === 'PASS' || status === 'HEALTHY') return <CheckCircle className="w-5 h-5 text-green-500" />;
        if (status === 'FAIL' || status === 'UNHEALTHY' || status === 'ERROR') return <XCircle className="w-5 h-5 text-red-500" />;
        return <AlertTriangle className="w-5 h-5 text-yellow-500" />;
    };

    const StatusBadge = ({ status }: { status: string }) => {
        const isGood = status === 'PASS' || status === 'HEALTHY';
        const isBad = status === 'FAIL' || status === 'UNHEALTHY' || status === 'ERROR';

        return (
            <Badge variant="outline" className={cn(
                "font-mono",
                isGood ? "bg-green-50 text-green-700 border-green-200" :
                    isBad ? "bg-red-50 text-red-700 border-red-200" :
                        "bg-yellow-50 text-yellow-700 border-yellow-200"
            )}>
                {status}
            </Badge>
        );
    };

    if (loading && !data) {
        return (
            <div className="flex h-[80vh] items-center justify-center">
                <LoadingScreen variant="inline" message="Verificando saúde do sistema..." />
            </div>
        );
    }

    return (
        <div className="space-y-6 animate-in fade-in duration-500">
            {/* Header */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div>
                    <h1 className="text-3xl font-bold tracking-tight flex items-center gap-2">
                        <Activity className="w-8 h-8 text-primary" />
                        Diagnóstico do Sistema
                    </h1>
                    <p className="text-muted-foreground mt-1">
                        Status em tempo real da infraestrutura e conexões
                    </p>
                </div>
                <div className="flex items-center gap-3">
                    {lastUpdated && (
                        <span className="text-sm text-muted-foreground flex items-center gap-1">
                            <Clock className="w-4 h-4" />
                            Atualizado: {lastUpdated.toLocaleTimeString()}
                        </span>
                    )}
                    <Button onClick={fetchHealth} disabled={loading}>
                        <RefreshCw className={cn("w-4 h-4 mr-2", loading && "animate-spin")} />
                        Atualizar
                    </Button>
                </div>
            </div>

            {/* Global Status */}
            <Card className={cn("border-l-4",
                data?.status === 'HEALTHY' ? "border-l-green-500" : "border-l-red-500"
            )}>
                <CardContent className="pt-6">
                    <div className="flex items-center justify-between">
                        <div className="flex items-center gap-4">
                            <div className={cn("p-3 rounded-full",
                                data?.status === 'HEALTHY' ? "bg-green-100" : "bg-red-100"
                            )}>
                                <Server className={cn("w-6 h-6",
                                    data?.status === 'HEALTHY' ? "text-green-600" : "text-red-600"
                                )} />
                            </div>
                            <div>
                                <h2 className="text-xl font-semibold">
                                    Status Global: {data?.status === 'HEALTHY' ? 'Operacional' : 'Instável'}
                                </h2>
                                <p className="text-sm text-muted-foreground">
                                    {data?.status === 'HEALTHY'
                                        ? 'Todos os sistemas vitais estão funcionando corretamente.'
                                        : 'Atenção necessária em um ou mais componentes.'}
                                </p>
                            </div>
                        </div>
                    </div>
                </CardContent>
            </Card>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

                {/* Environment Variables */}
                <Card>
                    <CardHeader>
                        <CardTitle className="flex items-center gap-2">
                            <Key className="w-5 h-5" />
                            Variáveis de Ambiente
                        </CardTitle>
                        <CardDescription>
                            Configuração de chaves e segredos críticos
                        </CardDescription>
                    </CardHeader>
                    <CardContent>
                        {data?.checks.environmentVariables ? (
                            <div className="space-y-4">
                                <div className="flex justify-between items-center mb-4">
                                    <span className="text-sm font-medium">Status Geral</span>
                                    <StatusBadge status={data.checks.environmentVariables.status} />
                                </div>

                                <div className="border rounded-md overflow-hidden">
                                    <table className="w-full text-sm">
                                        <thead className="bg-muted/50">
                                            <tr>
                                                <th className="px-4 py-2 text-left font-medium">Variável</th>
                                                <th className="px-4 py-2 text-right font-medium">Status</th>
                                            </tr>
                                        </thead>
                                        <tbody className="divide-y">
                                            {Object.entries(data.checks.environmentVariables.variables).map(([key, exists]) => (
                                                <tr key={key} className="bg-card">
                                                    <td className="px-4 py-3 font-mono text-xs text-muted-foreground">{key}</td>
                                                    <td className="px-4 py-3 text-right">
                                                        {exists ? (
                                                            <span className="inline-flex items-center text-green-600 text-xs font-medium">
                                                                <CheckCircle className="w-3 h-3 mr-1" /> Configurada
                                                            </span>
                                                        ) : (
                                                            <span className="inline-flex items-center text-red-600 text-xs font-medium">
                                                                <XCircle className="w-3 h-3 mr-1" /> Ausente
                                                            </span>
                                                        )}
                                                    </td>
                                                </tr>
                                            ))}
                                        </tbody>
                                    </table>
                                </div>

                                {data.checks.environmentVariables.databaseUrlFormat && (
                                    <div className="text-xs text-muted-foreground mt-2">
                                        Formato DATABASE_URL: <span className="font-mono">{data.checks.environmentVariables.databaseUrlFormat}</span>
                                    </div>
                                )}
                            </div>
                        ) : (
                            <div className="text-red-500 text-sm">Dados não disponíveis</div>
                        )}
                    </CardContent>
                </Card>

                {/* Database Status */}
                <Card>
                    <CardHeader>
                        <CardTitle className="flex items-center gap-2">
                            <Database className="w-5 h-5" />
                            Banco de Dados
                        </CardTitle>
                        <CardDescription>
                            Conectividade com PostgreSQL (Supabase)
                        </CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-4">
                        <div className="grid grid-cols-2 gap-4">
                            <div className="p-4 bg-muted/30 rounded-lg border">
                                <div className="text-xs text-muted-foreground mb-1">Conexão</div>
                                <div className="flex items-center gap-2 font-medium">
                                    <StatusIcon status={data?.checks.database?.status || 'FAIL'} />
                                    {data?.checks.database?.status === 'PASS' ? 'Conectado' : 'Falha'}
                                </div>
                            </div>

                            <div className="p-4 bg-muted/30 rounded-lg border">
                                <div className="text-xs text-muted-foreground mb-1">Latência</div>
                                <div className="font-mono font-medium">
                                    {data?.checks.executeWithRetry?.duration ? `${data.checks.executeWithRetry.duration}ms` : 'N/A'}
                                </div>
                            </div>
                        </div>

                        {data?.checks.database?.error && (
                            <div className="bg-red-50 border border-red-200 rounded-md p-3 text-xs text-red-800 break-words font-mono">
                                <strong>Erro:</strong> {data.checks.database.error}
                            </div>
                        )}

                        <div className="border-t pt-4 mt-2">
                            <div className="flex justify-between items-center text-sm">
                                <span className="text-muted-foreground">Portfolio Query Test</span>
                                <StatusBadge status={data?.checks.portfolioQuery?.status || 'UNKNOWN'} />
                            </div>
                            {data?.checks.portfolioQuery?.count !== undefined && (
                                <div className="text-xs text-muted-foreground mt-1">
                                    Items count: {data.checks.portfolioQuery.count}
                                </div>
                            )}
                        </div>
                    </CardContent>
                </Card>

                {/* Auth & Integrations */}
                <Card>
                    <CardHeader>
                        <CardTitle className="flex items-center gap-2">
                            <Shield className="w-5 h-5" />
                            Autenticação e Serviços
                        </CardTitle>
                        <CardDescription>
                            Clerk Auth e Integrações Externas
                        </CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-4">
                        <div className="flex items-center justify-between p-3 bg-muted/30 rounded-lg">
                            <div className="flex items-center gap-3">
                                <Globe className="w-4 h-4 text-muted-foreground" />
                                <span className="text-sm font-medium">Clerk Auth API</span>
                            </div>
                            <StatusBadge status={data?.checks.auth?.status || 'UNKNOWN'} />
                        </div>

                        {data?.checks.clerkDetailed && (
                            <div className="p-3 bg-muted/30 rounded-lg space-y-2">
                                <div className="flex justify-between items-center text-sm">
                                    <span className="text-muted-foreground">User ID Check</span>
                                    <span className={data.checks.clerkDetailed.hasUserId ? "text-green-600" : "text-yellow-600"}>
                                        {data.checks.clerkDetailed.hasUserId ? "Detectado" : "Não detectado"}
                                    </span>
                                </div>
                                <div className="flex justify-between items-center text-sm">
                                    <span className="text-muted-foreground">Admin Role</span>
                                    <span className={data.checks.clerkDetailed.isAdmin ? "text-green-600" : "text-red-600"}>
                                        {data.checks.clerkDetailed.isAdmin ? "Sim" : "Não"}
                                    </span>
                                </div>
                                <div className="text-xs text-muted-foreground text-right pt-1">
                                    Latência: {data.checks.clerkDetailed.duration}ms
                                </div>
                            </div>
                        )}
                    </CardContent>
                </Card>

                {/* Detailed Logs */}
                <Card>
                    <CardHeader>
                        <CardTitle className="text-base">Logs de Diagnóstico</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="bg-black/90 text-green-400 p-4 rounded-md font-mono text-xs h-[200px] overflow-y-auto">
                            <div>{'>'} System diagnostics initiated at {data?.timestamp}</div>
                            <div>{'>'} Checking environment variables... {data?.checks.environmentVariables?.status}</div>
                            <div>{'>'} Testing database connection... {data?.checks.database?.status}</div>
                            {data?.checks.database?.error && (
                                <div className="text-red-400 pl-4">Error: {data.checks.database.error}</div>
                            )}
                            <div>{'>'} Verifying schema consistency... {data?.checks.schema?.status}</div>
                            <div>{'>'} Auth service status... {data?.checks.auth?.status}</div>
                            {data?.status === 'HEALTHY' ? (
                                <div className="text-green-300 mt-2">{'>'} SYSTEM STATUS: OPERATIONAL</div>
                            ) : (
                                <div className="text-red-300 mt-2">{'>'} SYSTEM STATUS: ATTENTION REQUIRED</div>
                            )}
                        </div>
                    </CardContent>
                </Card>

            </div>
        </div>
    );
}
