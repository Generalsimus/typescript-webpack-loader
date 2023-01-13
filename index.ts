import { LoaderDefinitionFunction } from "webpack"
import { CustomCompilerHost, HostOptions } from "./host"
import ts from "typescript"
import { normalizePath } from "./host/utils/normalizePath";
import path from "path";




export interface Options extends HostOptions {

}
export type LoaderType = LoaderDefinitionFunction<Options> 
const loader: LoaderType = function (content, sourceMap, additionalData) {
    const host = getHost(this.getOptions());

    const { code, map, diagnostics, emitFiles } = host.emitFileIfChanged(normalizePath(this.resourcePath), content)
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
export default loader

type SelfThis<T> = T extends (this: infer R, ...arg: any[]) => any ? R : never;
const emitOuterFiles = (context: SelfThis<LoaderType>, emitFiles: Record<string, string>) => {
    if (context._compiler !== undefined) {
        const { outputPath } = context._compiler
        for (const emitFilePath in emitFiles) {
            console.log("🚀 --> file: index.ts:29 --> emitFilePath", {
                emitFilePath,
                content: emitFiles[emitFilePath]
            });
            context.emitFile(path.relative(outputPath, emitFilePath), emitFiles[emitFilePath])
        }
    }
}
let workingHost: CustomCompilerHost | undefined
const getHost = (options: Options) => {
    if (workingHost === undefined) {
        workingHost = new CustomCompilerHost(options)
    }
    return workingHost
}