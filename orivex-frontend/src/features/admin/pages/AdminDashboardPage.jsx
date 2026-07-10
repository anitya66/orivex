import DashboardCard from "../components/DashboardCard";

import LoadingState from "../components/common/LoadingState";

import EmptyState from "../components/common/EmptyState";

import PageHeader from "../components/common/PageHeader";

import { useDashboard } from "../hooks/useDashboard";

import ProjectStatusChart from "../components/ProjectStatusChart";

function AdminDashboardPage() {

  const {

    data,

    isLoading,

    isError,

  } = useDashboard();

  if (isLoading) {

    return (

      <LoadingState

        message="Loading dashboard..."

      />

    );

  }

  if (isError) {

    return (

      <EmptyState

        message="Failed to load dashboard."

      />

    );

  }

  const dashboard = data.data;

  return (

    <div className="space-y-8">

      <PageHeader

        title="Dashboard"

        description="Overview of Orivex."

      />

      <div className="grid grid-cols-1 gap-6 md:grid-cols-2 xl:grid-cols-4">

        <DashboardCard

          title="Total Users"

          value={dashboard.totalUsers}

        />

        <DashboardCard

          title="Freelancers"

          value={dashboard.freelancers}

        />

        <DashboardCard

          title="Clients"

          value={dashboard.clients}

        />

        <DashboardCard

          title="Projects"

          value={dashboard.totalProjects}

        />

        <DashboardCard

          title="Open Projects"

          value={dashboard.openProjects}

        />

        <DashboardCard

          title="In Progress"

          value={dashboard.inProgressProjects}

        />

        <DashboardCard

          title="Completed"

          value={dashboard.completedProjects}

        />

        <DashboardCard

          title="Contracts"

          value={dashboard.totalContracts}

        />

          </div>
          
          <ProjectStatusChart

  data={dashboard.projectStatusChart}

          />
          

    </div>

  );

}

export default AdminDashboardPage;