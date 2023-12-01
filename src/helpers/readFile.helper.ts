import fs from "fs";

export const readAndSplitFile = (
	fileName: string,
	splitLines: boolean = true
): string => {
	return fs.readFileSync(`./input-files/${fileName}.txt`, "utf-8").trimEnd();
};
