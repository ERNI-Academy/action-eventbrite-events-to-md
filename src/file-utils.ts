import * as core from "@actions/core";

export const buildFile = (
  content: string,
  contentToAdd: string,
  tag = "EVENTBRITE-EVENTS-LIST"
): string => {
  const listTag = `<!-- ${tag}:`;
  const closingTag = "-->";
  const startOfOpeningTagIndex = content.indexOf(`${listTag}START`);
  const endOfOpeningTagIndex = content.indexOf(
    closingTag,
    startOfOpeningTagIndex
  );
  const startOfClosingTagIndex = content.indexOf(
    `${listTag}END`,
    endOfOpeningTagIndex
  );
  if (
    startOfOpeningTagIndex === -1 ||
    endOfOpeningTagIndex === -1 ||
    startOfClosingTagIndex === -1
  ) {
    core.error(
      `Cannot find the comment tag on the file:\n${listTag}START -->\n${listTag}END -->`
    );
    process.exit(1);
  }
  return [
    content.slice(0, endOfOpeningTagIndex + closingTag.length),
    "\n",
    contentToAdd,
    "\n",
    content.slice(startOfClosingTagIndex),
  ].join("");
};
