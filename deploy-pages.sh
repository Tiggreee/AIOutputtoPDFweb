#!/usr/bin/env bash
set -euo pipefail

current_branch="$(git branch --show-current)"

if [[ -n "$(git status --porcelain)" ]]; then
  echo "Working tree is not clean. Commit or stash changes first."
  exit 1
fi

echo "Syncing gh-pages from main..."
git switch gh-pages
git merge --no-edit main
git push origin gh-pages

git switch "$current_branch"
echo "Done. GitHub Pages update requested from gh-pages."
