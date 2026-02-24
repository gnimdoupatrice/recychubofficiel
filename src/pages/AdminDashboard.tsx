import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import { supabase } from "@/integrations/supabase/client";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Table, TableBody, TableCell, TableHead, TableHeader, TableRow,
} from "@/components/ui/table";
import { Truck, Recycle, AlertTriangle, Loader2 } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

type PickupRequest = {
  id: string;
  repere: string;
  status: string;
  created_at: string;
  user_id: string;
};

type PlasticSale = {
  id: string;
  repere: string;
  kilos: number;
  status: string;
  photo_url: string | null;
  created_at: string;
  user_id: string;
};

type DumpAlert = {
  id: string;
  repere: string;
  status: string;
  photo_url: string | null;
  created_at: string;
  user_id: string | null;
};

const statusColors: Record<string, string> = {
  pending: "bg-yellow-100 text-yellow-800 border-yellow-300",
  reported: "bg-orange-100 text-orange-800 border-orange-300",
  offered: "bg-blue-100 text-blue-800 border-blue-300",
  confirmed: "bg-primary/10 text-primary border-primary/30",
  collected: "bg-primary/20 text-primary border-primary/40",
  resolved: "bg-primary/20 text-primary border-primary/40",
  cancelled: "bg-muted text-muted-foreground border-border",
};

const statusLabels: Record<string, string> = {
  pending: "En attente",
  reported: "Signalé",
  offered: "Proposé",
  confirmed: "Confirmé",
  collected: "Collecté",
  resolved: "Résolu",
  cancelled: "Annulé",
};

