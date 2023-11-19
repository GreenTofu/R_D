const firstNameValidator = {
  required: "First name is required",
};

const lastNameValidator = {
  required: "Last name is required",
};

const emailValidator = {
  required: "Email is required",
  pattern: {
    value:
      /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
    message: "Email is invalid",
  },
};

const phoneValidator = {
  required: "Phone number is required",
  pattern: {
    value: /^[0-9]+$/i,
    message: "Phone number must be digits",
  },
};

const passwordValidator = {
  required: "Password is required",
};

const projectNameValidator = {
  required: "Project name is required",
};

const workingEffortValidator = {
  required: "Effort is required",
  pattern: {
    value: /^[0-9]+$/i,
    message: "Effort must be digits",
  },
  min: {
    value: 0,
    message: "Effort must be bigger than 0",
  },
  max: {
    value: 100,
    message: "Effort must be lower than 100",
  },
};

const goalTitleValidator = {
  required: "Goal title is required",
  maxLength: {
    value: 70,
    message: "Title must not exceed 70 characters",
  },
};

export {
  firstNameValidator,
  lastNameValidator,
  emailValidator,
  phoneValidator,
  passwordValidator,
  projectNameValidator,
  workingEffortValidator,
  goalTitleValidator,
};
