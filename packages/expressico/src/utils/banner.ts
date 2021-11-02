import path from "path";
import fs from "fs";
import chalk from 'chalk';

const getPackageVersion = () => {
  // console.log(path.resolve("node_modules/expressico/package.json"))
  const pkg = fs.readFileSync(path.resolve("node_modules/expressico/package.json")).toString();
  const pkgJSON = JSON.parse(pkg || "{}");
  return pkgJSON?.version || "unkown";
}

const VERSION_TEXT = chalk`{green Version}`;

export const BANNER = () => chalk`{white
=================================================================
 ______                                    _             
|  ____|                                  (_)            
| |__   __  __ _ __   _ __  ___  ___  ___  _   ___  ___  
|  __|  \\ \\/ /| '_ \\ | '__|/ _ \\/ __|/ __|| | / __|/ _ \\ 
| |____  >  < | |_) || |  |  __/\\__ \\\\__ \\| || (__| (_) |
|______|/_/\\_\\| .__/ |_|   \\___||___/|___/|_| \\___|\\___/ 
              | |                                        
              |_|                     ${VERSION_TEXT} :: ${getPackageVersion()}                                
=================================================================
}`;