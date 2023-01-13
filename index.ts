import { LoaderDefinitionFunction } from "webpack"
import { CustomCompilerHost, HostOptions } from "./host"
import ts from "typescript"
import { normalizePath } from "./host/utils/normalizePath";




interface Options extends HostOptions {

}
const emitOuterFiles: Record<string, string> = {};
const loader: LoaderDefinitionFunction<Options> = function (content, sourceMap, additionalData) {
    const host = getHost(this.getOptions());

    const { code, map, diagnostics, emitFiles } = host.emitFileIfChanged(normalizePath(this.resourcePath), content)
    let error: Error | undefined
    if (diagnostics.length !== 0) {
        error = new Error(ts.formatDiagnosticsWithColorAndContext(
            diagnostics,
            host
        ))
    }


    this.callback(error, code, map, additionalData);
}
module.exports = loader;
let workingHost: CustomCompilerHost | undefined
const getHost = (options: Options) => {
    if (workingHost === undefined) {
        workingHost = new CustomCompilerHost(options)
    }
    return workingHost
}