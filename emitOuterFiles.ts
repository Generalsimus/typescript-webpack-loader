
import loader from "./index"
import path from "path"
type SelfThis<T> = T extends (this: infer R, ...arg: any[]) => any ? R : never;
export const emitOuterFiles = (context: SelfThis<typeof loader>, emitFiles: Record<string, string>) => {
    if (context._compiler !== undefined) {
        const { outputPath } = context._compiler
        for (const emitFilePath in emitFiles) {
            context.emitFile(path.relative(outputPath, emitFilePath), emitFiles[emitFilePath])
        }
    }
}