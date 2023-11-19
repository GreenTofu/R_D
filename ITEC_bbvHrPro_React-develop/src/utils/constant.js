const ROLE = {
  CANDIDATE: "Candidate",
  EMPLOYEE: "Employee",
  MANAGER: "Manager",
};

const POSITION = {
  SERVICE_UNIT_MANAGER: "Service Unit Manager",
  HUMAN_RESOURCE_MANAGER: "Human Resources",
};

const EMPLOYEE_FILTER_LIST = [
  {
    name: "Name",
    value: "name",
  },
  {
    name: "Position",
    value: "position",
  },
  {
    name: "Skill",
    value: "tags",
  },
  {
    name: "Manager",
    value: "manager",
  },
];

const CANDIDATE_FILTER_LIST = [
  {
    name: "Name",
    value: "name",
  },
  {
    name: "Position",
    value: "position",
  },
  {
    name: "Skill",
    value: "tags",
  },
];

const PROJECT_FILTER_LIST = [
  {
    name: "Name",
    value: "name",
  },
  {
    name: "Manager",
    value: "projectManager",
  },
  {
    name: "Member",
    value: "members",
  },
  {
    name: "Tag",
    value: "tags",
  },
  {
    name: "Status",
    value: "projectStatus",
  },
];

const GOAL_FILTER_LIST = [
  {
    name: "Employee",
    value: "employee",
  },
  {
    name: "Title",
    value: "title",
  },
  {
    name: "Status",
    value: "status",
  },
];

const PROJECT_DETAIL_FIELDS = [
  "name",
  "description",
  "members",
  "tags",
  "startDate",
  "endDate",
];

const DEBOUNCE_DELAY = 200;

const GOAL_STATUS_COMMON_CSS = "py-1.5 px-2 rounded-full text-xs";

const GOAL_STATUS_CSS = {
  Drafting: `${GOAL_STATUS_COMMON_CSS} bg-neutral-200 text-neutral-700`,
  "Pending Approval": `${GOAL_STATUS_COMMON_CSS} bg-warning-100 text-warning-500`,
  Approved: `${GOAL_STATUS_COMMON_CSS} bg-success-100 text-success-700`,
  Evaluated: `${GOAL_STATUS_COMMON_CSS} bg-info-100 text-info-500`,
};

const GOAL = {
  DRAFT: "Drafting",
  PENDING: "Pending Approval",
  APPROVED: "Approved",
  EVALUATED: "Evaluated",
};

export {
  ROLE,
  POSITION,
  GOAL,
  EMPLOYEE_FILTER_LIST,
  CANDIDATE_FILTER_LIST,
  PROJECT_FILTER_LIST,
  GOAL_FILTER_LIST,
  DEBOUNCE_DELAY,
  PROJECT_DETAIL_FIELDS,
  GOAL_STATUS_CSS,
};
