workflow "Lint" {
  on = "push"
  resolves = ["Eslint"]
}

workflow "PR Labeler" {
  on = "pull_request"
  resolves = ["Labeler"]
}

action "Dependencies" {
  uses = "actions/npm@master"
  args = "install"
}

action "Eslint" {
  uses = "docker://rkusa/eslint-action:latest"
  secrets = ["GITHUB_TOKEN"]
  args = ""
  needs = ["Dependencies"]
}

action "Labeler" {
  uses = "actions/labeler@master"
  secrets = ["GITHUB_TOKEN"]
  needs = ["Dependencies"]
}
