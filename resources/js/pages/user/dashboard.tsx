
import PageMeta from "@/components/common/PageMeta";
import DemographicCard from "@/components/ecommerce/DemographicCard";
import EcommerceMetrics from "@/components/ecommerce/EcommerceMetrics";
import MonthlySalesChart from "@/components/ecommerce/MonthlySalesChart";
import MonthlyTarget from "@/components/ecommerce/MonthlyTarget";
import RecentOrders from "@/components/ecommerce/RecentOrders";
import StatisticsChart from "@/components/ecommerce/StatisticsChart";
import AppLayout from "@/layouts/AppLayout";
import { Head } from "@inertiajs/react";


export default function Dashboard() {
  return (
    <AppLayout>
      <Head title="Dashboard" />
      <div className="grid gap-4 md:gap-6">
        <div className="col-span-12 xl:col-span-7">
          <RecentOrders />
        </div>
      </div>
    </AppLayout>
  );
}

