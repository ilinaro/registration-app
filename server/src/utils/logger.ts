export const logger = {
  log: (...args: any[]) => console.log("\x1b[34mINFO:\x1b[0m", ...args),
  success: (...args: any[]) => console.log("\x1b[32mSUCCESS:\x1b[0m", ...args),
  error: (...args: any[]) => console.error("\x1b[31mWARNING:\x1b[0m", ...args),
};
