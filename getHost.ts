import { CustomCompilerHost } from "./host"
import { Options } from "./index"

let workingHost: CustomCompilerHost | undefined
export const getHost = (options: Options) => {
    if (workingHost === undefined) {
        workingHost = new CustomCompilerHost(options)
        
    }
    return workingHost
}
