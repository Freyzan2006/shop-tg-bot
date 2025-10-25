import esbuild from 'esbuild';
import { readdirSync, statSync, writeFileSync } from 'fs';
import { dirname, join } from 'path';
import { fileURLToPath } from 'url';

const __dirname = dirname(fileURLToPath(import.meta.url));

// Кэширование entry points для watch режима
let entryPointsCache = null;

function getEntryPoints(useCache = true) {
  if (useCache && entryPointsCache) {
    return entryPointsCache;
  }

  const srcPath = join(__dirname, 'src');
  const entries = [];
  
  function scan(dir) {
    const items = readdirSync(dir, { withFileTypes: true });
    
    for (const item of items) {
      const fullPath = join(dir, item.name);
      
      if (item.isDirectory()) {
        if (!item.name.startsWith('.') && item.name !== 'node_modules') {
          scan(fullPath);
        }
      } else if (item.isFile() && item.name.endsWith('.ts') && !item.name.endsWith('.d.ts')) {
        if (!item.name.includes('.test.') && !item.name.includes('.spec.')) {
          entries.push(fullPath);
        }
      }
    }
  }
  
  scan(srcPath);
  entryPointsCache = entries;
  return entries;
}

// Production конфиг
const productionConfig = {
  entryPoints: ['src/index.ts'], // Только главный entry point для production
  bundle: true,
  platform: 'node',
  target: 'node18',
  outdir: 'build',
  format: 'esm',
  sourcemap: 'linked',
  minify: true,
  minifyIdentifiers: true,
  minifySyntax: true,
  minifyWhitespace: true,
  treeShaking: true,
  metafile: true,
  external: [
    'mongoose', 'grammy', '@grammyjs/hydrate', 'dotenv',
    'node:fs', 'fs', 'node:path', 'path', 'node:url', 'url',
    'node:http', 'http', 'node:https', 'https', 'node:util', 'util'
  ],
  tsconfig: 'tsconfig.json',
  banner: {
    js: `import { createRequire } from 'module'; const require = createRequire(import.meta.url);`
  },
  // Агрессивные оптимизации
  legalComments: 'none', // Удаляем комментарии
  drop: ['console'], // Удаляем console.log в production
  absWorkingDir: __dirname,
};

// Development конфиг
const developmentConfig = {
  entryPoints: getEntryPoints(),
  bundle: true,
  platform: 'node',
  target: 'node18',
  outdir: 'build',
  format: 'esm',
  sourcemap: true,
  minify: false,
  treeShaking: true,
  external: [
    'mongoose', 'grammy', '@grammyjs/hydrate', 'dotenv',
    'node:fs', 'fs', 'node:path', 'path', 'node:url', 'url'
  ],
  tsconfig: 'tsconfig.json',
  outbase: 'src',
  banner: {
    js: `import { createRequire } from 'module'; const require = createRequire(import.meta.url);`
  },
  logLevel: 'warning', // Меньше логов в development
};

async function build() {
  const isProduction = process.argv.includes('--minify');
  const isWatch = process.argv.includes('--watch');
  const config = isProduction ? productionConfig : developmentConfig;
  
  console.log(`🚀 Building in ${isProduction ? 'PRODUCTION' : 'DEVELOPMENT'} mode...`);
  
  try {
    if (isWatch) {
      const ctx = await esbuild.context({
        ...config,
        // Оптимизации для watch режима
        incremental: true,
        sourcemap: 'inline', // Быстрее в watch
      });
      
      await ctx.watch();
      console.log('👀 Watching for changes...');
      
      // Очистка кэша при изменении структуры файлов
      process.stdin.on('data', () => {
        entryPointsCache = null;
      });
    } else {
      const startTime = Date.now();
      const result = await esbuild.build(config);
      const endTime = Date.now();
      
      console.log(`⏱️  Build completed in ${endTime - startTime}ms`);
      
      if (result.metafile && isProduction) {
        // Сохраняем метафайл для анализа
        writeFileSync('build/meta.json', JSON.stringify(result.metafile, null, 2));
        
        // Анализ зависимостей
        let totalSize = 0;
        for (const output of Object.values(result.metafile.outputs)) {
          totalSize += output.bytes;
        }
        
        console.log(`📦 Total bundle size: ${(totalSize / 1024 / 1024).toFixed(2)} MB`);
      }
      
      console.log('✅ Build completed successfully!');
    }
  } catch (error) {
    console.error('❌ Build failed:', error);
    process.exit(1);
  }
}

process.on('SIGINT', () => process.exit(0));
process.on('SIGTERM', () => process.exit(0));

build();