'use client';

import { useEffect, useMemo, useState } from 'react';
import { Users, ShieldCheck, UserPlus, Search, RefreshCw, Phone, Mail, Award, AlertTriangle } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';

interface AdminUserClientInfo {
  id: string;
  name: string;
  phone: string | null;
  whatsapp: string | null;
  loyaltyLevel: 'CLIENT' | 'SPECIAL' | 'VIP';
  loyaltyPoints: number;
  createdAt: string;
  ordersCount: number;
  quotesCount: number;
}

interface AdminUser {
  id: string;
  email: string;
  role: 'ADMIN' | 'CLIENT';
  createdAt: string;
  updatedAt: string;
  client: AdminUserClientInfo | null;
}

interface UsersApiResponse {
  users: AdminUser[];
  stats: {
    total: number;
    admins: number;
    clients: number;
    withClientProfile: number;
  };
}

type RoleFilter = 'all' | 'ADMIN' | 'CLIENT';

const roleLabels: Record<AdminUser['role'], string> = {
  ADMIN: 'Administrador',
  CLIENT: 'Cliente',
};

const loyaltyLabels: Record<AdminUserClientInfo['loyaltyLevel'], string> = {
  CLIENT: 'Cliente',
  SPECIAL: 'Especial',
  VIP: 'VIP',
};

function formatDate(value: string) {
  return new Date(value).toLocaleDateString('pt-BR', {
    day: '2-digit',
    month: 'short',
    year: 'numeric',
  });
}

