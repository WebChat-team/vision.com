// main ===================================================== //
// type UseShimmer = <Data>(getData: Data | null, dependency: keyof Data) => [Data, string]
type UseShimmer = <Data>(getData: Data | null) => [Data, string]
type Status = "loading" | "success" | "failed"

// exports ================================================== //
export type { UseShimmer, Status };