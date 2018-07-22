/** Key details about a repo */
export interface RepoMetaData {
  /** The name of the project, like "myproject" */
  projectName: string
  /** The repository identifier, like "myrepo" */
  repoSlug: string
  /** The ID for the pull request, like "11" */
  pullRequestID: string
}

/**
 * An exact copy of the PR's reference JSON. This interface has type'd the majority
 * of it for tooling's sake, but any extra metadata which VSTS send will still be
 * inside the JS object.
 */
export interface VstsPRDSL {
  /**
   * The UUID for the PR
   */
  number: number

  /**
   * Has the PR been locked to contributors only?
   */
  locked: boolean

  /**
   * The title of the PR
   */
  title: string
}

/**
 * A VSTS user account.
 */
export interface VstsUser {
  /**
   * Generic UUID
   */
  cuid: number
  /**
   * The login for the user/org
   */
  principalName: string
  /**
   * The display name for the user/org
   */
  displayName: string
  /**
   * Whether the user is an org, or a user
   */
  subjectKind: "Group" | "Scope" | "User"
}
