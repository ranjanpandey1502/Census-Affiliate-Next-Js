import { useEffect, useState } from "react";
import { Dropdown } from "@/components/common/dropdown/Dropdown";
import { DropdownItem } from "@/components/common/dropdown/DropdownItem";
import { MoreDotIcon } from "@/assets/icons";
import CountryMap from "./CountryMap";
import ApiService from "@/services/Api.service";
import useNotification from "@/providers/notification/useNotification";
import type { CountriesVisitType } from "@/types/dashboard.types";
import Flag from "@/assets/flags.json";
import Spinner from "@/components/common/Spinner";
import useAuth from "@/providers/auth/useAuth";
import { ADMIN_ROLE } from "@/utils/config";
type FlagKeys = keyof typeof Flag;

function getPercentage(value: number, total: number) {
  return (value / total) * 100;
}

export function ListItem({
  country_code,
  count,
  total,
}: {
  country_code: string;
  count: number;
  total: number;
}) {
  const flagKey = country_code as FlagKeys;
  const percentage = getPercentage(count, total);
  return (
    <div className="flex items-center justify-between">
      <div className="flex items-center gap-3">
        <div className="items-center rounded-full w-4 aspect-square">
          {Flag[flagKey]?.flag || "X"}
        </div>
        <div>
          <p className="font-semibold text-gray-800 text-theme-sm dark:text-white/90">
            {Flag[flagKey]?.name || "Unknown"}
          </p>
          <span className="block text-gray-500 text-theme-xs dark:text-gray-400">
            {count} Users
          </span>
        </div>
      </div>

      <div className="flex w-full max-w-[140px] items-center gap-3">
        <div className="relative block h-2 w-full max-w-[100px] rounded-sm bg-gray-200 dark:bg-gray-800">
          <div
            className="absolute left-0 top-0 flex h-full items-center justify-center rounded-sm bg-brand-500 text-xs font-medium text-white"
            style={{ width: `${percentage.toFixed(0)}%` }}
          ></div>
        </div>
        <p className="font-medium text-gray-800 text-theme-sm dark:text-white/90">
          {percentage.toFixed(2)} %
        </p>
      </div>
    </div>
  );
}

export default function VisitByCountry() {
  const { userInfo } = useAuth();
  const [isOpen, setIsOpen] = useState(false);
  const [visitData, setVisitData] = useState<Array<CountriesVisitType>>([]);
  const { showNotification } = useNotification();

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
          ? ApiService.getAdminCountriesVisit()
          : ApiService.getCountriesVisit());
        setVisitData(res.data.data);
      } catch (error) {
        console.trace(error);
        showNotification({
          notificationType: "error",
          title: "Error fetching Countries visit",
        });
      }
    })();
  }, []);
  const total = visitData.reduce((prev, cur) => {
    return prev + cur._count.id;
  }, 0);
  return (
    <div className="rounded-2xl border border-gray-200 bg-white p-5 dark:border-gray-800 dark:bg-white/[0.03] sm:p-6">
      <div className="flex justify-between">
        <div>
          <h3 className="text-lg font-semibold text-gray-800 dark:text-white/90">
            Traffic Demographic
          </h3>
          <p className="mt-1 text-gray-500 text-theme-sm dark:text-gray-400">
            Page visits based on demographic
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
              View More
            </DropdownItem>
          </Dropdown>
        </div>
      </div>
      <div className="px-4 py-6 my-6 overflow-hidden border border-gary-200 rounded-2xl dark:border-gray-800 sm:px-6">
        <div
          id="mapOne"
          className="mapOne map-btn -mx-4 -my-6 h-[212px] w-[252px] 2xsm:w-[307px] xsm:w-[358px] sm:-mx-6 md:w-[668px] lg:w-[634px] xl:w-[393px] 2xl:w-[554px]"
        >
          {visitData.length > 0 ? (
            <CountryMap data={visitData.map((el) => el.ip_country_code)} />
          ) : (
            <div className="h-full w-full flex items-center justify-center text-yellow-600">
                <Spinner />
            </div>
          )}
        </div>
      </div>

      <div className="space-y-5 max-h-100 overflow-scroll no-scrollbar">
        {visitData.map((el) => (
          <ListItem
            key={el.ip_country_code}
            country_code={el.ip_country_code || "Unknown"}
            count={el._count.id}
            total={total}
          />
        ))}
      </div>
    </div>
  );
}
