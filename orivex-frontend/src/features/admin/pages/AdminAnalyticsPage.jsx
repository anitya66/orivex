import PageHeader from "../components/common/PageHeader";
import LoadingState from "../components/common/LoadingState";
import EmptyState from "../components/common/EmptyState";

import DashboardCard from "../components/DashboardCard";
import ProjectStatusChart from "../components/ProjectStatusChart";
import UserGrowthChart from "../components/UserGrowthChart";
import ProjectGrowthChart from "../components/ProjectGrowthChart";
import RecentActivities from "../components/RecentActivities";

import { useDashboard } from "../hooks/useDashboard";
import { useRecentActivities } from "../hooks/useRecentActivities";

function AdminAnalyticsPage() {

  const {

    data,

    isLoading,

    isError,

  } = useDashboard();

  const {

    data: activityData,

    isLoading: loadingActivities,

    isError: activityError,

  } = useRecentActivities();

  if (isLoading) {

    return (

      <LoadingState

        message="Loading analytics..."

      />

    );

  }

  if (isError) {

    return (

      <EmptyState

        message="Failed to load analytics."

      />

    );

  }

  const dashboard = data.data;

  return (

    <div className="space-y-8">

      <PageHeader

        title="Platform Analytics"

        description="Platform insights and statistics."

      />

      <div className="grid grid-cols-1 gap-6 md:grid-cols-2 xl:grid-cols-4">

        <DashboardCard

          title="Users"

          value={dashboard.totalUsers}

        />

        <DashboardCard

          title="Freelancers"

          value={dashboard.freelancers}

        />

        <DashboardCard

          title="Projects"

          value={dashboard.totalProjects}

        />

        <DashboardCard

          title="Contracts"

          value={dashboard.totalContracts}

        />

      </div>

      <ProjectStatusChart

        data={dashboard.projectStatusChart}

      />

      <div className="grid grid-cols-1 gap-6 xl:grid-cols-2">

        <UserGrowthChart

          data={dashboard.userGrowth}

        />

        <ProjectGrowthChart

          data={dashboard.projectGrowth}

        />

      </div>

      {!loadingActivities && !activityError && (

        <RecentActivities

          activities={activityData.data}

        />

      )}

    </div>

  );

}

export default AdminAnalyticsPage;