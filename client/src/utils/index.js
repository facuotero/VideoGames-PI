export const cleanDescription = (description) => {
    const regexToClean = new RegExp("<s*[^>]*>", "g");
    description = description.replace(regexToClean, "");
    return description;
  };
  