export default function AdminUsersPage() {
  const [users, setUsers] = useState<AdminUser[]>([]);
  const [stats, setStats] = useState<UsersApiResponse['stats'] | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [roleFilter, setRoleFilter] = useState<RoleFilter>('all');

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    try {
      setLoading(true);
      setError(null);

      const response = await fetch('/api/admin/users');
      if (!response.ok) {
        throw new Error('Não foi possível carregar os usuários.');
      }

      const data: UsersApiResponse = await response.json();
      setUsers(data.users);
      setStats(data.stats);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Erro inesperado ao carregar os usuários.');
    } finally {
      setLoading(false);
    }
  };

  const filteredUsers = useMemo(() => {
    const term = searchTerm.trim().toLowerCase();

    return users.filter((user) => {
      const matchesRole = roleFilter === 'all' || user.role === roleFilter;
      const matchesTerm =
        term.length === 0 ||
        user.email.toLowerCase().includes(term) ||
        (user.client?.name?.toLowerCase().includes(term) ?? false) ||
        (user.client?.phone?.toLowerCase().includes(term) ?? false) ||
        (user.client?.whatsapp?.toLowerCase().includes(term) ?? false);

      return matchesRole && matchesTerm;
    });
  }, [users, roleFilter, searchTerm]);

  const summaryCards = useMemo(() => {
    const totalUsers = stats?.total ?? users.length;
    const adminCount = stats?.admins ?? users.filter((user) => user.role === 'ADMIN').length;
    const clientCount = stats?.clients ?? users.filter((user) => user.role === 'CLIENT').length;
    const withClientProfile = stats?.withClientProfile ?? users.filter((user) => user.client).length;

    return [
      {
        title: 'Usuários cadastrados',
        value: totalUsers,
        icon: Users,
        highlight: 'Total sincronizado com o Clerk / banco local',
      },
      {
        title: 'Administradores',
        value: adminCount,
        icon: ShieldCheck,
        highlight: 'Acesso total à área administrativa',
      },
      {
        title: 'Clientes ativos',
        value: clientCount,
        icon: UserPlus,
        highlight: 'Usuários com perfil de cliente padrão',
      },
      {
        title: 'Com perfil de cliente',
        value: withClientProfile,
        icon: Award,
        highlight: 'Registros com informações de fidelidade e contatos',
      },
    ];
  }, [stats, users]);

  return (
    <div className="space-y-8">
      <section>
        <div className="flex flex-col gap-2">
          <h1 className="text-3xl font-semibold text-esmeralda">Usuários</h1>
          <p className="text-sm text-esmeralda/70">
            Visualize todos os usuários sincronizados com o Clerk, monitore permissões e acompanhe os perfis de clientes ligados à base local.
          </p>
        </div>
      </section>

      <section>
        <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
          {summaryCards.map((card) => (
            <Card key={card.title} className="border-esmeralda/10 bg-white/90">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium text-esmeralda/80">{card.title}</CardTitle>
                <card.icon className="h-5 w-5 text-esmeralda" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-semibold text-esmeralda">{card.value}</div>
                <p className="text-xs text-esmeralda/80">{card.highlight}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      <section className="space-y-4">
        <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
          <div className="flex flex-1 items-center gap-3">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-esmeralda/50" />
              <Input
                placeholder="Buscar por nome, e-mail ou contato"
                value={searchTerm}
                onChange={(event) => setSearchTerm(event.target.value)}
                className="pl-9"
              />
            </div>
            <Select value={roleFilter} onValueChange={(value) => setRoleFilter(value as RoleFilter)}>
              <SelectTrigger className="w-[160px]">
                <SelectValue placeholder="Filtrar por papel" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Todos</SelectItem>
                <SelectItem value="ADMIN">Administradores</SelectItem>
                <SelectItem value="CLIENT">Clientes</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <Button type="button" variant="outline" className="border-esmeralda/30 text-esmeralda hover:border-esmeralda" onClick={fetchUsers}>
            <RefreshCw className="mr-2 h-4 w-4" /> Atualizar lista
          </Button>
        </div>

        <Card className="border-esmeralda/10">
          <CardContent className="p-0">
            {loading ? (
              <div className="flex h-64 items-center justify-center text-esmeralda/70">
                Carregando usuários...
              </div>
            ) : error ? (
              <div className="flex h-64 flex-col items-center justify-center gap-3 text-center text-esmeralda/70">
                <AlertTriangle className="h-6 w-6 text-red-500" />
                <p className="text-sm text-red-500">{error}</p>
                <Button variant="outline" onClick={fetchUsers} className="border-red-200 text-red-600 hover:border-red-300">
                  Tentar novamente
                </Button>
              </div>
            ) : filteredUsers.length === 0 ? (
              <div className="flex h-64 flex-col items-center justify-center gap-3 text-center text-esmeralda/70">
                <Users className="h-6 w-6" />
                <p className="text-sm">Nenhum usuário encontrado com os filtros atuais.</p>
              </div>
            ) : (
              <Table>
                <TableHeader>
                  <TableRow className="hover:bg-esmeralda/5">
                    <TableHead>Usuário</TableHead>
                    <TableHead>Papel &amp; Acesso</TableHead>
                    <TableHead>Perfil do Cliente</TableHead>
                    <TableHead>Contato</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredUsers.map((user) => {
                    const clientName = user.client?.name || user.email.split('@')[0];
                    const createdAt = formatDate(user.createdAt);
                    const clientSince = user.client ? formatDate(user.client.createdAt) : null;

                    return (
                      <TableRow key={user.id} className="hover:bg-esmeralda/5">
                        <TableCell className="space-y-1">
                          <div className="font-medium text-esmeralda">{clientName}</div>
                          <div className="flex items-center text-xs text-esmeralda/70">
                            <Mail className="mr-1 h-3 w-3" />
                            {user.email}
                          </div>
                          <div className="text-xs text-esmeralda/80">Criado em {createdAt}</div>
                        </TableCell>

                        <TableCell className="space-y-2">
                          <div className="flex items-center gap-2">
                            <Badge className="bg-esmeralda/10 text-esmeralda border-esmeralda/20">
                              {roleLabels[user.role]}
                            </Badge>
                            {user.role === 'ADMIN' && (
                              <Badge variant="outline" className="border-ouro/40 text-ouro">
                                Acesso total
                              </Badge>
                            )}
                          </div>
                          <p className="text-xs text-esmeralda/70">
                            Última atualização em {formatDate(user.updatedAt)}
                          </p>
                        </TableCell>

                        <TableCell>
                          {user.client ? (
                            <div className="space-y-2 text-sm text-esmeralda">
                              <div className="flex items-center gap-2 text-xs">
                                <Badge variant="outline" className="border-esmeralda/40 text-esmeralda">
                                  {loyaltyLabels[user.client.loyaltyLevel]}
                                </Badge>
                                <span className="text-esmeralda/70">{user.client.loyaltyPoints} pontos</span>
                              </div>
                              <div className="text-xs text-esmeralda/70">
                                Cliente desde {clientSince}
                              </div>
                              <div className="flex gap-4 text-xs text-esmeralda/70">
                                <span>{user.client.ordersCount} pedidos</span>
                                <span>{user.client.quotesCount} orçamentos</span>
                              </div>
                            </div>
                          ) : (
                            <div className="text-xs text-esmeralda/80">
                              Sem perfil de cliente vinculado
                            </div>
                          )}
                        </TableCell>

                        <TableCell className="space-y-1 text-xs text-esmeralda/70">
                          {user.client?.phone && (
                            <div className="flex items-center gap-2">
                              <Phone className="h-3 w-3" />
                              <span>{user.client.phone}</span>
                            </div>
                          )}
                          {user.client?.whatsapp && (
                            <div className="flex items-center gap-2">
                              <Phone className="h-3 w-3" />
                              <span>WhatsApp: {user.client.whatsapp}</span>
                            </div>
                          )}
                          {!user.client?.phone && !user.client?.whatsapp && (
                            <span>Contato não informado</span>
                          )}
                        </TableCell>
                      </TableRow>
                    );
                  })}
                </TableBody>
              </Table>
            )}
          </CardContent>
        </Card>
      </section>
    </div>
  );
}