const AdminDashboard = () => {
  const { user, loading: authLoading } = useAuth();
  const navigate = useNavigate();
  const { toast } = useToast();

  const [isAdmin, setIsAdmin] = useState(false);
  const [checking, setChecking] = useState(true);

  const [pickups, setPickups] = useState<PickupRequest[]>([]);
  const [sales, setSales] = useState<PlasticSale[]>([]);
  const [alerts, setAlerts] = useState<DumpAlert[]>([]);
  const [loadingData, setLoadingData] = useState(true);

  // Check admin role
  useEffect(() => {
    if (authLoading) return;
    if (!user) {
      navigate("/connexion");
      return;
    }
    const checkRole = async () => {
      const { data } = await supabase.rpc("has_role", {
        _user_id: user.id,
        _role: "admin",
      });
      if (!data) {
        toast({ title: "Accès refusé", description: "Vous n'êtes pas administrateur.", variant: "destructive" });
        navigate("/");
        return;
      }
      setIsAdmin(true);
      setChecking(false);
    };
    checkRole();
  }, [user, authLoading, navigate, toast]);

  // Fetch data once admin confirmed
  useEffect(() => {
    if (!isAdmin) return;
    const fetchAll = async () => {
      setLoadingData(true);
      const [p, s, a] = await Promise.all([
        supabase.from("pickup_requests").select("*").order("created_at", { ascending: false }),
        supabase.from("plastic_sales").select("*").order("created_at", { ascending: false }),
        supabase.from("dumps_alerts").select("*").order("created_at", { ascending: false }),
      ]);
      setPickups(p.data ?? []);
      setSales(s.data ?? []);
      setAlerts(a.data ?? []);
      setLoadingData(false);
    };
    fetchAll();
  }, [isAdmin]);

  const updateStatus = async (table: "pickup_requests" | "plastic_sales" | "dumps_alerts", id: string, status: string) => {
    const { error } = await supabase.from(table).update({ status }).eq("id", id);
    if (error) {
      toast({ title: "Erreur", description: error.message, variant: "destructive" });
      return;
    }
    toast({ title: "Statut mis à jour" });
    // Refresh
    if (table === "pickup_requests") setPickups((prev) => prev.map((r) => (r.id === id ? { ...r, status } : r)));
    if (table === "plastic_sales") setSales((prev) => prev.map((r) => (r.id === id ? { ...r, status } : r)));
    if (table === "dumps_alerts") setAlerts((prev) => prev.map((r) => (r.id === id ? { ...r, status } : r)));
  };

  const formatDate = (d: string) =>
    new Date(d).toLocaleDateString("fr-FR", { day: "2-digit", month: "short", year: "numeric", hour: "2-digit", minute: "2-digit" });

  if (authLoading || checking) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </div>
    );
  }

  const pendingPickups = pickups.filter((r) => r.status === "pending").length;
  const pendingSales = sales.filter((r) => r.status === "offered").length;
  const pendingAlerts = alerts.filter((r) => r.status === "reported").length;

  return (
    <main className="min-h-screen bg-background pt-24 pb-16 px-4">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-3xl font-bold mb-8 font-['Space_Grotesk']">
          Tableau de bord <span className="text-gradient-emerald">Admin</span>
        </h1>

        {/* Summary cards */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-8">
          <Card className="border-l-4 border-l-primary">
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground flex items-center gap-2">
                <Truck className="h-4 w-4" /> Enlèvements
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-2xl font-bold">{pendingPickups}</p>
              <p className="text-xs text-muted-foreground">en attente</p>
            </CardContent>
          </Card>
          <Card className="border-l-4 border-l-secondary">
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground flex items-center gap-2">
                <Recycle className="h-4 w-4" /> Ventes plastiques
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-2xl font-bold">{pendingSales}</p>
              <p className="text-xs text-muted-foreground">proposées</p>
            </CardContent>
          </Card>
          <Card className="border-l-4 border-l-destructive">
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground flex items-center gap-2">
                <AlertTriangle className="h-4 w-4" /> Alertes dépotoirs
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-2xl font-bold">{pendingAlerts}</p>
              <p className="text-xs text-muted-foreground">signalées</p>
            </CardContent>
          </Card>
        </div>

        {loadingData ? (
          <div className="flex justify-center py-12">
            <Loader2 className="h-8 w-8 animate-spin text-primary" />
          </div>
        ) : (
          <Tabs defaultValue="pickups">
            <TabsList className="mb-4">
              <TabsTrigger value="pickups">Enlèvements ({pickups.length})</TabsTrigger>
              <TabsTrigger value="sales">Ventes ({sales.length})</TabsTrigger>
              <TabsTrigger value="alerts">Alertes ({alerts.length})</TabsTrigger>
            </TabsList>

            {/* Pickups */}
            <TabsContent value="pickups">
              <Card>
                <CardContent className="p-0">
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Date</TableHead>
                        <TableHead>Repère</TableHead>
                        <TableHead>Statut</TableHead>
                        <TableHead>Actions</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {pickups.length === 0 ? (
                        <TableRow><TableCell colSpan={4} className="text-center text-muted-foreground py-8">Aucune demande</TableCell></TableRow>
                      ) : pickups.map((r) => (
                        <TableRow key={r.id}>
                          <TableCell className="text-sm">{formatDate(r.created_at)}</TableCell>
                          <TableCell>{r.repere}</TableCell>
                          <TableCell>
                            <Badge variant="outline" className={statusColors[r.status] ?? ""}>
                              {statusLabels[r.status] ?? r.status}
                            </Badge>
                          </TableCell>
                          <TableCell className="space-x-2">
                            {r.status === "pending" && (
                              <>
                                <Button size="sm" onClick={() => updateStatus("pickup_requests", r.id, "confirmed")}>Confirmer</Button>
                                <Button size="sm" variant="outline" onClick={() => updateStatus("pickup_requests", r.id, "cancelled")}>Annuler</Button>
                              </>
                            )}
                            {r.status === "confirmed" && (
                              <Button size="sm" onClick={() => updateStatus("pickup_requests", r.id, "collected")}>Collecté</Button>
                            )}
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </CardContent>
              </Card>
            </TabsContent>

            {/* Sales */}
            <TabsContent value="sales">
              <Card>
                <CardContent className="p-0">
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Date</TableHead>
                        <TableHead>Repère</TableHead>
                        <TableHead>Kilos</TableHead>
                        <TableHead>Statut</TableHead>
                        <TableHead>Actions</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {sales.length === 0 ? (
                        <TableRow><TableCell colSpan={5} className="text-center text-muted-foreground py-8">Aucune vente</TableCell></TableRow>
                      ) : sales.map((r) => (
                        <TableRow key={r.id}>
                          <TableCell className="text-sm">{formatDate(r.created_at)}</TableCell>
                          <TableCell>{r.repere}</TableCell>
                          <TableCell>{r.kilos} kg</TableCell>
                          <TableCell>
                            <Badge variant="outline" className={statusColors[r.status] ?? ""}>
                              {statusLabels[r.status] ?? r.status}
                            </Badge>
                          </TableCell>
                          <TableCell className="space-x-2">
                            {r.status === "offered" && (
                              <>
                                <Button size="sm" onClick={() => updateStatus("plastic_sales", r.id, "confirmed")}>Confirmer</Button>
                                <Button size="sm" variant="outline" onClick={() => updateStatus("plastic_sales", r.id, "cancelled")}>Annuler</Button>
                              </>
                            )}
                            {r.status === "confirmed" && (
                              <Button size="sm" onClick={() => updateStatus("plastic_sales", r.id, "collected")}>Collecté</Button>
                            )}
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </CardContent>
              </Card>
            </TabsContent>

            {/* Alerts */}
            <TabsContent value="alerts">
              <Card>
                <CardContent className="p-0">
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Date</TableHead>
                        <TableHead>Repère</TableHead>
                        <TableHead>Photo</TableHead>
                        <TableHead>Statut</TableHead>
                        <TableHead>Actions</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {alerts.length === 0 ? (
                        <TableRow><TableCell colSpan={5} className="text-center text-muted-foreground py-8">Aucune alerte</TableCell></TableRow>
                      ) : alerts.map((r) => (
                        <TableRow key={r.id}>
                          <TableCell className="text-sm">{formatDate(r.created_at)}</TableCell>
                          <TableCell>{r.repere}</TableCell>
                          <TableCell>
                            {r.photo_url ? (
                              <a href={r.photo_url} target="_blank" rel="noopener noreferrer" className="text-primary underline text-sm">Voir</a>
                            ) : <span className="text-muted-foreground text-sm">—</span>}
                          </TableCell>
                          <TableCell>
                            <Badge variant="outline" className={statusColors[r.status] ?? ""}>
                              {statusLabels[r.status] ?? r.status}
                            </Badge>
                          </TableCell>
                          <TableCell className="space-x-2">
                            {r.status === "reported" && (
                              <>
                                <Button size="sm" onClick={() => updateStatus("dumps_alerts", r.id, "confirmed")}>Confirmer</Button>
                                <Button size="sm" variant="outline" onClick={() => updateStatus("dumps_alerts", r.id, "resolved")}>Résolu</Button>
                              </>
                            )}
                            {r.status === "confirmed" && (
                              <Button size="sm" onClick={() => updateStatus("dumps_alerts", r.id, "resolved")}>Résolu</Button>
                            )}
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        )}
      </div>
    </main>
  );
};

export default AdminDashboard;
