
import ts from "typescript"
import { LoaderDefinitionFunction } from "webpack"
import { HostOptions } from "./host"
import { normalizePath } from "./host/utils/normalizePath";
import { emitOuterFiles } from "./emitOuterFiles";
import { getHost } from "./getHost";


export interface Options extends HostOptions {

}
const loader: LoaderDefinitionFunction<Options> = function (content, sourceMap, additionalData) {
    const host = getHost(this.getOptions());

    const { code, map, diagnostics, emitFiles } = host.emitFileIfChanged(normalizePath(this.resourcePath), content);


    let error: Error | undefined
    if (diagnostics.length !== 0) {
        error = new Error(ts.formatDiagnosticsWithColorAndContext(
            diagnostics,
            host
        ))
    }
    if (this.mode === "production") {
        emitOuterFiles(this, emitFiles)
    }
    this.callback(error, code, map, additionalData);
}


export * from "./host"
export default loader