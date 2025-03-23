import ClientDashboard from "@/components/client-dashboard";
import { fetchWorkersFromServer } from "../actions/fetch-workers";

export default async function DashboardPage() {
  const workers = await fetchWorkersFromServer();

  return <ClientDashboard initialWorkers={workers} />;
}
