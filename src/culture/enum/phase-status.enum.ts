/**
 * An enum representing the possible status of a cultivation phase.
 */
export enum PhaseStatus {
  /**
   * The phase is pending, and has not yet started.
   */
  Pending = "pending",

  /**
   * The phase has started.
   */
  Started = "started",

  /**
   * The phase has stopped.
   */
  Stopped = "stopped",

  /**
   * The phase was skipped.
   */
  Skipped = "skipped",
}
