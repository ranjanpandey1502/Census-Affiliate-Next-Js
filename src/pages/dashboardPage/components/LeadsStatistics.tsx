import Chart from "react-apexcharts";
import type { ApexOptions } from "apexcharts";
import { useEffect, useState } from "react";
//
import { Dropdown } from "@/components/common/dropdown/Dropdown";
import { DropdownItem } from "@/components/common/dropdown/DropdownItem";
import { MoreDotIcon } from "@/assets/icons";
import useAuth from "@/providers/auth/useAuth";
import ApiService from "@/services/Api.service";
import useNotification from "@/providers/notification/useNotification";
import { ADMIN_ROLE } from "@/utils/config";

export default function LeadsStatistics() {
  const { userInfo } = useAuth();
  const { showNotification } = useNotification();
  const [totalLeads, setTotalLeads] = useState(0);
  const [convertedLeads, setConvertedLeads] = useState(0);
  const [currentMonthLeads, setCurrentMonthLeads] = useState(0);
  const [currentWeekLeads, setCurrentWeekLeads] = useState(0);
  const [todayLeads, setTodayLeads] = useState(0);
  const options: ApexOptions = {
    colors: ["#465FFF"],
    chart: {
      fontFamily: "Outfit, sans-serif",
      type: "radialBar",
      height: 330,
      sparkline: {
        enabled: true,
      },
    },
    plotOptions: {
      radialBar: {
        startAngle: -85,
        endAngle: 85,
        hollow: {
          size: "80%",
        },
        track: {
          background: "#E4E7EC",
          strokeWidth: "100%",
          margin: 5, // margin is in pixels
        },
        dataLabels: {
          name: {
            show: false,
          },
          value: {
            fontSize: "36px",
            fontWeight: "600",
            offsetY: -40,
            color: "#1D2939",
            formatter: function (val) {
              return val + "%";
            },
          },
        },
      },
    },
    fill: {
      type: "solid",
      colors: ["#465FFF"],
    },
    stroke: {
      lineCap: "round",
    },
    labels: ["Progress"],
  };
  const [isOpen, setIsOpen] = useState(false);

  function toggleDropdown() {
    setIsOpen(!isOpen);
  }

  function closeDropdown() {
    setIsOpen(false);
  }

  useEffect(() => {
    (async () => {
      try {
        const res = await (userInfo?.role === ADMIN_ROLE
          ? ApiService.getAdminLeadsMetrics()
          : ApiService.getAffiliateLeadsMetrics());
        const resData = res.data.data;
        setConvertedLeads(resData.totalCompleted);
        setCurrentWeekLeads(resData.completedThisWeek);
        setCurrentMonthLeads(resData.completedThisMonth);
        setTodayLeads(resData.completedToday);
        setTotalLeads(resData.totalRows);
      } catch (error) {
        console.trace(error);
        showNotification({
          notificationType: "error",
          title: "Error Fetching Leads Info",
        });
      }
    })();
  }, []);
  return (
    <div className="rounded-2xl border border-gray-200 bg-gray-100 dark:border-gray-800 dark:bg-white/[0.03]">
      <div className="px-5 pt-5 bg-white shadow-default rounded-2xl pb-11 dark:bg-gray-900 sm:px-6 sm:pt-6">
        <div className="flex justify-between">
          <div>
            <h3 className="text-lg font-semibold text-gray-800 dark:text-white/90">
              Leads Info
            </h3>
            <p className="mt-1 text-gray-500 text-theme-sm dark:text-gray-400">
              No of Converted and Total Leads
            </p>
          </div>
          <div className="relative inline-block">
            <button className="dropdown-toggle" onClick={toggleDropdown}>
              <MoreDotIcon className="text-gray-400 hover:text-gray-700 dark:hover:text-gray-300 size-6" />
            </button>
            <Dropdown
              isOpen={isOpen}
              onClose={closeDropdown}
              className="w-40 p-2"
            >
              <DropdownItem
                onItemClick={closeDropdown}
                className="flex w-full font-normal text-left text-gray-500 rounded-lg hover:bg-gray-100 hover:text-gray-700 dark:text-gray-400 dark:hover:bg-white/5 dark:hover:text-gray-300"
              >
                View Details
              </DropdownItem>
            </Dropdown>
          </div>
        </div>
        <div className="relative ">
          <div className="max-h-[330px]" id="chartDarkStyle">
            <Chart
              options={options}
              series={[Math.ceil((convertedLeads/totalLeads)*100)]}
              type="radialBar"
              height={330}
            />
          </div>

          {/* <span className="absolute left-1/2 top-full -translate-x-1/2 -translate-y-[95%] rounded-full bg-success-50 px-3 py-1 text-xs font-medium text-success-600 dark:bg-success-500/15 dark:text-success-500">
            +10%
          </span> */}
        </div>
        <p className="mx-auto mt-10 w-full max-w-[380px] text-center text-sm text-gray-500 sm:text-base">
          Your {convertedLeads} Leads have been converted.
          {/* You earn $3287 today, it's higher than last month. Keep up your good
          work! */}
        </p>
      </div>

      <div className="flex items-center justify-center gap-5 px-6 py-3.5 sm:gap-8 sm:py-5">
        <div>
          <p className="mb-1 text-center text-gray-500 text-theme-xs dark:text-gray-400 sm:text-sm">
            This Month
          </p>
          <p className="flex items-center justify-center gap-1 text-base font-semibold text-gray-800 dark:text-white/90 sm:text-lg">
            {currentMonthLeads}
          </p>
        </div>

        <div className="w-px bg-gray-200 h-7 dark:bg-gray-800"></div>

        <div>
          <p className="mb-1 text-center text-gray-500 text-theme-xs dark:text-gray-400 sm:text-sm">
            This Week
          </p>
          <p className="flex items-center justify-center gap-1 text-base font-semibold text-gray-800 dark:text-white/90 sm:text-lg">
            {currentWeekLeads}
          </p>
        </div>

        <div className="w-px bg-gray-200 h-7 dark:bg-gray-800"></div>

        <div>
          <p className="mb-1 text-center text-gray-500 text-theme-xs dark:text-gray-400 sm:text-sm">
            Today
          </p>
          <p className="flex items-center justify-center gap-1 text-base font-semibold text-gray-800 dark:text-white/90 sm:text-lg">
            {todayLeads}
          </p>
        </div>
      </div>
    </div>
  );
}
