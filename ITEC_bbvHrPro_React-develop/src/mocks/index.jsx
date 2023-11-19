const reviewMock = {
  id: 1,
  createdAt: "2023-04-01T11:55:52.827Z",
  updatedAt: "2023-04-01T11:55:52.827Z",
  evaluatorId: 12,
  employeeId: 4,
  cycleId: 1,
  statusId: 3,
  status: { id: 3, name: "Evaluating" },
  cycle: {
    id: 1,
    startDate: "2022-07-01T00:00:00.000Z",
    endDate: "2022-12-30T00:00:00.000Z",
    empDueDate: "2022-12-05T00:00:00.000Z",
    evalDueDate: "2022-12-15T00:00:00.000Z",
    createdAt: "2023-04-01T11:55:52.796Z",
    updatedAt: "2023-04-01T11:55:52.796Z",
  },
  employee: {
    availability: 100,
    id: 4,
    email: "jacky@gmail.com",
    firstName: "Jacky",
    lastName: "Kor",
    phone: "052619589",
    role: "Employee",
    position: "Software Engineer",
    manager: 12,
    startingDate: "2018-02-23",
    avatar: "http://localhost:8080/images/avatar2.png",
    password:
      "$2b$10$9mzvvzjkvi2XEKNYJFA5DOghEUFcKHg1ujP7tjIZ4lRI6pwbGVJW6",
    createdAt: "2023-04-01T11:55:49.087Z",
    updatedAt: "2023-04-01T11:55:52.168Z",
  },
  evaluator: {
    availability: 100,
    id: 12,
    email: "kelly@gmail.com",
    firstName: "Kelly",
    lastName: "Wong",
    phone: "019552669",
    role: "Manager",
    position: "Service Unit Manager",
    manager: null,
    startingDate: "2018-04-25",
    avatar: "http://localhost:8080/images/avatar10.png",
    password:
      "$2b$10$9mzvvzjkvi2XEKNYJFA5DOghEUFcKHg1ujP7tjIZ4lRI6pwbGVJW6",
    createdAt: "2023-04-01T11:55:49.087Z",
    updatedAt: "2023-04-01T11:55:49.087Z",
  },
};

const feedbackMock = {
  id: 4,
  partName: "Feedback",
  partNumber: 4,
  criteria: [
    {
      id: 10,
      name: "Good point",
      createdAt: "2023-04-20T15:01:13.348Z",
      updatedAt: "2023-04-20T15:01:13.348Z",
      partId: 4,
      reviews: [
        {
          id: 777,
          criteriaId: 10,
          statusId: 1,
          userId: 1,
          comment: null,
          status: {
            id: 1,
            name: "Evaluating",
          },
        },
        {
          id: 666,
          criteriaId: 10,
          statusId: 1,
          userId: 12,
          comment: null,
          status: {
            id: 1,
            name: "Evaluating",
          },
        },
      ],
    },
    {
      id: 11,
      name: "Points to improve",
      createdAt: "2023-04-20T15:01:13.348Z",
      updatedAt: "2023-04-20T15:01:13.348Z",
      partId: 4,
      reviews: [
        {
          id: 999,
          criteriaId: 11,
          statusId: 1,
          userId: 1,
          comment: null,
          status: {
            id: 1,
            name: "Evaluating",
          },
        },
        {
          id: 888,
          criteriaId: 11,
          statusId: 1,
          userId: 12,
          comment: null,
          status: {
            id: 1,
            name: "Evaluating",
          },
        },
      ],
    },
  ],
};

// eslint-disable-next-line import/prefer-default-export
export { reviewMock, feedbackMock };
