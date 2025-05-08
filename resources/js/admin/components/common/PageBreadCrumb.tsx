import { Link } from "@inertiajs/react";

interface BreadcrumbProps {
  pageTitle: string;
  subTitle: string;
  link: string;
}

const PageBreadcrumb: React.FC<BreadcrumbProps> = ({ pageTitle,link,subTitle}) => {
  return (
    <div className="flex flex-wrap items-center justify-between gap-3 mb-6 ">
      <h2
        className="text-xl font-semibold text-gray-700 dark:text-white/40"
        x-text="pageName"
      >
        {pageTitle}
      </h2>
      <nav>
        <ol className="flex items-center gap-1.5">
          <li>
            <Link
              className="inline-flex items-center gap-1.5 text-sm text-gray-800 dark:text-white/70 "
              href="/admin/dashboard"
            >
              Admin Dashboard
              <svg
                className="stroke-current"
                width="17"
                height="16"
                viewBox="0 0 17 16"
                fill="none"
                xmlns="http://www.w3.org/7000/svg"
              >
                <path
                  d="M6.0765 12.667L10.2432 8.50033L6.0765 4.33366"
                  stroke=""
                  strokeWidth="1.2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </Link>
          </li>
          <li className="text-sm text-gray-800 dark:text-white/70">
            <Link
              className="inline-flex items-center gap-1.5 text-sm text-gray-800 dark:text-white/70 "
              href={link}
            >
              {subTitle}
            </Link>
          </li>
        </ol>
      </nav>
    </div>
  );
};

export default PageBreadcrumb;
