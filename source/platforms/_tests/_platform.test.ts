import { getPlatformForEnv } from "../platform"

import { BitBucketServer } from "../BitBucketServer"
import {
  BitBucketServerAPI,
  BitBucketRepoCredentials,
  bitbucketServerRepoCredentialsFromEnv,
} from "../bitbucket_server/BitBucketServerAPI"
import { RepoMetaData } from "../../dsl/BitBucketServerDSL"

const mockBitBucketServer = jest.fn()
/*constructor(public readonly repoMetadata: RepoMetaData, public readonly repoCredentials: BitBucketRepoCredentials) {
    const fixtures = await requestWithFixturedJSON("vsts/vsts_pr.json")
    return await fixtures()
  }*/
/*async getIssue() {
    const fixtures = await requestWithFixturedJSON("github_issue.json")
    return await fixtures()
  }*/
//}

jest.mock("../BitBucketServer", () => {
  return { BitBucketServer: mockBitBucketServer }
})

jest.mock("../bitbucket_server/BitBucketServerAPI", () => {
  return { bitbucketServerRepoCredentialsFromEnv: mockBitbucketServerRepoCredentialsFromEnv }
})

it("should bail if there is no valid environment found", () => {
  const e = expect as any
  e(() => {
    getPlatformForEnv({} as any, {} as any)
  }).toThrow("Cannot use authenticated API requests")
})

it("should set up BitBucket if DANGER_BITBUCKETSERVER_HOST found", () => {
  const e = expect as any
  const env = {} as any

  getPlatformForEnv(env, {
    pullRequestID: "1",
    repoSlug: "testrepo",
    name: "name",
    isCI: true,
    isPR: true,
    ciRunURL: "ciRunURL",
  })
  expect(mockBitBucketServer).toHaveBeenCalledWith(
    {
      pullRequestID: "1",
      repoSlug: "testrepo",
    },
    bitbucketServerRepoCredentialsFromEnv(env)
  )
  expect(bitbucketServerRepoCredentialsFromEnv).toHaveBeenCalledWith(env)
})

it("should set up VSTS if DANGER_VSTS_API_TOKEN found", () => {
  const e = expect as any
  e(() => {
    getPlatformForEnv({} as any, {} as any)
  }).toThrow("Cannot use authenticated API requests")
})

it("should set up GitHub if DANGER_GITHUB_API_TOKEN found", () => {
  const e = expect as any
  e(() => {
    getPlatformForEnv({} as any, {} as any)
  }).toThrow("Cannot use authenticated API requests")
})
