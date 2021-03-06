// import { GitHubPRDSL, GitHubDSL, GitHubAPIPR, GitHubJSONDSL } from "../dsl/GitHubDSL"
import { VstsAPI } from "./vsts/VstsAPI"
// import GitHubUtils from "./github/GitHubUtils"
// import gitDSLForGitHub from "./github/GitHubGit"

import * as NodeGitHub from "@octokit/rest"
import { Platform } from "./platform"

// import { GitHubIssueCommenter } from "./github/comms/issueCommenter"
// import { GitHubChecksCommenter } from "./github/comms/checksCommenter"

/** Handles conforming to the Platform Interface for VSTS, API work is handle by VstsAPI */

export type VstsType = Platform & { api: VstsAPI }

export const Vsts = (api: VstsAPI) => {
  // In the future this could also be a commenter for the new checks API

  //   const commenter = GitHubChecksCommenter(api) || GitHubIssueCommenter(api)

  /**
   * Converts the PR JSON into something easily used by the Github API client.
   */
  /*const APIMetadataForPR = (pr: GitHubPRDSL): GitHubAPIPR => {
    return {
      number: pr.number,
      repo: pr.base.repo.name,
      owner: pr.base.repo.owner.login,
    }
  }*/

  /** A quick one off func to ensure there's always some labels */
  /*const getIssue = async () => {
    const issue = await api.getIssue()
    return issue || { labels: [] }
  }*/

  return {
    name: "VSTS",

    api,
    getReviewInfo: api.getPullRequestInfo,
    //getPlatformGitRepresentation: () => gitDSLForGitHub(api),

    /*getPlatformDSLRepresentation: async () => {
      let pr: GitHubPRDSL
      try {
        pr = await api.getPullRequestInfo()
      } catch {
        process.exitCode = 1
        throw `
          Could not find pull request information,
          if you are using a private repo then perhaps
          Danger does not have permission to access that repo.
        `
      }

      const issue = await getIssue()
      const commits = await api.getPullRequestCommits()
      const reviews = await api.getReviews()
      const requested_reviewers = await api.getReviewerRequests()

      const thisPR = APIMetadataForPR(pr)
      return {
        issue,
        pr,
        commits,
        reviews,
        requested_reviewers,
        thisPR,
      }
    },*/

    // An object whose job is to handle the comment faff parts of the Platform
    // ...commenter,

    // getFileContents: api.fileContents,
  } as VstsType
}

// This class should get un-classed, but for now we can expand by functions
/* export const githubJSONToGitHubDSL = (gh: GitHubJSONDSL, api: NodeGitHub): GitHubDSL => {
  return {
    ...gh,
    api,
    utils: GitHubUtils(gh.pr, api),
  }
}*/
