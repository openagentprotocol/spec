#!/usr/bin/env bash
set -euo pipefail

# OAP Release Script
# Usage: ./scripts/release.sh <version> [--prerelease]
#
# Examples:
#   ./scripts/release.sh 0.1.0 --prerelease
#   ./scripts/release.sh 1.0.0

REPO_URL="https://github.com/openagentprotocol/spec"

if [ $# -lt 1 ]; then
  echo "Usage: $0 <version> [--prerelease]"
  echo ""
  echo "Examples:"
  echo "  $0 0.2.0 --prerelease"
  echo "  $0 1.0.0"
  exit 1
fi

VERSION="$1"
TAG="v${VERSION}"
PRERELEASE=false

if [ "${2:-}" = "--prerelease" ]; then
  PRERELEASE=true
fi

# Ensure we're on main and up to date
BRANCH=$(git rev-parse --abbrev-ref HEAD)
if [ "$BRANCH" != "main" ]; then
  echo "Error: Must be on 'main' branch (currently on '$BRANCH')"
  exit 1
fi

echo "Fetching latest from origin..."
git fetch origin

LOCAL=$(git rev-parse HEAD)
REMOTE=$(git rev-parse origin/main)
if [ "$LOCAL" != "$REMOTE" ]; then
  echo "Error: Local main is not up to date with origin/main. Pull first."
  exit 1
fi

# Check for uncommitted changes
if ! git diff --quiet || ! git diff --cached --quiet; then
  echo "Error: You have uncommitted changes. Commit or stash them first."
  exit 1
fi

# Check tag doesn't already exist
if git rev-parse "$TAG" >/dev/null 2>&1; then
  echo "Error: Tag '$TAG' already exists."
  exit 1
fi

echo ""
echo "=== OAP Release ==="
echo "  Version:    $TAG"
echo "  Pre-release: $PRERELEASE"
echo "  Commit:     $(git rev-parse --short HEAD)"
echo ""
read -p "Proceed? (y/N) " CONFIRM
if [ "$CONFIRM" != "y" ] && [ "$CONFIRM" != "Y" ]; then
  echo "Aborted."
  exit 0
fi

# Step 1: Create and push the tag
if [ "$PRERELEASE" = true ]; then
  git tag -a "$TAG" -m "OAP Specification $TAG (pre-release)"
else
  git tag -a "$TAG" -m "OAP Specification $TAG"
fi

echo "Pushing tag $TAG..."
git push origin "$TAG"

# Step 2: Create GitHub Release (if gh CLI is available)
if command -v gh &>/dev/null; then
  echo "Creating GitHub Release..."
  if [ "$PRERELEASE" = true ]; then
    gh release create "$TAG" --title "OAP $TAG" --notes "Pre-release of the Open Agent Protocol specification." --prerelease
  else
    gh release create "$TAG" --title "OAP $TAG" --notes "Release of the Open Agent Protocol specification."
  fi
  echo "GitHub Release created."
else
  echo ""
  echo "gh CLI not found. Create the release manually:"
  echo "  ${REPO_URL}/releases/new?tag=${TAG}&prerelease=$PRERELEASE"
fi

# Step 3: Update oap@stable tag for stable releases
if [ "$PRERELEASE" = false ]; then
  echo "Updating oap@stable tag..."
  git tag -f -a oap@stable "$TAG" -m "Stable pointer to $TAG"
  git push origin oap@stable --force
  echo "oap@stable now points to $TAG"
fi

echo ""
echo "=== Done ==="
echo "Tag:     $TAG"
echo "Release: ${REPO_URL}/releases/tag/${TAG}"
echo ""
echo "Don't forget to update the README.md documents table if needed."
