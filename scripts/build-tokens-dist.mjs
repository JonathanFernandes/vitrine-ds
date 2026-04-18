import path from 'node:path';

import {
  DIST_ROOT,
  REACT_NATIVE_DIST_ROOT,
  buildDistArtifacts,
  cleanReactNativeDist,
  getReactNativeReadme,
  writeJson,
  writeText,
} from './lib/token-dist.mjs';

const distArtifacts = buildDistArtifacts();

cleanReactNativeDist();

for (const theme of distArtifacts.themes) {
  const artifacts = distArtifacts.themeArtifacts[theme.id];
  const themeDistRoot = path.join(REACT_NATIVE_DIST_ROOT, 'themes', theme.id);

  writeJson(path.join(themeDistRoot, 'tokens.json'), artifacts.resolvedTree);
  writeJson(path.join(themeDistRoot, 'flat.json'), artifacts.flatTokens);
  writeJson(path.join(themeDistRoot, 'meta.json'), {
    id: theme.id,
    figmaMode: theme.figmaMode,
    status: theme.status,
    source: theme.source,
    tokenCount: Object.keys(artifacts.flatTokens).length,
    typographyProfile: 'mobile',
    generatedAt: distArtifacts.buildTimestamp,
  });
}

writeJson(path.join(REACT_NATIVE_DIST_ROOT, 'manifest.json'), distArtifacts.reactNativeManifest);
writeJson(path.join(DIST_ROOT, 'manifest.json'), distArtifacts.rootManifest);
writeText(path.join(REACT_NATIVE_DIST_ROOT, 'README.md'), getReactNativeReadme());
