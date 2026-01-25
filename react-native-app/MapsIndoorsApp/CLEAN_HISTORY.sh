#!/bin/bash

# Script to clean tokens from git history
# WARNING: This rewrites git history. Use with caution.

set -e

echo "⚠️  WARNING: This will rewrite git history!"
echo "This script will remove tokens from commit history."
echo ""
echo "Options:"
echo "1. Interactive rebase (recommended)"
echo "2. Create new clean branch"
echo "3. Cancel"
echo ""
read -p "Choose option (1/2/3): " choice

cd "$(dirname "$0")/../.."

case $choice in
  1)
    echo "Starting interactive rebase..."
    echo "You'll need to edit commits manually to remove tokens."
    echo ""
    echo "Commands to run:"
    echo "  git rebase -i 2acb3475^"
    echo "  # Mark commits with 'edit'"
    echo "  # For each commit:"
    echo "  #   1. Remove token from file"
    echo "  #   2. git add <file>"
    echo "  #   3. git commit --amend --no-edit"
    echo "  #   4. git rebase --continue"
    ;;
  2)
    echo "Creating new clean branch..."
    git checkout origin/react_native
    git checkout -b react_native_clean
    
    echo ""
    echo "✅ New branch 'react_native_clean' created"
    echo "Now manually copy files from react_native branch (excluding tokens)"
    echo "Or use: git checkout react_native -- <files> (excluding sensitive ones)"
    ;;
  3)
    echo "Cancelled."
    exit 0
    ;;
  *)
    echo "Invalid choice"
    exit 1
    ;;
esac
