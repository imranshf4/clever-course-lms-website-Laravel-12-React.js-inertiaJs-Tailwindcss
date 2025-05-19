
import DemographicCard from "@/admin/components/ecommerce/DemographicCard";
import EcommerceMetrics from "@/admin/components/ecommerce/EcommerceMetrics";
import MonthlySalesChart from "@/admin/components/ecommerce/MonthlySalesChart";
import MonthlyTarget from "@/admin/components/ecommerce/MonthlyTarget";
import RecentOrders from "@/admin/components/ecommerce/RecentOrders";
import StatisticsChart from "@/admin/components/ecommerce/StatisticsChart";
import AppLayout from "@/admin/layouts/AppLayout";
import { Head } from "@inertiajs/react";


export default function Dashboard() {
  return (
    <AppLayout>
      <Head title="Admin Dashboard" />
      <div className="grid grid-cols-12 gap-4 md:gap-6">
        <div className="col-span-12 space-y-6 xl:col-span-7">
          <EcommerceMetrics />

          {/* <MonthlySalesChart /> */}
        </div>

        {/* <div className="col-span-12 xl:col-span-5">
          <MonthlyTarget />
        </div> */}

        {/* <div className="col-span-12">
          <StatisticsChart />
        </div> */}

        {/* <div className="col-span-12 xl:col-span-5">
          <DemographicCard />
        </div> */}

        <div className="col-span-12">
          <RecentOrders />
        </div>
      </div>
    </AppLayout>
  );
}

