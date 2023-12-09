import fs from "fs";

export const readFile = (fileName: string): string => {
	return fs.readFileSync(`./input-files/${fileName}.txt`, "utf-8").trimEnd();
};
